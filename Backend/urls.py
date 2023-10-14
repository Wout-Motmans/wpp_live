from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from controller.controller import get_all_users, change_user_role, add_user, delete_user, edit_user

urlpatterns = [
    path('admin', admin.site.urls),
    path('auth', obtain_auth_token),
    path('users', get_all_users),
    path('changeRole', change_user_role),
    path('adduser', add_user),
    path('deleteuser', delete_user),
    path('edituser', edit_user),
]