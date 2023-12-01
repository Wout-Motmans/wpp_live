class StageDummy:
    def __init__(self, race_name, stage_number, date, departure, arrival, distance, gc):
        try:
            self.race_name = race_name
        except Exception as e:
            print(f"Error assigning 'race_name': {str(e)}")
            self.race_name = None
        
        try:
            self.stage_number = stage_number
        except Exception as e:
            print(f"Error assigning 'stage_number': {str(e)}")
            self.stage_number = None
        
        try:
            self.date = date
        except Exception as e:
            print(f"Error assigning 'date': {str(e)}")
            self.date = None
        
        try:
            self.departure = departure
        except Exception as e:
            print(f"Error assigning 'departure': {str(e)}")
            self.departure = None
        
        try:
            self.arrival = arrival
        except Exception as e:
            print(f"Error assigning 'arrival': {str(e)}")
            self.arrival = None
        
        try:
            self.distance = distance
        except Exception as e:
            print(f"Error assigning 'distance': {str(e)}")
            self.distance = None
        
        try:
            self.gc = gc
        except Exception as e:
            print(f"Error assigning 'gc': {str(e)}")
            self.gc = None

    def __str__(self):
        return f"Stage {self.stage_number} of {self.race_name} on {self.date}"

# Manually create a stage_dummy object
# stage_data = {
#     'race_name': 'Tour de France 2022',
#     'stage_number': 18,
#     'date': '2022-07-21',
#     'departure': 'Lourdes',
#     'arrival': 'Hautacam',
#     'distance': 143.2,
#     'gc': [
#         {
#             'age': 25,
#             'bonus': 32,
#             'nationality': 'DK',
#             'pcs_points': 0,
#             'prev_rank': 1,
#             'rank': 1,
#             'rider_name': 'VINGEGAARD Jonas',
#             'rider_url': 'rider/jonas-vingegaard-rasmussen',
#             'team_name': 'Jumbo-Visma',
#             'team_url': 'team/team-jumbo-visma-2022',
#             'time': '71:53:34',
#             'uci_points': 25.0
#         }
#         # Add more rider data here
#     ]
# }

# stage_dummy = StageDummy(**stage_data)

# Access stage_dummy attributes
print(f"Stage Date: {stage_dummy.date}")
print(f"Stage Departure: {stage_dummy.departure}")
print(f"Stage Arrival: {stage_dummy.arrival}")
print(f"Stage Distance: {stage_dummy.distance} km")
print(f"Stage GC Results: {len(stage_dummy.gc)} riders")
 