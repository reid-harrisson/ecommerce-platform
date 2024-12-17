from rest_framework import serializers  
from .models import Cart 

class CartSerializer(serializers.ModelSerializer):  
    class Meta:  
        model = Cart
        fields = ('__all__')

    def create(self, validated_data):  
        """ 
        Create and return a new `Cart` instance, given the validated data. 
        """
        return Cart.objects.create(**validated_data)

    def update(self, instance, validated_data):  
        """
        Update and return an existing `Cart` instance, given the validated data. 
        """  
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance