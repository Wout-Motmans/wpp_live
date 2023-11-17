from django.contrib import admin
from django.urls import include, path
from .views import auth, user, race

urlpatterns = [
    path("admin/", admin.site.urls),
    path('login', auth.my_login),
    path('logout', auth.my_logout),
    path('authenticate', auth.my_authenticate),
    path('whoami', auth.my_whoami),

    path('users', user.get_all_users),
    path('changeRole', user.change_user_role),
    path('adduser', user.add_user),
    path('deleteuser', user.delete_user),
    path('edituser', user.edit_user),
    
    path('popraces', race.get_popular_races),
    path('startriders/<str:race_url>', race.get_start_riders),
    path('getresultsrace', race.calculate_score_per_renner_per_stage),

    path('getraceinfo', race.get_race_info),
    path('getstageinfo', race.get_stage_info),
    path('getstageshirt', race.calculate_score_per_renner_per_stage),
    path('getresultstour', race.calculate_score_per_renner_per_tour),
    
    path('addgame', race.add_game),
]


