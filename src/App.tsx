//TODO: skappa useState variabler för filmer
//TODO: try/catch function
//TODO: implimentera koden till app
//TODO: skappa sök funktion
import { useState } from 'react'
import { getMovies } from './data/getMovies' 
import { Movie } from './data/interfaces'
import './App.css'
import favoriteBtn from './assets/love (2).png';
import { validateMovies } from './data/validation';

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('');

	const [message, setMessage] = useState<string>('')

const handleGet = async () => {
  // try{
  //   const data: Movie[] = await getMovies()
  //   console.log('Data from API: ', data);
  //   setMovies(data)
  // }
  // catch(error) {
  //   const e: Error = error as Error
  //   console.log('API failed with error: ', e.message);
  //   setMovies([])
  
  // }
  try {
        const result = validateMovies(await getMovies())
        if(result.success ) {
          setMovies(result.value)
        }
        else {
          setMessage(result.error)
        }
  }
  catch(error) {
        const e: Error = error as Error
        console.log('Api failed with error: ', e.message);
        setMessage('Something went wrong. Please try again later')
        
  }
}

const filteredMovies = movies.filter((movie) =>
movie.title.toLowerCase().includes(searchTerm.toLowerCase())
).sort((a, b) => parseInt(b.release_date) - parseInt(a.release_date))

  return (
    <div className='app'>
    <header>
    <h1>Go Ghibli</h1>
    </header>
    <div className='button-search-field'>
      <button className='get-movies-btn' onClick={handleGet}>Get Movies</button>
      {message && (
				<p> {message} </p>
			)}
      <input 
          type="text" 
          placeholder="Search for a movie" 
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
        />
        <button className='favorite-vy'>Favorites</button>
    </div>
    <main>
    <div className="movie-cards">
          {filteredMovies.map((movie) => (
            <ul key={movie.id}>
              <li className="movie-card">
                <img src={movie.image} alt="" />
                <h2>{movie.title}</h2>
                <p>
                  <strong>Director:</strong> {movie.director}
                </p>
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <section className="description">
                <h3>Description:</h3> 
                <button className="favorite-btn">
                  <img src={favoriteBtn} alt="Favorite" />
                </button>
                <p> {movie.description}</p>
                </section>
              </li>
            </ul> 
          )) 
          }
        </div>
    </main>
    </div>
    )
  }
  
  export default App
  