from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from procyclingstats import Race

# Create a Race object for the Giro d'Italia 2022
race = Race("race/grand-prix-chantal-biya/2023/stage-4")

# Parse the race information from the website
race_data = race.parse()

# Get the nationality of the race
name = race.name()
nationality = race.nationality()

test = name, "is hosted in ", nationality

# Print the nationality
print(name, "is hosted in", nationality)

def hello_world(request):
    return HttpResponse(test)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', hello_world, name='hello_world'),  # This maps the root URL to the hello_world view
]
