from rest_framework import serializers  
from .models import Product  

class ProductSerializer(serializers.ModelSerializer):  
    class Meta:  
        model = Product  
        fields = ('__all__') 

    def create(self, validated_data):  
        """ 
        Create and return a new `Product` instance, given the validated data. 
        """  
        return Product.objects.create(**validated_data)  

    def update(self, instance, validated_data):  
        """
        Update and return an existing `Product` instance, given the validated data. 
        """  
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance