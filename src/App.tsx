import { useState } from 'react';
import { getMovies } from './data/getMovies';
import { Movie } from './data/interfaces';
import './App.css';
import favoriteBtn from './assets/love (2).png';
import { validateMovies } from './data/validation';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<{ [key: string]: boolean }>({});


  const handleAddToFavorites = (movie: Movie) => {
    if (!favorites.some(favorite => favorite.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const handleToggleDescription = (movieId: string) => {
    setShowDescription((prevState) => ({
      ...prevState,
      [movieId]: !prevState[movieId],
    }));
  };

  const handleGet = async () => {
    try {
      const result = validateMovies(await getMovies());
      if (result.success) {
        setMovies(result.value);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      const e: Error = error as Error;
      console.log('API failed with error:', e.message);
      setMessage('Something went wrong. Please try again later');
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => parseInt(b.release_date) - parseInt(a.release_date));

  return (
    <div className='app'>
      <header>
        <h1>Go Ghibli</h1>
      </header>
      <div className='button-search-field'>
        <button className='get-movies-btn' onClick={handleGet}>Get Movies</button>
        {message && (
          <p>{message}</p>
        )}
        <input
          type="text"
          placeholder="Search for a movie"
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
        />
        <button className='favorite-vy' onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? "All Movies" : "Favorites"}
        </button>
      </div>
      <main>
        <div className="movie-cards">
          {showFavorites ? (
            favorites.length > 0 ? (
              favorites.map((movie) => (
                <ul key={movie.id}>
                  <li className="movie-card" onClick={() => handleToggleDescription(movie.id)}>
                    <img src={movie.image} alt="" />
                    <h2>{movie.title}</h2>
                    <p>
                      <strong>Director:</strong> {movie.director}
                    </p>
                    <p>
                      <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    {showDescription[movie.id] && (
                      <section className="description">
                        <h3>Description:</h3>
                        <p>{movie.description}</p>
                        <button className="favorite-btn" onClick={(e) => {
                          e.stopPropagation();  // Prevents triggering the description toggle
                          handleAddToFavorites(movie);
                        }}>
                          <img src={favoriteBtn} alt="Favorite" />
                        </button>
                      </section>
                    )}
                  </li>
                </ul>
              ))
            ) : (
              <p>No favorites yet.</p>
            )
          ) : (
            filteredMovies.map((movie) => (
              <ul key={movie.id}>
                <li className="movie-card" onClick={() => handleToggleDescription(movie.id)}>
                  <img src={movie.image} alt="" />
                  <h2>{movie.title}</h2>
                  <p>
                    <strong>Director:</strong> {movie.director}
                  </p>
                  <p>
                    <strong>Release Date:</strong> {movie.release_date}
                  </p>
                  {showDescription[movie.id] && (
                    <section className="description">
                      <h3>Description:</h3>
                      <p>{movie.description}</p>
                      <button className="favorite-btn" onClick={(e) => {
                        e.stopPropagation();  // Prevents triggering the description toggle
                        handleAddToFavorites(movie);
                      }}>
                        <img src={favoriteBtn} alt="Favorite" />
                      </button>
                    </section>
                  )}
                </li>
              </ul>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
