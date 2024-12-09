from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserDetail

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class UserDetailSerializer(serializers.ModelSerializer):  
    username = serializers.CharField(max_length=20, required=True)  
    role = serializers.CharField(max_length=10, required=True)  

    class Meta:  
        model = UserDetail
        fields = ('__all__') 

    def create(self, validated_data):  
        """ 
        Create and return a new `Product` instance, given the validated data. 
        """
        return UserDetail.objects.create(**validated_data)  

    def update(self, instance, validated_data):  
        """
        Update and return an existing `Product` instance, given the validated data. 
        """  
        instance.username = validated_data.get('username', instance.username)
        instance.role = validated_data.get('role', instance.role)
  
        instance.save()
        return instance