from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, UserDetailSerializer
from .models import UserDetail

class RegisterView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        userdetail_serializer = UserDetailSerializer(data=request.data)
        if user_serializer.is_valid() and userdetail_serializer.is_valid():
            user = user_serializer.save()
            userdetail = userdetail_serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': userdetail.role,
            }, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        userdetail = UserDetail.objects.get(username=username)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': userdetail.role,
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

