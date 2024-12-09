from django.db import models

# Create your models here.
class Order(models.Model):
  order_id = models.IntegerField()
  username = models.CharField(max_length=20)
  product_id = models.IntegerField()
  count = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.order_id}"
