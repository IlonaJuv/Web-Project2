import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import User from '../interfaces/User';
import { getUser } from '../hooks/getUser';
import Review from '../interfaces/Review';
import { getReviews } from '../hooks/getReviews';
import ProfilePageReview from '../components/ReviewCard/ProfilePageReview';
import { deleteReview } from '../hooks/deleteReview';

const ProfilePage: React.FC = () => {
  const userId = useParams().userId;
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const userString = localStorage.getItem('user');
  const loggedUser: User = userString ? JSON.parse(userString) : null;
  let userIdString = "none";
  if (loggedUser.id != null) {
    userIdString = loggedUser.id;
  }
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
        console.log(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchReviews();
  }, [userId]);
  
  const handleReviewDeletion = async (deletedReviewId: string) => {
    const token = localStorage.getItem("token") || "";
    await deleteReview(token,deletedReviewId);
    const reviewsData = await getReviews(userId || '');
    setReviews(reviewsData);
  };
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
                  
                  <ProfilePageReview
                    key={index}
                    id={review.id}
                    song_name={review.song.song_name}
                    song_artist={review.song.artist}
                    song_genres={review.song.genres}
                    song_thumbnail={review.song.thumbnail}
                    song_id={review.song.id}
                    rating={review.rating}
                    title={review.title}
                    comment={review.comment}
                    username={review.user.username}
                    userId={review.user.id}
                    createdAt={review.createdAt}
                    updatedAt={review.updatedAt}
                    likes={review.likes}
                    index={index}
                    loggedUserId={userIdString}
                    handleReviewDeletion={handleReviewDeletion}
                  ></ProfilePageReview>
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
