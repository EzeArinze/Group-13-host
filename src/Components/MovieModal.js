import React from "react";
import Modal from "react-modal";
import "./MovieModal.css";

Modal.setAppElement("#root"); // Set the root element for accessibility

function MovieModal({ isOpen, onRequestClose, movie }) {
  if (!movie) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      contentLabel="Movie Details"
    >
      <div className="modal-header">
        <button className="close-button" onClick={onRequestClose}>
          &times;
        </button>
      </div>
      <div className="modal-body">
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h2 className="modal-title">{movie.Title}</h2>
        <p>{movie.Plot}</p>
        <p>
          <strong>Director:</strong> {movie.Director}
        </p>
        <p>
          <strong>Year:</strong> {movie.Year}
        </p>
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p>
          <strong>Rating:</strong> {movie.imdbRating}
        </p>
      </div>
    </Modal>
  );
}

export default MovieModal;
