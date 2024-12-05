from .views import ProductView
from django.urls import path

urlpatterns = [
  path('', ProductView.as_view()),
  path('<int:id>/', ProductView.as_view())
]