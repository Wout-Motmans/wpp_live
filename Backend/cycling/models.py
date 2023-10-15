from django.db import models

class User(models.Model):
   username = models.CharField(max_length=30)
   password = models.CharField(max_length=30)

   class Meta:
       app_label = 'cycling'
       db_table = 'users'

   def __str__(self):
       return self.username 