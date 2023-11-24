import json
from rest_framework import status
from rest_framework.authtoken.admin import User
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import  get_user_model
from procyclingstats import Race, RaceStartlist, Stage
from Cycling.models import Rider, Tour, GameTeam
from django.http import QueryDict
from django.http import HttpRequest


giro_latest = Race('/'.join(max(Race('/race/giro-d-italia/2020').prev_editions_select(), key=lambda entry: int(entry["text"]))['value'].split('/')[0:3]))
tour_latest = Race('/'.join(max(Race('/race/tour-de-france/2020').prev_editions_select(), key=lambda entry: int(entry["text"]))['value'].split('/')[0:3]))
vuelta_latest = Race('/'.join(max(Race('/race/vuelta-a-espana/2020').prev_editions_select(), key=lambda entry: int(entry["text"]))['value'].split('/')[0:3]))

def find_latest_race(race_name):
    race_name = f"race/{race_name.replace(' ', '-')}/2020"
    try:
        return Race('/'.join(max(Race(race_name).prev_editions_select(), key=lambda entry: int(entry["text"]))['value'].split('/')[0:3]))
    except Exception as e:
        return Response({'error': str(e)}, status=400)

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
				if not Rider.objects.filter(url=rider).exists():
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
def find_one_day_race(request):
    race_name = request.GET.get('race_name')
    try:
        race = find_latest_race(race_name)
        if race.is_one_day_race():
            print(race.url.split('/')[-2:])
            return Response({'name': race.name(), 'url': '/'.join(race.url.split('/')[-2:])}, status=200)
        return Response({'error': str(e)}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def add_tour(request):
    one_day_races = request.data.get('races')
    custom_tour_name = request.data.get('tourname')
    try:
        # frontend: return list of all stages that are one day races (klassiekers) when making a new tour instead of adding the klassiekers every time manually
        # frontend: make custom tour klassiekers deletable
        # finish custom tour name getting and then make the tour in the db
        print(custom_tour_name)
        if not Tour.objects.filter(url=custom_tour_name).exists():
            tour = Tour(url=custom_tour_name)
            tour.save()
        
        else:
            
            return Response({'error': "Tour already exists"}, status=400)
        # Get tour object
        tour = Tour.objects.get(url=custom_tour_name)
        
            
        for one_day_race in one_day_races:
            
            # if race not in db -> add it
            # if race now in db connect it the tour
            if not Stage.objects.filter(url=one_day_race['url']).exists():
                stage = Stage(url=one_day_race['url'],is_klassieker=True)
                stage.save()
                print("A")
            stage_tour = StageTour(stage=Stage.objects.get(url=one_day_race['url']), tour=tour,stage_number=0)
            stage_tour.save()
            print("B")
            print(stage_tour)
        
        return Response(True, status=200)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=400)


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
def calculate_score_per_renner_per_stage(request):
    stage_name = request.GET.get('stage_name')
    if not stage_name:
        return Response({'error': 'invalid stage data'}, status=400)

    stage = Stage(stage_name)
    
    try: 
        gc = stage.gc()[0]['rider_name']
        
    except IndexError:
        gc = ""
        
    try: 
        kom = stage.kom()[0]['rider_name']
        
    except IndexError:
        kom = ""    
        
    try: 
        point = stage.points()[0]['rider_name']
        
    except IndexError:
        point = ""    
    
    try:
        youth = stage.youth()[0]['rider_name']
    except IndexError:
        youth = ""

    point_array = [100, 80, 65, 55, 45, 35, 30, 25, 20, 17, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

    def calculate_points(rank):
        if rank is not None and 1 <= rank <= len(point_array):
            return point_array[rank - 1]
        return 0

    total = []

    for rider in stage.results():
        points = calculate_points(rider['rank'])
        total_points = points
        shirt_points = 0
        shirts = []

        if rider['rider_name'] == gc:
            shirt_points += 20
            total_points += 20
            shirts.append("gc")

        if rider['rider_name'] == kom:
            shirt_points += 10
            total_points += 10
            shirts.append("kom")

        if rider['rider_name'] == point:
            shirt_points += 10
            total_points += 10
            shirts.append("point")

        if rider['rider_name'] == youth:
            shirt_points += 5
            total_points += 5
            shirts.append("youth")

        total.append({'rider_name': rider['rider_name'], 'rider_rank': rider['rank'],'shirts': shirts, 'points': points, 'shirt_points': shirt_points, 'total_points': total_points})

    return Response({"test": total}, status=200)

@api_view(['GET'])
def calculate_score_per_renner_per_tour(request):
    tour_name = request.GET.get('tour_name')
    if not tour_name:
        return Response({'error': 'invalid tour data'}, status=400)
    stages = Race(tour_name).stages()
    stage_urls = [item['stage_url'] for item in stages]
    rider_summary = {}
    
    for url in stage_urls:
		# Create a new QueryDict for each stage URL
        query_dict = QueryDict(mutable=True)
        query_dict['stage_name'] = url
        drf_request = request._request
        drf_request.GET = query_dict
        
        # Call your DRF view or function with the Django request
        response = calculate_score_per_renner_per_stage(drf_request)
        
        if response.status_code == 200:
            stage_results = response.data.get('test', [])

            # Aggregate results for each rider
            for result in stage_results:
                rider_name = result['rider_name']
                if rider_name not in rider_summary:
                    rider_summary[rider_name] = {
                        'points': 0,
                        'shirt_points': 0,
                        'total_points': 0,
                    }

                rider_summary[rider_name]['points'] += result['points']
                rider_summary[rider_name]['shirt_points'] += result['shirt_points']
                rider_summary[rider_name]['total_points'] += result['total_points']
    
    # Convert the rider_summary dictionary to a list
    rider_summary_list = [{'rider_name': name, **data} for name, data in rider_summary.items()]

    # Sort the list by 'total_points' in descending order
    sorted_rider_summary = sorted(rider_summary_list, key=lambda x: x['total_points'], reverse=True)

    return Response({"rider_summary": sorted_rider_summary}, status=200)

@api_view(['GET'])
def get_team_riders(request):
    # Extract the team ID from the request query parameters
    team_id = request.GET.get('team_id')
    if not team_id:
        return Response({'error': 'Team ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Fetch the team with the given ID
        team = Team.objects.get(id=team_id)

        # Get all the riders in the team
        renners = team.renners.all()
        reserves = team.reserves.all()

        # Serialize the riders' data
        renners_data = [{'url': renner.url} for renner in renners]
        reserves_data = [{'url': renner.url} for renner in reserves]

        # Return the riders' data in the response
        return Response({
            'team_name': team.team_name,
            'renners': renners_data,
            'reserves': reserves_data
        }, status=status.HTTP_200_OK)
    except Team.DoesNotExist:
        return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_team_scores_per_stage(request):
    team_id = request.GET.get('team_id')
    stage_name = request.GET.get('stage_name')

    if not team_id or not stage_name:
        return Response({'error': 'Both Team ID and Stage Name are required'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new HttpRequest object for get_team_riders
    team_request = HttpRequest()
    team_request.method = 'GET'
    team_request.GET = request.GET.copy()
    team_request.GET['team_id'] = team_id

    # Call get_team_riders with the new HttpRequest
    team_response = get_team_riders(team_request)
    if team_response.status_code != status.HTTP_200_OK:
        return team_response
    team_riders = team_response.data['renners'] + team_response.data['reserves']

    # Reformat rider names from URLs to handle complex last names
    def format_name(url):
        parts = url.split('/')[-1].split('-')
        first_name = parts[-1].capitalize()
        last_name = ' '.join(parts[:-1]).upper()
        return f"{last_name} {first_name}"

    team_rider_names = [format_name(rider['url']) for rider in team_riders]
    print(team_rider_names)

    # Create a new HttpRequest object for calculate_score_per_renner_per_stage
    stage_request = HttpRequest()
    stage_request.method = 'GET'
    stage_request.GET = request.GET.copy()
    stage_request.GET['stage_name'] = stage_name

    # Call calculate_score_per_renner_per_stage with the new HttpRequest
    scores_response = calculate_score_per_renner_per_stage(stage_request)
    if scores_response.status_code != status.HTTP_200_OK:
        return scores_response
    all_scores = scores_response.data.get('test', [])

    # Filter scores for team riders
    team_scores = [score for score in all_scores if score['rider_name'] in team_rider_names]

    return Response({'team_name': team_response.data['team_name'], 'scores': team_scores}, status=status.HTTP_200_OK)
