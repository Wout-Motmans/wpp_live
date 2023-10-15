from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from cycling.controller.usercontroller import get_all_users, change_user_role, add_user, delete_user, edit_user
from cycling.controller.racecontroller import get_race_info

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login', obtain_auth_token),
    path('users', get_all_users),
    path('changeRole', change_user_role),
    path('adduser', add_user),
    path('deleteuser', delete_user),
    path('edituser', edit_user),
    path('getraceinfo', get_race_info),
]