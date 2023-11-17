from django.db import models
from django.conf import settings

class Stage(models.Model):
    url = models.CharField(max_length=255)
    is_klassieker = models.BooleanField(default=False)

class Tour(models.Model):
    is_klassieker = models.BooleanField(default=False)
    url = models.CharField(max_length=255)

class Game(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)

class GameTeam(models.Model):
    auth_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)

class Rider(models.Model):
    full_name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    real_team = models.CharField(max_length=255)

class RiderGameTeam(models.Model):
    game_team = models.ForeignKey(GameTeam, on_delete=models.CASCADE)
    rider = models.ForeignKey(Rider, on_delete=models.CASCADE)

class StageTour(models.Model):
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)

class RiderStage(models.Model):
    point = models.IntegerField()
    shirt_points = models.IntegerField()
    total_points = models.IntegerField()
    cumulative_total_points = models.IntegerField()
    position = models.IntegerField()
    shirts = models.JSONField()  # Assuming it's an array of strings
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE)
    rider = models.ForeignKey(Rider, on_delete=models.CASCADE)
