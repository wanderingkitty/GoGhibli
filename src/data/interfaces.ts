
export interface ApiData {
	data: Movie[];
	info: object;
}

export interface Movie {
	id: string,
	title: string,
	original_title?: string,
	original_title_romanised: string,
	image: string,
	director: string,
	description: string,
	producer: string,
	release_date: string,
	running_time: string,
	rt_score: string,
	people: string,
	species: string,
	locations: string,
	vehicles: string,
	url: string
}

