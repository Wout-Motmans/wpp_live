import json
from rest_framework import status
from rest_framework.authtoken.admin import User
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    if request.user.is_staff:
        users = get_user_model().objects.values_list("id", "username", "is_superuser")
        data = [{"id": value[0], "username": value[1], "superuser": value[2]} for value in users]
        return Response(status=status.HTTP_200_OK, data=data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_user_role(request):
    if request.user.is_staff:
        data = json.loads(request.body.decode('utf-8'))
        user_id = data.get("id")
        new_is_staff = data.get("staff")
        user = User.objects.get(id=user_id)
        user.is_staff = new_is_staff
        user.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_user(request):
    if request.user.is_staff:
        data = json.loads(request.body.decode('utf-8'))
        username = data.get("username")
        password = data.get("password")
        User.objects.create_user(username, password)
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_user(request):
    if request.user.is_staff:
        data = json.loads(request.body.decode('utf-8'))
        user_id = int(data.get("id"))
        user = User.objects.get(id=user_id)
        user.delete()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_user(request):
    if request.user.is_staff:
        data = json.loads(request.body.decode('utf-8'))
        user_id = int(data.get("id"))
        user = User.objects.get(id=user_id)

        new_username = data.get("username")
        if new_username:
            user.username = new_username

        new_password = data.get("password")
        if new_password:
            user.set_password(new_password)
        user.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)