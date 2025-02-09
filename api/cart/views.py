from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Cart
from product.models import Product
from .serializers import CartSerializer
from django.db.models import Q

# Create your views here.
class CartView(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request, id=None):
    if id:
      return self.get_cart_by_id(id)
    
    username = request.GET.get('username')
    if username:
      return self.get_carts_by_username(username)
    
    return self.get_all_carts()

  def post(self, request):
    cart_serializer = CartSerializer(data=request.data)
    if cart_serializer.is_valid():
      return self.create_or_update_cart(cart_serializer, request)
    return Response({"status": "error", "error": cart_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

  def put(self, request, id):
    cart = Cart.objects.get(id=id)
    cart_serializer = CartSerializer(cart, data=request.data)
    if cart_serializer.is_valid():
      cart_serializer.save()
      return Response({"status": "success", "cart": cart_serializer.data}, status=status.HTTP_200_OK)
    return Response({"status": "error", "error": cart_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

  def patch(self, request, id):
    cart = Cart.objects.get(id=id)
    cart_serializer = CartSerializer(cart, data=request.data, partial=True)
    if cart_serializer.is_valid():
      cart_serializer.save()
      return Response({"status": "success", "cart": cart_serializer.data}, status=status.HTTP_200_OK)
    return Response({"status": "error", "error": cart_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

  def get_cart_by_id(self, id):
    try:
      cart = Cart.objects.get(id=id)
      cart_serializer = CartSerializer(cart)
      return Response({'status': 'success', 'cart': cart_serializer.data}, status=status.HTTP_200_OK)
    except Cart.DoesNotExist:
      return Response({'status': 'error', 'message': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)

  def get_carts_by_username(self, username):
    try:
      carts = Cart.objects.filter(username=username).order_by('id').values()
      cart_serializer = CartSerializer(carts, many=True)
      total_price = 0.0
      carts_data = []
      for cart in cart_serializer.data:
        product = Product.objects.get(id=cart['product_id'])
        total_price += product.price * cart['count']
        carts_data.append({
          **cart,
          "product": product.title,
          "price": product.price,
          "sum": product.price * cart['count'],
          "image_url": product.image_url,
        })
      return Response({'status': 'success', 'carts': carts_data, 'total_price': total_price}, status=status.HTTP_200_OK)
    except Cart.DoesNotExist:
      return Response({'status': 'error', 'message': 'Cart not found for this user'}, status=status.HTTP_404_NOT_FOUND)

  def get_all_carts(self):
    results = Cart.objects.all().order_by('id')
    cart_serializer = CartSerializer(results, many=True)
    return Response({'status': 'success', 'carts': cart_serializer.data}, status=status.HTTP_200_OK)

  def create_or_update_cart(self, cart_serializer, request):
    data = request.data
    carts = Cart.objects.filter(username=data['username'], product_id=data['product_id']).values()
    if len(carts) == 0:
      cart_serializer.save()
      return Response({"status": "success", "cart": cart_serializer.data}, status=status.HTTP_201_CREATED)
    
    cart = Cart.objects.get(id=carts.first()['id'])
    data['count'] += cart.count
    cart_serializer = CartSerializer(cart, data=data)
    if cart_serializer.is_valid():
      cart_serializer.save()
      return Response({"status": "success", "cart": cart_serializer.data}, status=status.HTTP_201_CREATED)
    return Response({"status": "error", "error": cart_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)