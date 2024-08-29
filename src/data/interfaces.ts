
export interface ApiData {
	data: Movie[];
	info: object;
}

export interface Movie {
	id: string;
	title: string;
	original_title: string;
	director: string;
	producer: string;
	release_date: string;	
	image: string;
	description: string;
}

