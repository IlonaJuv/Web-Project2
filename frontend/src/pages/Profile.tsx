import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import User from '../interfaces/User';
import { getUser } from '../hooks/getUser';
import Review from '../interfaces/Review';
import { getReviews } from '../hooks/getReviews';

const ProfilePage: React.FC = () => {
  const userId = useParams().userId;
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUser(userId || '');
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviewsData = await getReviews(userId || '');
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchReviews();
  }, [userId]);

  return (
    <div>
      {user ? (
        <div>
          <h1 className="text-center">{user.username}'s profile</h1>
          <h2 className="text-center">Reviews</h2>
          {reviews.length > 0 ? (
            <div className="container">
              <div className="row justify-content-center">
                {reviews.map((review, index) => (
                  <div key={index} className="col-md-3 mb-3">
                    <div className="card">
                      <div className="card-body card-fixed-height">
                          <img
                            src={review.song.thumbnail}
                            className="card-img-top mb-3"
                            alt={review.song.song_name}
                            style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                            onError={({currentTarget}) => {
                              currentTarget.onerror = null;
                              currentTarget.src = "not_found.png"
                            }}
                          />
                        <h4 className="card-title">{review.song.song_name}</h4>
                        <p className="card-text mb-1">{review.song.artist}</p>
                        <div className="d-flex gap-2">
                          {review.song.genres.map((genre, genreIndex) => (
                            <p key={genreIndex} className="card-text mr-3">{genre}</p>
                          ))}
                        </div>
                        <h4 className="card-text mt-4">{review.title}</h4>
                        <p className="card-text">{review.comment}</p>
                        <h4 className="card-text">{review.rating}/5</h4>
                      </div>
                    </div>
                  </div>
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

export default ProfilePage;
