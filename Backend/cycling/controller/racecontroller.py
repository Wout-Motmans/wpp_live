from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from procyclingstats import Race

@api_view(['GET'])
def get_race_info(request):
    print("here")
    race_name = request.GET.get('race_name')

    if race_name:
        try:
            race = Race(race_name)
            name = race.name()
            nationality = race.nationality()

            return Response({'name': name, 'nationality': nationality}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
    else:
        return Response({'error': 'race_name parameter is required'}, status=400)
