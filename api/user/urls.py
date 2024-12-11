from django.urls import path
from .views import RegisterView, LoginView, UserView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', UserView.as_view(), name='get_all'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]