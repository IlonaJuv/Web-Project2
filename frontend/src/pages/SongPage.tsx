import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSong } from '../hooks/getSong';
import Review from '../interfaces/Review';
import { getReviewsBySong } from '../hooks/getReviewsBySong';
import { createReview } from '../hooks/createReview';
import { deleteReview }from '../hooks/deleteReview';
import Song from '../interfaces/Song';
import User from '../interfaces/User';
import SongPageReview from '../components/ReviewCard/SongPageReview';
import { editReview } from '../hooks/editReview';
import { likeReview } from '../hooks/likeReview';

const SongPage: React.FC = () => {
  const songId = useParams().songId;
  const [song, setSong] = useState<Song | null>(null);
  const [reviews, setReviews] = useState<(Review & { likes: string[] })[]>([]);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 1, title: '', text: '' });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderByDateNewest, setOrderByDateNewest] = useState(false);
  const [orderByDateOldest, setOrderByDateOldest] = useState(false);
  const [orderByLikesLeast, setOrderByLikesLeast] = useState(false);
  const [orderByLikesMost, setOrderByLikesMost] = useState(false);
  const userString = localStorage.getItem('user');
  const user: User = userString ? JSON.parse(userString) : null;
  let userId = 'none';
  let songIdString = 'none';
  if (user.id != null) {
    userId = user.id;
  }
  if (songId != null) {
    songIdString = songId;
  }

  const toggleReviewForm = () => {
    setIsAddingReview(!isAddingReview);
  };

  const handleNewReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmitNewReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof newReview.rating !== 'number') {
      newReview.rating = parseInt(newReview.rating);
    }
    const token = localStorage.getItem('token') || '';
    await createReview(newReview.rating, newReview.text, newReview.title, songIdString, token);
    const reviewsData = await getReviewsBySong(songIdString);
    setReviews(reviewsData);
    setIsAddingReview(false);
  };

  const handleReviewDeletion = async (deletedReviewId: string) => {
    const token = localStorage.getItem('token') || '';
    await deleteReview(token, deletedReviewId);
    const reviewsData = await getReviewsBySong(songIdString);
    setReviews(reviewsData);
  };

  const handleReviewEdit = async (editedReviewId: string, editedRating?: number, editedComment?: string, editedTitle?: string) => {
    const token = localStorage.getItem('token') || '';
    await editReview(
      token,
      editedReviewId,
      editedRating,
      editedComment,
      editedTitle
    );
    const reviewsData = await getReviewsBySong(songIdString);
    setReviews(reviewsData);
  };
  const handleReviewLike = async (likedReviewId: string) => {
    const token = localStorage.getItem('token') || '';
    await likeReview(likedReviewId, token);
    const reviewsData = await getReviewsBySong(songIdString);
    setReviews(reviewsData);
  };
  useEffect(() => {
    async function fetchSongData() {
      try {
        const songData = await getSong(songId || '');
        setSong(songData);
      } catch (error) {
        console.error('Error fetching song data:', error);
      }
    }

    fetchSongData();
  }, [songId]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviewsData = await getReviewsBySong(songId || '');
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchReviews();
  }, [songId]);

  const isTitleValid = newReview.title.length >= 1 && newReview.title.length <= 50;
  const isTextValid = newReview.text.length >= 1 && newReview.text.length <= 250;
  const isFormValid = isTitleValid && isTextValid;

  const filteredReviews = reviews.filter((review) =>
    review.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedReviews = [...filteredReviews];

  if (orderByDateNewest) {
    sortedReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (orderByDateOldest) {
    sortedReviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else if (orderByLikesLeast) {
    sortedReviews.sort((a, b) => a.likes.length - b.likes.length);
  } else if (orderByLikesMost) {
    sortedReviews.sort((a, b) => b.likes.length - a.likes.length);
  }

  return (
    <div>
      {song ? (
        <div>
          <h1 className="text-center">{song.song_name}</h1>
          <img
            src={song.thumbnail}
            className="card-img-top mb-3"
            alt={song.song_name}
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
            }}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = 'not_found.png';
            }}
          />
          <p className="card-text">By: {song.artist}</p>
          <div className="d-flex gap-2">
            {song.genres.map((genre, genreIndex) => (
              <p key={genreIndex} className="card-text mr-3">
                {genre}
              </p>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button onClick={toggleReviewForm}>Add a Review</button>

          {isAddingReview && (
            <div className="overlay">
              <div className="review-form">
                <h3>Add a Review</h3>
                <form onSubmit={handleSubmitNewReview}>
                  <div>
                    <label htmlFor="rating">Rating:</label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      min="1"
                      max="5"
                      value={newReview.rating}
                      onChange={handleNewReviewChange}
                      required
                      style={{
                        border: (newReview.rating >= 1 && newReview.rating <= 5) ? '1px solid green' : '1px solid red',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      minLength={1}
                      maxLength={50}
                      value={newReview.title}
                      onChange={handleNewReviewChange}
                      required
                      style={{
                        border: isTitleValid ? '1px solid green' : '1px solid red',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="text">Review:</label>
                    <textarea
                      id="text"
                      name="text"
                      rows={4}
                      minLength={1}
                      maxLength={250}
                      value={newReview.text}
                      onChange={handleNewReviewChange}
                      required
                      style={{
                        border: isTextValid ? '1px solid green' : '1px solid red',
                      }}
                    />
                  </div>
                  <button type="submit" disabled={!isFormValid}>
                    Submit Review
                  </button>
                </form>
                <button onClick={toggleReviewForm}>Cancel</button>
              </div>
            </div>
          )}

          <div>
          <button onClick={() => {
            setOrderByDateNewest(true);
            setOrderByDateOldest(false);
            setOrderByLikesLeast(false);
            setOrderByLikesMost(false);
          }}>Newest to Oldest</button>
          <button onClick={() => {
            setOrderByDateNewest(false);
            setOrderByDateOldest(true);
            setOrderByLikesLeast(false);
            setOrderByLikesMost(false);
          }}>Oldest to Newest</button>
          <button onClick={() => {
            setOrderByDateNewest(false);
            setOrderByDateOldest(false);
            setOrderByLikesLeast(true);
            setOrderByLikesMost(false);
          }}>Least Likes to Most</button>
          <button onClick={() => {
            setOrderByDateNewest(false);
            setOrderByDateOldest(false);
            setOrderByLikesLeast(false);
            setOrderByLikesMost(true);
          }}>Most Likes to Least</button>
          </div>

          <h2 className="text-center">Reviews</h2>

          {sortedReviews.length > 0 ? (
            <div className="container">
              <div className="row justify-content-center">
                {sortedReviews.map((review, index) => (
                  <SongPageReview
                    key={index}
                    id={review.id}
                    song_name={review.song.song_name}
                    artist={review.song.artist}
                    rating={review.rating}
                    title={review.title}
                    comment={review.comment}
                    username={review.user.username}
                    userId={review.user.id}
                    createdAt={review.createdAt}
                    updatedAt={review.updatedAt}
                    likes={review.likes}
                    index={index}
                    loggedUserId={userId}
                    handleReviewDeletion={handleReviewDeletion}
                    handleReviewEdit={handleReviewEdit}
                    handleReviewLike={handleReviewLike}
                  ></SongPageReview>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center">No reviews found...</p>
          )}
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default SongPage;
