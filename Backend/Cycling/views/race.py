import json
from rest_framework import status
from rest_framework.authtoken.admin import User
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import  get_user_model
from procyclingstats import Race, RaceStartlist, Stage as Stageapi
from Cycling.models import RiderStage, Rider, RiderGameTeam, StageTour, Stage, Game, GameTeam, Tour
from django.http import QueryDict
from django.http import HttpRequest
import requests
from bs4 import BeautifulSoup
import re
from .stagedummy import StageDummy
import urllib.parse
from django.core.serializers import serialize
from django.db.models import F



@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_all_db(request):
    if request.user.is_staff:
        #RiderGameTeam.objects.all().delete()
        #StageTour.objects.all().delete()
        #Game.objects.all().delete()
        #GameTeam.objects.all().delete()
        riders = Rider.objects.all().values('id', 'full_name', 'url', 'real_team')
        ridergameteams = RiderGameTeam.objects.all().values('id', 'game_team__id', 'rider__full_name', 'status')
        stagetours = StageTour.objects.all().values('id', 'stage__url', 'tour__url', 'stage_number')
        stages = Stage.objects.all().values('id', 'url', 'is_klassieker', 'stage_type')
        games = Game.objects.all().values('id', 'tour__url')
        gameteams = GameTeam.objects.all().values('id', 'auth_user__username', 'game__tour__url')
        tours = Tour.objects.all().values('id', 'is_klassieker', 'url')
        data = {'riders':riders, 'ridergameteams': ridergameteams, 'stagetours':stagetours, 'stages':stages, 'games':games, 'gameteams':gameteams, 'tours':tours}
        return Response(status=status.HTTP_200_OK, data=data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)



@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_future_tours(request):
	try:
		if request.user.is_staff:
			data = []
			for tour in Tour.objects.all():
				if tour.is_klassieker:
					data.append({'key' : tour.id, 'name': tour.url.split('/')[0], 'year': tour.url.split('/')[1]})
				else:
					race = Race(f'race/{tour.url}')
					if race.name() not in [x.get('name') for x in data]:
						latest_year = max([entry['text'] for entry in race.prev_editions_select() if entry['text'].isdigit()])
						url_name = race.relative_url().split('/')[1]
						full_unique_url = f'{url_name}/{latest_year}'
						if not Tour.objects.filter(url=full_unique_url).exists():
							Tour.objects.create(url=full_unique_url, is_klassieker=False)
						latest_race = Tour.objects.get(url=full_unique_url)
						data.append({'id' : latest_race.id, 'name': race.name(), 'year': latest_year })
			return Response(status=status.HTTP_200_OK, data=data)
		return Response(status=status.HTTP_401_UNAUTHORIZED)
	except Exception as e:
		return Response({'error': str(e)}, status=400)

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_future_klassiekers(request):
	try:
		if request.user.is_staff:
			data = []
			for tour in Stage.objects.all().filter(is_klassieker=True):
				race = Race(f'race/{tour.url}')
				if race.name() not in [x.get('name') for x in data]:
					latest_year = max([entry['text'] for entry in race.prev_editions_select() if entry['text'].isdigit()])
					url_name = race.relative_url().split('/')[1]
					full_unique_url = f'{url_name}/{latest_year}'
					if not Stage.objects.filter(url=full_unique_url).exists():
						Stage.objects.create(url=full_unique_url, is_klassieker=True)
					latest_race = Stage.objects.get(url=full_unique_url)
					data.append({'key' : latest_race.id, 'name': race.name(), 'year': latest_year })
			return Response(status=status.HTTP_200_OK, data=data)
		return Response(status=status.HTTP_401_UNAUTHORIZED)
	except Exception as e:
		return Response({'error': str(e)}, status=400)

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def add_tour(request):
	tour_name = request.GET.get('tour_name').replace(' ','-')
	try:
		tour_names = [y['url'].split('/')[1] for y in Tour.objects.values('url')]
		if tour_name not in tour_names:
			text = get_years_from_race(f'https://www.procyclingstats.com/race/{tour_name}')
			jaartal = re.search(r'\d{4}', text).group(0)
			Tour.objects.create(url = f'{tour_name}/{jaartal}', is_klassieker = False)
   
		return Response(True, status=200)
	except Exception as e:
		print(e)


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def add_klassieker(request):
	race_name = request.GET.get('race_name').replace(' ','-')
	try:
		text = get_years_from_race(f'https://www.procyclingstats.com/race/{race_name}')
		jaartal = re.search(r'\d{4}', text).group(0)
		race = Race(url=f'race/{race_name}/{jaartal}')
		if race.is_one_day_race():
			Stage.objects.create(url = f'{race_name}/{jaartal}', is_klassieker = True)
			return Response(True, status=200)
		return Response({'error: Not a one day race'}, status=400)
	except Exception as e:
		print(e)
		return Response({'error': str(e)}, status=400)



@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_start_riders(request):
	raceId = request.GET.get('raceId')
	if request.user.is_staff:
		race = Tour.objects.get(id=raceId)
		startlist = RaceStartlist(f"race/{race.url}/startlist").startlist()
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
		tourId = data.get('raceId')
		activeAmount = data.get('activeAmount')
		teams = data.get('teams')
		tour = Tour.objects.get(id=tourId)
		game = Game.objects.create(tour=tour)
		for team in teams:
			user = User.objects.get(id=team.get('userId'))
			gameteam = GameTeam.objects.create(auth_user=user, game=game)
			for i, rider in enumerate(team.get('riders')):
				if not Rider.objects.filter(url=rider.get('rider_url')).exists():
					Rider.objects.create(url=rider.get('rider_url'), full_name= rider.get('rider_name'),real_team=rider.get('team_url'))
				rider = Rider.objects.get(url=rider.get('rider_url'))
				RiderGameTeam.objects.create(game_team=gameteam, rider=rider, status='active' if activeAmount > i else 'sub')
		return Response(status=status.HTTP_200_OK)
	return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def add_tour_with_klassiekers(request):
	one_day_races = request.data.get('races')
	tour_name = request.data.get('tour_name')
	try:
		if (len(one_day_races) == 0):
			return Response({'error': 'Geen Klassiekers Aangeduid'}, status=400)
		jaartallen = [one_day_race['year'] for one_day_race in one_day_races]
		jaartal = set(jaartallen)
		if len(jaartal) != 1:
			return Response({'error': 'Klassiekers jaartallen verschillen'}, status=400)
		jaartal = jaartal.pop()
		
		customtour_name = f'{tour_name}/{jaartal}'
		if Tour.objects.filter(url=customtour_name).exists():
			return Response({'error': "Tour already exists"}, status=400)
		tour = Tour.objects.create(url=customtour_name, is_klassieker=True)

		one_day_races_sorted = sorted([Race(f'race/{Stage.objects.get(id=one_day_race.get("key")).url}') for one_day_race in one_day_races], key=lambda x: x.startdate())

		for count, race in enumerate(one_day_races_sorted):
			stage = Stage.objects.get(url='/'.join(race.relative_url().split('/')[-2:]))
			stage_tour = StageTour(stage=stage, tour=tour,stage_number=count)
			stage_tour.save()
		
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
        stage = Stageapi(stage_name)
        date = stage.date()
        distance = stage.distance()
        stage_type = stage.stage_type()
        depart = stage.departure()
        arrival = stage.arrival()
        results = [{'rider_name': result['rider_name'], 'rider_number': result['rider_number'], 'rank': result['rank'], 'uci_points' : result['uci_points']} for result in stage.results()]
        return Response({'name' : stage_name, 'date' : date, 'distance' : distance, "stage_type" : stage_type, "depart" : depart, "arrival" : arrival, "results" : results}, status=200)
    except Exception as e:
        # Create a new QueryDict        
        query_dict = QueryDict(mutable=True)
        query_dict['stage_name'] = stage_name
        drf_request = request._request
        drf_request.GET = query_dict
        response = get_stage_info_scrape(drf_request)
        return response
		
@api_view(['GET'])
def calculate_score_per_renner_per_stage(request):
	stage_name = request.GET.get('stage_name')
	if not stage_name:
		return Response({'error': 'invalid stage data'}, status=400)

	stage = Stageapi(stage_name)
	
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


def check_page_existence(url):
	try:
		response = requests.head(url)
		return response.status_code == 200
	except requests.RequestException:
		return False

def get_years_from_race(url):
	if not check_page_existence(url):
		return Exception("error, page not found")
	soup = BeautifulSoup(requests.get(url).content, 'html.parser')
	div_element = soup.find('div', class_='pageSelectNav')
	if div_element:
		div_text = div_element.get_text(strip=True)
		return div_text
	else:
		return "Div class not found on the page"

@api_view(['GET'])
def get_stage_info_scrape(request):
	stage_name = request.GET.get('stage_name')

	if not stage_name:
		return Response({'error': 'Stage name is required'}, status=400)
	
	# Decode the URL-encoded string
	decoded_stage_name = urllib.parse.unquote(stage_name)

	# Construct the desired URL
	base_url = "https://www.procyclingstats.com/"
	url = f"{base_url}{decoded_stage_name}"

	# Scrape data from the provided URL
	response = requests.get(url)
	if response.status_code == 200:
		soup = BeautifulSoup(response.text, 'html.parser')
		race_name = soup.find('ul', class_='thumbnails').find('a')
		stage_date = soup.find('div', text="Date:")
		if stage_date:
			date = stage_date.find_next('div').get_text()
		distance_element = soup.find('div', class_='sub').find('span', class_='red fw400')

		if distance_element:
			distance = distance_element.get_text()  
		rider_names = soup.find_all('a', href=lambda href: href and 'rider/' in href)
		rider_teams = soup.find_all('td', class_='cu600')
		
		results = []
		for i in range(len(rider_names)):
			result = {
				'rider_name': rider_names[i].get_text(),
				'rider_number' : "",
				'uci_points': 0,
				'team_name': rider_teams[i].get_text(),
				'rank': str(i + 1),
			}
			results.append(result)
			
		final_result = {
			'name' : race_name.get_text(),
			'date' : date,
			'distance' : distance,
			'stage_type' : "",
			'depart' : "",
			'arrival' : "",
			'results': results
		}
	
		return Response(final_result, status=200)
	else:
		return Response('Failed to retrieve the page', status=500)

@api_view(['GET'])
def get_stage_info_from_db(request):
    # Retrieve the 'stage_url' from the GET parameters
    stage_url = request.GET.get('stage_url', None)

    # Check if the 'stage_url' parameter was provided
    if not stage_url:
        return Response({'error': 'Stage URL is required'}, status=400)

    try:
        # Query the database based on the provided 'stage_url'
        results = RiderStage.objects.select_related(
            'rider',
            'stage',
            'rider__game_team',
            'rider__game_team__auth_user'
        ).filter(
            stage__url=stage_url
        ).annotate(
            position=F('position'),
            full_name=F('rider__full_name'),
            real_team=F('rider__real_team'),
            points=F('point'),
            shirt_points=F('shirt_points'),
            total_points=F('total_points'),
            username=F('rider__game_team__auth_user__username'),
            stage_url=F('stage__url')
        )

        # Serialize the query set to JSON
        json_data = serialize('json', results, use_natural_primary_keys=True, fields=(
            'position', 'full_name', 'real_team', 'points', 'shirt_points', 'total_points', 'username', 'stage_url'
        ))

        # Return the JSON data
        return Response(json_data, status=200)

    except Exception as e:
        # Log the exception or handle it as needed
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def get_stages_from_tour(request):
    try:
        tour_name = request.GET.get('tour_name')
        if not tour_name:
            return Response({'error': 'Tour name is required'}, status=400)

        # Retrieve the tour; raise an error if not found
        tour = Tour.objects.get(url=tour_name)
        
        # Check if the tour already has stages linked with it
        if StageTour.objects.filter(tour=tour).exists():
            return Response({'message': 'Tour already has stages linked with it'}, status=200)
        
        race = Race(f'race/{tour.url}')
        stages = race.stages()
        
        for i, stage_data in enumerate(stages, start=1):
            stage_url = "race/" + tour_name + "/stage-" + str(i)
            currentstage = Stageapi(stage_url)

            # Attempt to retrieve arrival, departure, and date
            arrival = getattr(currentstage, 'arrival', '')()
            depart = getattr(currentstage, 'departure', '')()
            url = stage_url
            date = getattr(currentstage, 'date', None)()  # Retrieve the date

            # Create or update a stage instance
            stage, stage_created = Stage.objects.update_or_create(
                url=url, 
                defaults={
                    'depart': depart,
                    'arrival': arrival,
                    'is_klassieker': False,
                    'stage_type': "non_defined",
                    'date': date,
                }
            )

            # Link stage to tour
            StageTour.objects.update_or_create(stage=stage, tour=tour, defaults={'stage_number': i})

        return Response({'message': 'Stages succesfully added in db'}, status=200)
    except Tour.DoesNotExist:
        return Response({'error': 'Tour not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def get_riderstage_from_stage(request):
    try:
        stage_name = request.GET.get('stage_name')
        currentstage = Stage.objects.get(url=stage_name)
        stage = Stageapi(stage_name)  # Assuming Stageapi is defined elsewhere

        # Retrieve jersey winners and stage results
        gc_rider, kom_rider, points_rider, youth_rider = "", "", "", ""
        for method, var in [(stage.gc, 'gc_rider'), (stage.kom, 'kom_rider'),
                            (stage.points, 'points_rider'), (stage.youth, 'youth_rider')]:
            try:
                locals()[var] = method()[0]['rider_name']
            except IndexError:
                pass

        # Define or import calculate_points function
        def calculate_points(rank):
            point_array = [100, 80, 65, 55, 45, 35, 30, 25, 20, 17, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
            return point_array[rank - 1] if rank and 1 <= rank <= len(point_array) else 0

        for rider in stage.results():
            # Check if the rider is in the database
            rider_obj = Rider.objects.filter(full_name=rider['rider_name']).first()
            if not rider_obj:
                continue  # Skip riders not in the database

            points = calculate_points(rider['rank'])
            total_points = points
            shirt_points = 0
            shirts = []

            for jersey, jersey_rider in [('gc', gc_rider), ('kom', kom_rider), 
                                         ('point', points_rider), ('youth', youth_rider)]:
                if rider['rider_name'] == jersey_rider:
                    bonus = 20 if jersey == 'gc' else 10 if jersey in ['kom', 'point'] else 5
                    shirt_points += bonus
                    total_points += bonus
                    shirts.append(jersey)

            # Get status from RiderGameTeam
            rider_game_team_status = RiderGameTeam.objects.filter(rider=rider_obj).first()
            status = rider_game_team_status.status if rider_game_team_status else 'non_active'

            # Create and save RiderStage instance
            rider_stage = RiderStage(
                point=points,
                shirt_points=shirt_points,
                total_points=total_points,
                cumulative_total_points=0,  # This needs to be calculated based on your logic
                position=rider['rank'],
                shirts=shirts,
                stage=currentstage,
                rider=rider_obj,
                status=status
            )
            rider_stage.save()

        return Response({"message": "RiderStage data updated successfully"}, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)     

@api_view(['GET'])
def get_riders_from_tour(request):
	tour_name = request.GET.get('tour_name')
	race = Tour.objects.get(url=tour_name)
	startlist = RaceStartlist(f"race/{race.url}/startlist").startlist()
	selected_keys = ["rider_name", "rider_url", "team_url"]
	result = [{key: item[key] for key in selected_keys} for item in startlist]
	return Response(status=status.HTTP_200_OK, data=result)
