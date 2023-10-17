import json
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import authenticate
from django.contrib.auth import authenticate, login, logout, get_user_model

from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie, get_token


@api_view(['POST'])
def my_login(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    if username is None or password is None:
        return Response({'detail': 'Please provide username and password.'}, status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if user is None:
        return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)
    login(request, user)
    return Response({'username': user.get_username()}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def my_logout(request):
    logout(request)
    return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)

@ensure_csrf_cookie
@api_view(['GET'])
@authentication_classes([SessionAuthentication])
def my_authenticate(request):
    if not request.user.is_authenticated:
        return Response({'isAuthenticated': False}, status=status.HTTP_401_UNAUTHORIZED)
    response = Response({"message": "Set CSRF cookie"}, status=status.HTTP_200_OK)
    response["X-CSRFToken"] = get_token(request)
    return response


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def my_whoami(request):
    if not request.user.is_authenticated:
        return Response({'isAuthenticated': False}, status=status.HTTP_401_UNAUTHORIZED)
    return Response({'username': request.user.username}, status=status.HTTP_200_OK)
