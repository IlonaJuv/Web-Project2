import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { likeReview } from '../../hooks/likeReview';
import { editReview } from '../../hooks/editReview';

interface ProfilePageReviewProps {
  id: string;
  song_name: string;
  song_genres: string[];
  song_artist: string;
  song_thumbnail: string;
  rating: number;
  title: string;
  comment: string;
  username: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  index: number;
  loggedUserId: string;
  handleReviewDeletion: (reviewId: string) => void; 
}

const ProfilePageReview: React.FC<ProfilePageReviewProps> = (props) => {
  const {
    id,
    song_name,
    song_genres,
    song_artist,
    song_thumbnail,
    rating,
    title,
    comment,
    username,
    userId,
    createdAt,
    updatedAt,
    likes,
    index,
    loggedUserId,
    handleReviewDeletion,
  } = props;
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);
  const editedString = (updatedAtDate > createdAtDate ? '(edited)' : '');
  const [likesOfReview, setLikesOfReview] = useState(likes);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(likes.includes(loggedUserId));
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(rating);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedComment, setEditedComment] = useState(comment);
  const [originalRating] = useState(rating); 
  const [editedText, setEditedText] = useState(editedString);

  const handleToggleLikeReview = async (reviewId: string) => {
    setIsLoading(true);
    const token = localStorage.getItem("token") || "";
    const newLikes = await likeReview(reviewId, token);

    setLikesOfReview(newLikes);
    setIsLoading(false);
    setHasLiked(newLikes.includes(loggedUserId));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {

    const isRatingEdited = editedRating !== originalRating;
    const isTitleEdited = editedTitle !== title;
    const isCommentEdited = editedComment !== comment;

    if (!isRatingEdited && !isTitleEdited && !isCommentEdited) {
      setIsEditing(false);
      return;
    }

    const token = localStorage.getItem("token") || "";
    await editReview(
      token,
      id,
      isRatingEdited ? editedRating : undefined,
      isCommentEdited ? editedComment : undefined, 
      isTitleEdited ? editedTitle : undefined 
    );

    setEditedRating(editedRating);
    if(editedText !== '(edited)'){
        setEditedText('(edited)');
    }
    
    setEditedTitle(editedTitle + editedText);
    setEditedComment(editedComment);

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedRating(originalRating);
    setEditedTitle(title);
    setEditedComment(comment);

    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this review?");

    if (confirmed) {
      handleReviewDeletion(id); 
    }
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseInt(e.target.value);
    if (newRating >= 1 && newRating <= 5) {
      setEditedRating(newRating);
    }
  };

  const maxCharacters = 100; 
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div key={index} className="col-md-5 mb-3">
      <div className="card">
        <div className="card-body card-min-height">
          <div className="d-flex justify-content-end">
          {userId === loggedUserId && !isEditing && (
                <span role="button" className="material-symbols-outlined" onClick={handleEdit}>edit</span>
              )}
              {userId === loggedUserId && !isEditing && (
                <span role="button" className="material-symbols-outlined ms-3" onClick={handleDelete}>delete</span>
              )}
              {isEditing ? (
                <div>
                  <span role="button" className="material-symbols-outlined" onClick={handleCancelEdit}>close</span>
                </div>
              ): null}
          </div>
          <h4 className="card-text">By: <Link key={index} to={'/user/' + userId} style={{ textDecoration: 'none' }}>{username}</Link></h4>
          {isEditing ? (
            <div>
              <h4 className="card-text mt-4">Edit Title</h4>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <h4 className="card-text mt-4">Edit Comment</h4>
              <input
                type="text"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <h4 className="card-text mt-4">Edit Rating</h4>
              <input
                type="number"
                value={editedRating}
                onChange={handleRatingChange} 
              />
              <div className="mt-1">
                <span role="button" className="material-symbols-outlined" onClick={handleSaveEdit}>check</span>
              </div>
              {userId === loggedUserId && !isEditing && (
                <button onClick={handleDelete}>Delete</button>
              )}
            </div>
          ) : (
            
            <div>
                <img
                    src={song_thumbnail}
                    className="card-img-top mb-3"
                    alt={song_name}
                    style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    onError={({currentTarget}) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "not_found.png"
                    }}
                />
                <h4 className="card-title">{song_name}</h4>
                <p className="card-text mb-1">{song_artist}</p>
                <div className="d-flex gap-2">
                    {song_genres.map((genre, genreIndex) => (
                        <p key={genreIndex} className="card-text mr-3">{genre}</p>
                    ))}
                </div>
              <h4 className="card-text mt-4">
                {title}
              </h4>
              <p className="card-text">
            {showFullText ? editedComment : editedComment.slice(0, maxCharacters)}
            {editedComment.length > maxCharacters && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="btn btn-link"
            >
              {showFullText ? 'Read less' : 'Read more'}
            </button>
          )}
            </p>

              <div className="d-flex">
              <h4 className="card-text">{editedRating}/5</h4>
              <button className="ms-2"
                onClick={() => handleToggleLikeReview(id)}
                disabled={isLoading}
                style={{
                  textShadow: hasLiked ? "0px 0px 15px #FF0000" : "none",
                  fontSize: "20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                💖
                <span className="ms-1 shadow-none">
                  {likesOfReview.length}
                </span>
              </button>
              
              </div>
            </div>
          )}
          <div className="d-flex">
            <h4 className="card-text">
              {moment(createdAtDate).fromNow()}
            </h4>
            <p className="text-muted ms-1 mt-1"><small>{editedText}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageReview;
