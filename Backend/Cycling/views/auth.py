import json
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import SessionAuthentication, authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.admin import User
from django.contrib.auth import authenticate, login, logout



@api_view(['POST'])
def my_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if username is None or password is None:
        return Response({'detail': 'Please provide username and password.'}, status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if user is None:
        return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)
    login(request, user)
    return Response({'username': user.get_username(), 'isAdmin': user.is_staff}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def my_logout(request):
    logout(request)
    return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
def my_authenticate(request):
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user.username)
        return Response({'username': user.username, 'isAdmin': user.is_staff}, status=status.HTTP_200_OK)
    return Response({'isAuthenticated': False}, status=status.HTTP_401_UNAUTHORIZED)
