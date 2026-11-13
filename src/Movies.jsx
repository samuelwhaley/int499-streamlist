import React, { useEffect, useState } from 'react';
import { useStateContext } from './stateContext';

const STREAMLIST_KEY_CONTEXT = 'StreamListContext';

const Movies = () => {
	const { apiUrl, apiKey, items } = useStateContext();
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const searchMovie = async (title) => {
		const url = `${apiUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;
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
			if (items.length === 0) {
				if (!cancelled) {
					setResults([]);
					setIsLoading(false);
				}
				return;
			}

			if (!cancelled) {
				setIsLoading(true);
			}

			const found = await Promise.all(
				items.map(async (item) => {
					const movie = await searchMovie(item.text);
					return { id: item.id, title: item.text, movie };
				})
			);

			if (!cancelled) {
				setResults(found);
				setIsLoading(false);
			}
		};

		fetchResults();
		return () => {
			cancelled = true;
		};
	}, [items]);

	return (
		<div>
			<p></p>
			<h2>Currently in your StreamList:</h2>
			{isLoading ? (
				<p>Searching TMDB for your titles...</p>
			) : items.length === 0 ? (
				<p>Your list is empty — head back to the home page and add some titles!</p>
			) : (
				<ul className="TMDBList">
					{results.map(({ id, title, movie }) => (
						<li key={id} className="MovieResult">
							{movie ? (
								<>
									<a href={`https://www.themoviedb.org/movie/${movie.id}`}>
										{movie.poster_path ? (
											<img
												src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
												alt={`${movie.title} poster`}
											/>
										) : (
											<span>No poster available</span>
										)}
									</a>
									<a href={`https://www.themoviedb.org/movie/${movie.id}`}>
										{movie.title}
									</a>
								</>
							) : (
								<span>{title} — Not found in TMDB</span>
							)}
						</li>
					))}
				</ul>
			)}
			<br></br>
			<p className='PageBottom'>(C) 2026 EZTechMovie. All rights reserved.</p>
		</div>
	);
};


export default Movies;
