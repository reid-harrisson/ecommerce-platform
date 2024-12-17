from django.db import models

class Cart(models.Model):
    username = models.CharField(max_length=20)
    product_id = models.IntegerField()
    count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.username}-{self.product_id}"
