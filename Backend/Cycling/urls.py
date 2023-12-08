from django.contrib import admin
from django.urls import include, path
from .views import auth, user, race, stagedummy

urlpatterns = [
    path("admin/", admin.site.urls),
    path('login', auth.my_login),
    path('logout', auth.my_logout),
    path('authenticate', auth.my_authenticate),

    path('users', user.get_all_users),
    path('changeRole', user.change_user_role),
    path('adduser', user.add_user),
    path('deleteuser', user.delete_user),
    path('edituser', user.edit_user),
    
    path('getresultsrace', race.calculate_score_per_renner_per_stage),

    path('getraceinfo', race.get_race_info),
    path('getstageinfo', race.get_stage_info),
    path('getstageshirt', race.calculate_score_per_renner_per_stage),
    path('getresultstour', race.calculate_score_per_renner_per_tour),
    path('getteamriders', race.get_team_riders),
    path('calculateteamscoreperstage', race.get_team_scores_per_stage),
    
    path('getstageinfoscrape', race.get_stage_info_scrape),

    path('getStartRiders', race.get_start_riders),
    path('getFutureTours', race.get_future_tours),
    path('getFutureKlassiekers', race.get_future_klassiekers),
    path('addTour', race.add_tour),
    path('addKlassieker', race.add_klassieker),
    path('addTourWithKlassiekers', race.add_tour_with_klassiekers),
    path('addGame', race.add_game),
    path('alldb', race.get_all_db)
    
]


