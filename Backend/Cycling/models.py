from django.db import models
from django.contrib.auth.models import User

class TeamDB(models.Model):
    url = models.CharField(max_length=100, unique=True)
    
    
class RaceDB(models.Model):
    url = models.CharField(max_length=100, unique=True)


class RiderDB(models.Model):
    url = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    nationality = models.CharField(max_length=2)
    team = models.ForeignKey(TeamDB, on_delete=models.CASCADE)

class GameDB(models.Model):
    race = models.ForeignKey(RaceDB, on_delete=models.CASCADE)
    players = models.ManyToManyField(User, through='ChosenRidersDB')

class ChosenRidersDB(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    rider = models.ForeignKey(RiderDB, on_delete=models.CASCADE)
    game = models.ForeignKey(GameDB, on_delete=models.CASCADE)


