from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Order
from cart.models import Cart
from product.models import Product
from .serializers import OrderSerializer
from cart.serializers import CartSerializer

# Create your views here.
class OrderView(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request, order_id=None):
    if order_id:
      try:
        orders = Order.objects.filter(order_id=order_id).values()
        order_serializer = OrderSerializer(orders, many=True)
        return Response({'status': 'success', 'order': order_serializer.data}, status=status.HTTP_200_OK)
      except Order.DoesNotExist:
        return Response({'status': 'error', 'message': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
    
    username = request.GET.get('username')

    if username:
      try:
        orders = Order.objects.filter(username=username).values()
        order_serializer = OrderSerializer(orders, many=True)
        return Response({'status': 'success', 'carts': order_serializer.data}, status=status.HTTP_200_OK)
      except Order.DoesNotExist:
        return Response({'status': 'error', 'message': 'Cart not found for this user'}, status=status.HTTP_404_NOT_FOUND)
    
    results = Order.objects.all()
    order_serializer = OrderSerializer(results, many=True)
    return Response({'status': 'success', 'carts': order_serializer.data}, status=status.HTTP_200_OK)

  def post(self, request):
    username = request.data['username']
    last_order = Order.objects.last()
    order_id = 1
    if last_order:
      order_id = last_order.order_id + 1
    carts = list(Cart.objects.filter(username=username).values())
    cart_serializer = CartSerializer(data=carts, many=True)

    if cart_serializer.is_valid():
      orders = []
      for cart_data in cart_serializer.data:
        cart_data['order_id'] = order_id
        orders.append(cart_data)
      order_serializer = OrderSerializer(data=orders, many=True)
      if order_serializer.is_valid():
        order_serializer.save()
        return Response({"status": "success", "order": order_serializer.data}, status=status.HTTP_201_CREATED)
      else:
        return Response({"status": "error", "data": order_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    else:
      return Response({"status": "error", "data": cart_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)