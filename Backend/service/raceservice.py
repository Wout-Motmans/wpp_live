from procyclingstats import Race

def get_race_info():
    # Create a Race object for the Giro d'Italia 2022
    race = Race("race/grand-prix-chantal-biya/2023/stage-4")

    # Parse the race information from the website
    race_data = race.parse()

    # Get the name and nationality of the race
    name = race.name()
    nationality = race.nationality()

    return name, nationality


