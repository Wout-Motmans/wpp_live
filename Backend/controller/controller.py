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