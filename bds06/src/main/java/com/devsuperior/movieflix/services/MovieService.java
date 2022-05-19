package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class MovieService {
	
	@Autowired
	private MovieRepository repository;
	
	@Autowired
	private GenreRepository genreRepository;

	@Autowired
	private ReviewRepository reviewRepository;
	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id) {
		Optional<Movie> movie = repository.findById(id);
		Movie result = movie.orElseThrow(() -> new ResourceNotFoundException(""));
		return new MovieDTO(result);
	}
	
	@Transactional(readOnly = true)
	public Page<MovieDTO> findByGenre(Pageable pageable, Long id) {
		Genre genre = (id == 0) ? null : genreRepository.getOne(id);
		Page<Movie> page = repository.findByGenre(pageable, genre);
		return page.map(x -> new MovieDTO(x));
	}
	
	@Transactional(readOnly = true)
	public List<ReviewDTO> findReviewsByMovie(Long id){
		List<Review> reviews = reviewRepository.findReviewsByMovieId(id);
		return reviews.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());
	}
}
