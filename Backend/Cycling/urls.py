from django.contrib import admin
from django.urls import include, path
from .views import auth, user, race

urlpatterns = [
    path("admin/", admin.site.urls),
    path('login', auth.my_login),
    path('logout', auth.my_logout),
    path('authenticate', auth.my_authenticate),
    path('whoami', auth.my_whoami),

    path('users', user.get_all_users),
    path('changeRole', user.change_user_role),
    path('adduser', user.add_user),
    path('deleteuser', user.delete_user),
    path('edituser', user.edit_user),
]

#path('getraceinfo', get_race_info),

