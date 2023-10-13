from django.contrib import admin
from django.urls import path
from controller.usercontroller import UserController

urlpatterns = [
    path('admin/', admin.site.urls),
    path('adduser/', UserController.add_user)
]