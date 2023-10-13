from django.http import JsonResponse
from service.userservice import UserService
from django.views.decorators.csrf import csrf_exempt

class UserController:
    @csrf_exempt
    def add_user(request):
        return UserService.add_user(request)