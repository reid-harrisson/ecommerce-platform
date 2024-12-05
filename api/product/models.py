from django.db import models

# Create your models here.

class Product(models.Model):
  title = models.CharField(max_length=50)
  description = models.CharField(max_length=500)
  image_url = models.CharField(max_length=200)
  price = models.FloatField()
  quantity = models.IntegerField()

  def __str__(self):
    return self.title
