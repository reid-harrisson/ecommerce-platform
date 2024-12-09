from django.db import models

# Create your models here.
class UserDetail(models.Model):
  ROLES = (
      ('admin', 'Admin'),
      ('manager', 'Manager'),
      ('user', 'User'),
  )
  username = models.CharField(max_length=20)
  role = models.CharField(max_length=10, choices=ROLES, default='user')

  def __str__(self):
    return self.username
