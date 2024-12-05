from .views import ProductView
from django.urls import path

urlpatterns = [
  path('', ProductView.as_view())
]