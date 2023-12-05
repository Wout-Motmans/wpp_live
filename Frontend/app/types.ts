
export interface User {
	id: number;
	username: string;
}

export interface Rider {
    rider_name: string;
    rider_url: string;
    team_url: string;
	team_name: string;
}

export interface Team {
	user: User;
	riders: Rider[];

}

export interface RaceInfo {
    id: number;
    name: string;
    year: number;
}