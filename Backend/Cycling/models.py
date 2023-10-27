from django.db import models
from django.contrib.auth.models import User

class Tour(models.Model):
    tour_name = models.CharField(max_length=255)
    url = models.URLField()

class Renner(models.Model):
    url = models.URLField()

class Team(models.Model):
    team_name = models.CharField(max_length=255)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    renners = models.ManyToManyField(Renner, related_name='team_renners')
    reserves = models.ManyToManyField(Renner, related_name='team_reserves')