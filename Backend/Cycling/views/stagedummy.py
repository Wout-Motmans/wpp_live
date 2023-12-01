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
# print(f"Stage Date: {stage_dummy.date}")
# print(f"Stage Departure: {stage_dummy.departure}")
# print(f"Stage Arrival: {stage_dummy.arrival}")
# print(f"Stage Distance: {stage_dummy.distance} km")
# print(f"Stage GC Results: {len(stage_dummy.gc)} riders")
 