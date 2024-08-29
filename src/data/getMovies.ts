//TODO: ta reda på interface och skappa det för filmer
//TODO: skappa async function att hämta data fråm API
import { Movie, ApiData } from "./interfaces"

async function getMovies(): Promise<Movie[]> {

	const response: Response = await fetch('https://ghibliapi.vercel.app/films', {
		mode: 'no-cors'
	})

	const apiData: ApiData = await response.json();
	// console.log('getmovies', ApiData);
	return apiData.data
}

export {getMovies}

