from .views import OrderView
from django.urls import path

urlpatterns = [
  path('', OrderView.as_view()),
  path('<int:order_id>/', OrderView.as_view()),
]