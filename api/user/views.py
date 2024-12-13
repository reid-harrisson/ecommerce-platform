from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, UserDetailSerializer
from .models import UserDetail
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class UserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        user_serializers = UserSerializer(users, many = True)
        users = user_serializers.data
        data = []
        for user in users:
            userdetail = UserDetail.objects.get(username=user['username'])
            data.append({
                **user,
                'role': userdetail.role,
            })

        return Response({'status': 'success', 'users': data}, status = status.HTTP_200_OK)
        
    def patch(self, request):
        data = request.data
        user = User.objects.get(username = data["username"])
        userdetail = UserDetail.objects.get(username = data["username"])
        user_serializer = UserSerializer(user, data = data, partial = True)
        userdetail_serializer = UserDetailSerializer(userdetail, data = data)

        if user_serializer.is_valid() and userdetail_serializer.is_valid():
          user_serializer.save()
          userdetail_serializer.save()
          data = user_serializer.data
          data["role"] = userdetail_serializer.data["role"]
          return Response({"status": "success", "user": data }, status = status.HTTP_200_OK)  
        else:
          return Response({"status": "error", "user": user_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        data = request.data
        data['role']='user'
        user_serializer = UserSerializer(data=data)
        userdetail_serializer = UserDetailSerializer(data=data)
        if user_serializer.is_valid() and userdetail_serializer.is_valid():
            user = user_serializer.save()
            userdetail = userdetail_serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': userdetail.role,
            }, status=status.HTTP_201_CREATED)
        return Response({'error':user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

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
            user = User.objects.get(username=username)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': userdetail.role,
                'fullname': user.first_name+" "+user.last_name,
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

