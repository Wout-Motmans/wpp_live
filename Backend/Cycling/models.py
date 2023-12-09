from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

class Stage(models.Model):
    id = models.AutoField(primary_key=True)
    url = models.CharField(max_length=255)
    is_klassieker = models.BooleanField(default=False)
    stage_type = models.CharField(
        max_length=20,
        choices=[
            ('not_defined', _('Not defined')),
            ('bergrit', _('Bergrit')),
            ('tijdrit', _('Tijdrit')),
            ('heuvels', _('Heuvels')),
            ('teamtijdrit', _('Teamtijdrit')),
            ('finish_op_berg', _('Finish op Berg'))
        ],
        default='non_defined'
    )
    depart = models.CharField(max_length=255)
    arrival = models.CharField(max_length=255)
    date = models.CharField(max_length=255)

class Tour(models.Model):
    id = models.AutoField(primary_key=True)
    is_klassieker = models.BooleanField(default=False)
    url = models.CharField(max_length=255)

class Game(models.Model):
    id = models.AutoField(primary_key=True)
    tour = models.OneToOneField(Tour, on_delete=models.CASCADE)
    is_finished = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

class GameTeam(models.Model):
    id = models.AutoField(primary_key=True)
    auth_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)

class Rider(models.Model):
    id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    real_team = models.CharField(max_length=255)

class RiderGameTeam(models.Model):
    id = models.AutoField(primary_key=True)
    game_team = models.ForeignKey(GameTeam, on_delete=models.CASCADE)
    rider = models.ForeignKey(Rider, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10,
        choices=[
            ('active', _('Active')),
            ('sub', _('Substitute')),
            ('non_active', _('Non Active'))
        ],
        default='non_active'
    )

class StageTour(models.Model):
    id = models.AutoField(primary_key=True)
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)
    stage_number = models.IntegerField()

class RiderStage(models.Model):
    id = models.AutoField(primary_key=True)
    point = models.IntegerField()
    shirt_points = models.IntegerField()
    total_points = models.IntegerField()
    cumulative_total_points = models.IntegerField()
    position = models.IntegerField()
    shirts = models.JSONField()  
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE)
    rider = models.ForeignKey(Rider, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10,
        choices=[
            ('active', _('Active')),
            ('sub', _('Substitute')),
            ('non_active', _('Non Active'))
        ],
        default='non_active'
    )