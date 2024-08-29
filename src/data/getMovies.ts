//TODO: ta reda på interface och skappa det för filmer
//TODO: skappa async function att hämta data fråm API
import { Movie } from "./interfaces"

async function getMovies(): Promise<Movie[]> {

	const response: Response = await fetch('https://ghibliapi.vercel.app/films');

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const apiData: Movie[] = await response.json();
	console.log(apiData);

	return apiData;
}

export {getMovies}

