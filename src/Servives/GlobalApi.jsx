import { useState, useEffect } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
};

export function useGetPopular() {
  const [dataPopular, setDataPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://api.themoviedb.org/3/movie/popular?language=vi&page=1";

  const fetchPopular = async () => {
    setLoading(true);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataPopular(data.results || []);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);
  // console.log("dataPopular:", dataPopular);
  return { dataPopular,loading };
}

export function useGetTrending() {
  const [dataTrending, setDataTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const url =
    "https://api.themoviedb.org/3/trending/movie/week?language=vi&page=1";

  const fetchTrending = async () => {
    setLoading(true)
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataTrending(data.results || []);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);
  // console.log("dataTrending:", dataTrending);
  return { dataTrending,loading };
}

export function useGenres() {
  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=vi",
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }
      const data = await response.json();
      setGenres(data.genres || []); // Lưu danh sách genres
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return { genres };
}

export function useTvGenres() {
  const [tvGenres, setTvGenres] = useState([]);

  const fetchTvGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/tv/list?language=vi",
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch TV genres");
      }
      const data = await response.json();
      setTvGenres(data.genres || []); // Lưu danh sách thể loại TV
    } catch (error) {
      console.error("Error fetching TV genres:", error);
    }
  };

  useEffect(() => {
    fetchTvGenres();
  }, []);

  return { tvGenres };
}

export function useMoviesByGenre(genreId) {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=vi&page=1`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (genreId) fetchMovies();
  }, [genreId]);
  // console.log("dataMovie:", movies);

  return { movies };
}

export function useTVByGenre(genreId) {
  const [tvs, setTvs] = useState([]);

  const fetchTv = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&language=vi&page=1`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setTvs(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (genreId) fetchTv();
  }, [genreId]);
  // console.log("dataMovie:", movies);

  return { tvs };
}

export function useMovieDetail(movieId) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetail = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=vi-VN`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) fetchMovieDetail();
  }, [movieId]);
  console.log("data movie detail:", movie);
  return { movie, loading };
}

export function useTvDetail(movieId) {
  const [tv, setTv] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTvDetail = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${movieId}?language=vi-VN`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      setTv(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) fetchTvDetail();
  }, [movieId]);
  console.log("data tv detail:", tv);
  return { tv, loading };
}

export function useMovieTrailer(movieId) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );

      if (!response.ok) throw new Error("Failed to fetch movie trailer");

      const data = await response.json();
      // console.log("Movie Trailer API Response:", data);

      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      // console.log("Trailer Key Found:", trailer?.key);

      setTrailerKey(trailer ? trailer.key : null);
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) fetchMovieTrailer();
  }, [movieId]);

  return { trailerKey, loading };
}

export function useTvTrailer(tvId) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTvTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`,
        options // Đảm bảo bạn có đối tượng `options` bao gồm `api_key` ở đây
      );

      if (!response.ok) throw new Error("Failed to fetch TV trailer");

      const data = await response.json();
      // console.log("TV Trailer API Response:", data);

      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      // console.log("Trailer Key Found:", trailer?.key);

      setTrailerKey(trailer ? trailer.key : null);
    } catch (error) {
      console.error("Error fetching TV trailer:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tvId) fetchTvTrailer();
  }, [tvId]);

  return { trailerKey, loading };
}

export function useSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=vi-VN`,
        options
      );

      if (!response.ok) throw new Error("Failed to fetch search results");

      const data = await response.json();
      // Lọc bỏ các kết quả có `media_type` là `person`
      const filteredResults = (data.results || []).filter(
        (item) => item.media_type !== "person"
      );

      setSearchResults(filteredResults || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };
  // console.log(searchResults)
  return { searchResults, isSearching, error, search };
};

export function useMovieCredits(movie_id) {
  const [movieCredits, setMovieCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits`;

  const fetchMovieCredits = async () => {
    setLoading(true);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovieCredits(data || []);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieCredits();
  }, []);
  // console.log("MovieCredits:", movieCredits);
  return { movieCredits,loading };
}