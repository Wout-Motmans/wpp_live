from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from Backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.show_race),  # This maps the root URL to the show_race view
]
