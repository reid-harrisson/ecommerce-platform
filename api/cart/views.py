from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Cart
from .serializers import CartSerializer
from django.db.models import Q

# Create your views here.
class CartView(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request, id=None):
    if id:
      try:
        result = Cart.objects.get(id=id)
        serializer = CartSerializer(result)
        return Response({'status': 'success', 'cart': serializer.data}, status=status.HTTP_200_OK)
      except Cart.DoesNotExist:
        return Response({'status': 'error', 'message': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
    
    username = request.GET.get('username')

    if username:
      try:
        result = Cart.objects.filter(username=username).values()
        serializer = CartSerializer(result, many=True)
        return Response({'status': 'success', 'carts': serializer.data}, status=status.HTTP_200_OK)
      except Cart.DoesNotExist:
        return Response({'status': 'error', 'message': 'Cart not found for this user'}, status=status.HTTP_404_NOT_FOUND)
    
    results = Cart.objects.all()
    serializer = CartSerializer(results, many=True)
    return Response({'status': 'success', 'carts': serializer.data}, status=status.HTTP_200_OK)
  
  def post(self, request):
    serializer = CartSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({"status": "success", "data": serializer.data}, status = status.HTTP_201_CREATED)  
    else:
      return Response({"status": "error", "data": serializer.errors}, status = status.HTTP_400_BAD_REQUEST)

  def put(self, request, id):
    result = Cart.objects.get(id = id)
    serializer = CartSerializer(result, data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({"status": "success", "data": serializer.data}, status = status.HTTP_200_OK)
    else:
      return Response({"status": "error", "data": serializer.errors}, status = status.HTTP_400_BAD_REQUEST)

  def patch(self, request, id):
    result = Cart.objects.get(id = id)
    serializer = CartSerializer(result, data = request.data, partial = True)
    if serializer.is_valid():
      serializer.save()
      return Response({"status": "success", "data": serializer.data}, status = status.HTTP_200_OK)
    else:
      return Response({"status": "error", "data": serializer.errors}, status = status.HTTP_400_BAD_REQUEST)