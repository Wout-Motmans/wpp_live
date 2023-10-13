from Backend.service.raceservice import get_race_info
from django.http import JsonResponse

def get_race_details(request):
    name, nationality = get_race_info()
    response_data = {
        'name': name,
        'nationality': nationality,
    }
    return JsonResponse(response_data)
