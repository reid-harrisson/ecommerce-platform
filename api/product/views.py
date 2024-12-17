from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
class ProductView(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request, id=None):
    if id:
      try:
        result = Product.objects.get(id=id)
        serializer = ProductSerializer(result)
        return Response({'status': 'success', 'product': serializer.data}, status=status.HTTP_200_OK)
      except Product.DoesNotExist:
        return Response({'status': 'error', 'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
      results = Product.objects.all().order_by('id')
      serializer = ProductSerializer(results, many=True)
      return Response({'status': 'success', 'products': serializer.data}, status=status.HTTP_200_OK)
  
  def post(self, request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
    return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

  def put(self, request, id):
    try:
      result = Product.objects.get(id=id)
      serializer = ProductSerializer(result, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
      else:
        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Product.DoesNotExist:
      return Response({"status": "error", "message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

  def patch(self, request, id):
    try:
      result = Product.objects.get(id=id)
      serializer = ProductSerializer(result, data=request.data, partial=True)
      if serializer.is_valid():
        serializer.save()
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
      else:
        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Product.DoesNotExist:
      return Response({"status": "error", "message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
  def delete(self, request, id):
    try:
      result = Product.objects.get(id = id)
      result.delete()
      return Response({"status": "success", "data": "Product Deleted"}, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
      return Response({"status": "error", "data": "Product not found"}, status=status.HTTP_404_NOT_FOUND)