from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from .models import User, Favorite
from .serializers import UserSerializer, FavoriteSerializer

@api_view(['GET'])
def api_get_user(request, user_name):                
    try:
        user = User.objects.get(name=user_name)
    except User.DoesNotExist:
        raise Http404()

    serialized_user = UserSerializer(user)
    return Response(serialized_user.data)

@api_view(['POST'])
def api_post_user(request):
    if request.method == 'POST' and not User.objects.filter(name=request.data['name']).exists():
        user = User()
        user_data = request.data
        user.name = user_data['name']
        user.password = user_data['password']
        user.save()

    serialized_user = UserSerializer(user)
    return Response(serialized_user.data)

@api_view(['GET'])
def api_get_favorite(request, user_name):                
    try:
        favorites = Favorite.objects.filter(user=User.objects.get(name=user_name))
    except User.DoesNotExist:
        raise Http404()

    serialized_favorites = FavoriteSerializer(favorites, many=True)
    return Response(serialized_favorites.data)

@api_view(['POST'])
def api_post_favorite(request):                
    if request.method == 'POST':
        favorite = Favorite()
        favorite_data = request.data
        favorite.user = User.objects.get(name=favorite_data['user'])
        favorite.tournament = favorite_data['tournament']
        favorite.save()

    serialized_favorite = FavoriteSerializer(favorite)
    return Response(serialized_favorite.data)

@api_view(['DELETE'])
def api_delete_favorite(request):                
    favorite = Favorite.objects.get(user=User.objects.get(name=request.data['user']), tournament=request.data['tournament'])
    favorite.delete()

    serialized_favorite = FavoriteSerializer(favorite)
    return Response(serialized_favorite.data)