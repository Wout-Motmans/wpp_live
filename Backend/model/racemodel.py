from django.db import models

# Hier komt database logic, deze class wordt nu nog niet gebruikt

class Race(models.Model):
    name = models.CharField(max_length=100)
    nationality = models.CharField(max_length=100)
    # You can add more fields as needed to store other race information

    def __str__(self):
        return self.name
