from rest_framework import serializers  
from .models import Product  
  
class ProductSerializer(serializers.ModelSerializer):  
    title = serializers.CharField(max_length=50, required=True)  
    description = serializers.CharField(max_length=500, required=True)  
    image_url = serializers.CharField(max_length=200, required=True)  
    price = serializers.FloatField()  
    quantity = serializers.IntegerField()  

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
        instance.title = validated_data.get('title', instance.title)  
        instance.description = validated_data.get('description', instance.description)  
        instance.image_url = validated_data.get('image_url', instance.image_url)  
        instance.price = validated_data.get('price', instance.price)  
        instance.quantity = validated_data.get('quantity', instance.quantity)  
  
        instance.save()
        return instance