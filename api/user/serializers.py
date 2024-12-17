from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserDetail

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            if key == 'password':
                instance.set_password(value)
            else:
                setattr(instance, key, value)
        instance.save()
        return instance

class UserDetailSerializer(serializers.ModelSerializer):  
    username = serializers.CharField(max_length=20, required=True)  
    role = serializers.CharField(max_length=10, required=True)  

    class Meta:  
        model = UserDetail
        fields = ('__all__') 

    def create(self, validated_data):  
        return UserDetail.objects.create(**validated_data)  

    def update(self, instance, validated_data):  
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance