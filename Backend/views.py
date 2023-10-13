from django.http import HttpResponse
from django.shortcuts import render
from procyclingstats import Race

# Create a Race object for the Giro d'Italia 2022
race = Race("race/grand-prix-chantal-biya/2023/stage-4")

# Parse the race information from the website
race_data = race.parse()

# Get the nationality of the race
name = race.name()
nationality = race.nationality()

test = name, "is hosted in ", nationality

def show_race(request):
    # Your view logic here
    return HttpResponse(test)
