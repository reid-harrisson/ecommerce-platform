from rest_framework import serializers  
from .models import Cart 

class CartSerializer(serializers.ModelSerializer):  
    username = serializers.CharField(max_length=20, required=True)  
    product_id = serializers.IntegerField(required=True)  
    count = serializers.IntegerField(required=True)
    created_at = serializers.DateTimeField(read_only=True, required=False)
    updated_at = serializers.DateTimeField(read_only=True, required=False)

    class Meta:  
        model = Cart
        fields = ('__all__')

    def create(self, validated_data):  
        """ 
        Create and return a new `Product` instance, given the validated data. 
        """

        return Cart.objects.create(
            username=validated_data['username'],
            product_id=validated_data['product_id'],
            count=validated_data['count']
        )

    def update(self, instance, validated_data):  
        """
        Update and return an existing `Product` instance, given the validated data. 
        """  
        instance.username = validated_data.get('username', instance.username)  
        instance.product_id = validated_data.get('product_id', instance.product_id)  
        instance.count = validated_data.get('count', instance.count)
  
        instance.save()
        return instance