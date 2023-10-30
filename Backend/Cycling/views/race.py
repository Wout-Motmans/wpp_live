import json
from rest_framework import status
from rest_framework.authtoken.admin import User
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import  get_user_model
from procyclingstats import Race, RaceStartlist, Stage
from Cycling.models import Renner, Tour, Team


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
		data = request.data
		race = data.get('race')
		activeAmount = data.get('activeAmount')
		teams = data.get('teams')
		# Save the tour if not already there
		if not Tour.objects.filter(url=race).exists():
			tour = Tour(url=race)
			tour.save()
		# Get tour object
		tour = Tour.objects.get(url=race)

		for team in teams:
			user = User.objects.get(id=team.get('user'))
			user_team = Team(team_name=f"{user}s team", tour=tour, user=user)
			user_team.save()
			for i, rider in enumerate(team.get('riders')):
				if not Renner.objects.filter(url=rider).exists():
					renner = Renner(url=rider)
					renner.save()
				renner = Renner.objects.get(url=rider)
				if i < activeAmount:
					user_team.renners.add(renner)
				else:
					user_team.reserves.add(renner)
			user_team.save()
		return Response(status=status.HTTP_200_OK)
	return Response(status=status.HTTP_401_UNAUTHORIZED)


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
		results = [{'rider_name': result['rider_name'], 'rider_number': result['rider_number'], 'rank': result['rank'], 'uci_points' : result['uci_points']} for result in stage.results()]

		return Response({'name' : stage_name, 'date' : date, 'distance' : distance, "stage_type" : stage_type, "depart" : depart, "arrival" : arrival, "results" : results}, status=200)
	except Exception as e:
		return Response({'error': str(e)}, status=400)

@api_view(['GET'])
def calculate_score(request):
    stage_name = request.GET.get('stage_name')
    if not stage_name:
        return Response({'error': 'invalid stage data'}, status=400)

    stage = Stage(stage_name)
    gc = stage.gc()[0]['rider_name']
    kom = stage.kom()[0]['rider_name']
    point = stage.points()[0]['rider_name']
    
    try:
        youth_data = stage.youth()[0]
        youth_name = youth_data['rider_name']
    except IndexError:
        youth_name = ""

    point_array = [100, 80, 65, 55, 45, 35, 30, 25, 20, 17, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

    def calculate_points(rank):
        if rank is not None and 1 <= rank <= len(point_array):
            return point_array[rank - 1]
        return 0

    total = []

    for rider in stage.results():
        points = calculate_points(rider['rank'])
        shirt_points = 0

        if rider['rider_name'] == gc:
            shirt_points += 20
            points += 20

        if rider['rider_name'] == kom:
            shirt_points += 10
            points += 10

        if rider['rider_name'] == point:
            shirt_points += 10
            points += 10

        if rider['rider_name'] == youth_name:
            shirt_points += 5
            points += 5

        total.append({'rider_name': rider['rider_name'], 'rider_rank': rider['rank'], 'points': points, 'shirt points': shirt_points})

    return Response({"test": total}, status=200)

