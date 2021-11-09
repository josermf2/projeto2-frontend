from rest_framework import serializers
from .models import User, Favorite

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'password']

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['user', 'tournament']