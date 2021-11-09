from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)

    def __str__(self):
        return "{}".format(self.name)

class Favorite (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tournament = models.CharField(max_length=200)

    def __str__(self):
        return "{0}.{1}".format(self.user, self.tournament)