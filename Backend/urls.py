from django.contrib import admin
from django.urls import path
from controller.usercontroller import UserController
from controller.racecontroller import get_race_details

urlpatterns = [
    path('admin/', admin.site.urls),
    path('adduser/', UserController.add_user),
    path('getracedetails/', get_race_details)
]