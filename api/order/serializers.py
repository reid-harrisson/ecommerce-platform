from rest_framework import serializers  
from .models import Order

class OrderSerializer(serializers.ModelSerializer):  
    order_id = serializers.IntegerField()
    username = serializers.CharField(max_length=20, required=True)  
    product_id = serializers.IntegerField(required=True)  
    count = serializers.IntegerField(required=True)
    created_at = serializers.DateTimeField(read_only=True, required=False)
    updated_at = serializers.DateTimeField(read_only=True, required=False)

    class Meta:  
        model = Order
        fields = ('__all__')

    def create(self, validated_data):  
        """ 
        Create and return a new `Product` instance, given the validated data. 
        """

        return Order.objects.create(
            order_id=validated_data['order_id'],
            username=validated_data['username'],
            product_id=validated_data['product_id'],
            count=validated_data['count']
        )