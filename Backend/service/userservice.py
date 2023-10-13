from model.usermodel import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


class UserService:
    @csrf_exempt
    def add_user(request):
        
        
        
        user = User(username="testname", password="pass")

        response_data = {
            "id":1,
            "username": user.username,
            "password": user.password
        } 

        #user.save()
        return  JsonResponse(response_data)