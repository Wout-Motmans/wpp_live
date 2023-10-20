import json
from rest_framework import status
from rest_framework.authtoken.admin import User
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import  get_user_model
from procyclingstats import Race, RaceStartlist, Stage
from Cycling.models import RiderDB, RaceDB, GameDB, ChosenRidersDB


giro_latest = Race('/'.join(max(Race('/race/giro-d-italia/2020').prev_editions_select(), key=lambda entry: int(entry["text"]))['value'].split('/')[0:3]))
tour_latest = Race('/'.join(max(Race('/race/tour-de-france/2020').prev_editions_select(), key=lambda entry: int(entry["text"]))['value'].split('/')[0:3]))
vuelta_latest = Race('/'.join(max(Race('/race/vuelta-a-espana/2020').prev_editions_select(), key=lambda entry: int(entry["text"]))['value'].split('/')[0:3]))


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_popular_races(request):
    if request.user.is_staff:
        data = [{'url': x.relative_url(),'name': x.name(),'year': x.year()} for x in [giro_latest, tour_latest, vuelta_latest]]
        return Response(status=status.HTTP_200_OK, data=data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_start_riders(request, race_url):
    if request.user.is_staff:
        startlist = RaceStartlist(f"{race_url.replace('_', '/')}/startlist").startlist()
        selected_keys = ["rider_name", "rider_url", "team_name", "team_url"]
        result = [{key: item[key] for key in selected_keys} for item in startlist]
        return Response(status=status.HTTP_200_OK, data=result)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def add_game(request):
    if request.user.is_staff:
        print(request.data)




        
        
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)




#for rider in startlist:
#    if not RiderDB.objects.get(url=rider['rider_url']):
#        rider = RiderDB(url=rider['rider_url'])
#        rider.save()























#wannes stuff (not touched)
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
    


#Jordy stuff
@api_view(['GET'])
def get_race_info(request):
    race_name = request.GET.get('race_name')
    print(race_name)
    try:
        race = Race(race_name)
        name = race.name()
        nationality = race.nationality()
        year = race.year()
        stages = [{'stage_name': stage['stage_name'], 'stage_url': stage['stage_url'], 'rider_name': stage['rider_name']} for stage in race.stages()]
        return Response({'name': name, 'nationality': nationality, 'year': year, 'stages': stages}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    


@api_view(['GET'])
def get_stage_info(request):
    stage_name = request.GET.get('stage_name')
    try:
        stage = Stage(stage_name)
        date = stage.date()
        distance = stage.distance()
        stage_type = stage.stage_type()
        depart = stage.departure()
        arrival = stage.arrival()
        print("HEREEEEEEEEEEEEEEEEEEEE")
        results = [{'rider_name': result['rider_name'], 'rider_number': result['rider_number'], 'rank': result['rank'], 'uci_points' : result['uci_points']} for result in stage.results()]

        return Response({'name' : stage_name, 'date' : date, 'distance' : distance, "stage_type" : stage_type, "depart" : depart, "arrival" : arrival, "results" : results}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
