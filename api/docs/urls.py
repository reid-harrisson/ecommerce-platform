# example/urls.py
from django.urls import path

from .views import DocsView


urlpatterns = [
    path('', DocsView),
]