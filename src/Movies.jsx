import React from 'react';
import { useEffect, useState } from 'react';

const TMDB_API_KEY = '0b3ef0ded205ac1508d2edb2047e96ec';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const STREAMLIST_KEY = 'MoviesInList';

const Movies = () => {
  const [results, setResults] = useState([]);

  const searchMovie = async (title) => {
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`TMDB request failed for "${title}" (${response.status})`);
        return null;
      }
      const data = await response.json();
      return data.results && data.results.length > 0 ? data.results[0] : null;
    } catch (err) {
      console.error(`TMDB search failed for "${title}":`, err);
      return null;
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchResults = async () => {
      let items = [];
      try {
        const saved = localStorage.getItem(STREAMLIST_KEY);
        items = saved ? JSON.parse(saved) : [];
      } catch {
        items = [];
      }

      if (items.length === 0) {
        if (!cancelled) {
          setResults([]);
        }
        return;
      }

      const found = await Promise.all(
        items.map(async (item) => {
          const movie = await searchMovie(item.text);
          return { id: item.id, title: item.text, movie };
        })
      );

      if (!cancelled) {
        setResults(found);
      }
    };

    fetchResults();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <p></p>
      <h2>Currently in your StreamList:</h2>
        <ul className="TMDBList">
          {results.map(({ id, title, movie }) => (
            <li key={id} className="MovieResult">
              {movie ? (
                <a href={'https://www.themoviedb.org/movie/${movie.id}'}>
                  {movie.title}
                </a>
              ) : (
                <span>Not found in TMDB!</span>
              )}
            </li>
          ))}
        </ul>
      
    </div>
  );
};

export default Movies
