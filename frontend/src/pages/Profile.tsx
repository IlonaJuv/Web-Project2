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
        console.log(userId);
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
            {reviews ? (
                <div className="container">
                <div className="row justify-content-center">
                    {reviews.map((review) => (
                        <div className="col-sm-4 d-flex justify-content-center">
                            <div className="card">
                                <div className="card-body lh-1">
                                  {review.song.thumbnail ? (
                                    <img src={review.song.thumbnail} className="card-img-top" alt={review.song.song_name} />
                                  ) : (
                                    <img src="not_found.png" className="card-img-top" alt="..." />
                                  )}
                                    <h4 className="card-text mt-">{review.song.song_name}</h4>
                                    <p className="card-text">{review.song.artist}</p>
                                    <div className="d-flex gap-2">
                                        {review.song.genres.map((genre) => (
                                            <p className="card-text mr-5">{genre}</p>
                                        ))}
                                    </div>
                                    <h4 className="card-title mt-4">{review.title}</h4>
                                    <p className="card-text">{review.comment}</p>
                                    <h4 className="card-text"> {review.rating}/5</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
            ) : (
                <p>No reviews found...</p>
            )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
