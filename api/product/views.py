from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
class ProductView(APIView):

  def get(self, request, *args, **kwargs):
    result = Product.objects.all()
    serializers = ProductSerializer(result, many=True)
    return Response({'status': 'success', 'products': serializers.data}, status=200)
  
  def post(self, request):
    serializer = ProductSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)  
    else:
      return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    