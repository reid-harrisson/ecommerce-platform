from .views import CartView
from django.urls import path

urlpatterns = [
  path('', CartView.as_view()),
  path('<int:id>/', CartView.as_view())
]