import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

interface SongPageReviewProps {
  id: string;
  song_name: string;
  artist: string;
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
  handleReviewEdit: (reviewId: string, editedRating?: number, editedComment?: string, editedTitle?: string) => void;
  handleReviewLike: (reviewId: string) => void;
}

const SongPageReview: React.FC<SongPageReviewProps> = (props) => {
  const {
    id,
    song_name,
    artist,
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
    handleReviewEdit,
    handleReviewLike
  } = props;
  const createdAtDate = new Date(createdAt);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(rating);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedComment, setEditedComment] = useState(comment);
  const [originalRating] = useState(rating); 

  const handleToggleLikeReview = async (reviewId: string) => {
    setIsLoading(true);
    handleReviewLike(reviewId);
    setIsLoading(false);
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

    handleReviewEdit(id, editedRating, editedComment, editedTitle);

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

  return (
    <div key={index} className="col-md-3 mb-3">
      <div className="card">
        <div className="card-body card-fixed-height">
          <Link key={index} to={'/user/' + userId}>
            <h4 className="card-text mt-4">By: {username}</h4>
          </Link>
          {isEditing ? (
  <div>
    <h4 className="card-text mt-4">Edit Title</h4>
    <input
      type="text"
      value={editedTitle}
      onChange={(e) => setEditedTitle(e.target.value)}
      minLength={1}
      maxLength={50}
      required
      style={{
        border: (editedTitle.length < 1 || editedTitle.length > 50) ? '1px solid red' : '1px solid green',
      }}
    />
    <h4 className="card-text mt-4">Edit Comment</h4>
    <input
      type="text"
      value={editedComment}
      onChange={(e) => setEditedComment(e.target.value)}
      minLength={1}
      maxLength={250}
      required
      style={{
        border: (editedComment.length < 1 || editedComment.length > 250) ? '1px solid red' : '1px solid green',
      }}
    />
    <h4 className="card-text mt-4">Edit Rating</h4>
    <input
      type="number"
      value={editedRating}
      onChange={handleRatingChange}
      min="1"
      max="5"
      required
      style={{
        border: (editedRating < 1 || editedRating > 5) ? '1px solid red' : '1px solid green',
      }}
    />
    <button onClick={handleSaveEdit} disabled={
      editedTitle.length < 1 || editedTitle.length > 50 ||
      editedComment.length < 1 || editedComment.length > 250 ||
      editedRating < 1 || editedRating > 5
    }>
      Save
    </button>
    <button onClick={handleCancelEdit}>Cancel</button>
    {userId === loggedUserId && !isEditing && (
      <button onClick={handleDelete}>Delete</button>
    )}
  </div>
) : (
            
            <div>
              <h4 className="card-text mt-4">
                {title} {createdAt !== updatedAt? "(edited)" : null}
              </h4>
              <p className="card-text">{comment}</p>
              <h4 className="card-text">{rating}/5</h4>
              <button
                onClick={() => handleToggleLikeReview(id)}
                disabled={isLoading}
                style={{
                  textShadow: likes.includes(loggedUserId) ? "0px 0px 15px #FF0000" : "none",
                  fontSize: "20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                💖
                <span style={{ marginLeft: "5px", textShadow: "none" }}>
                  {likes.length}
                </span>
              </button>
              {userId === loggedUserId && !isEditing && (
                <button onClick={handleEdit}>Edit</button>
              )}
              {userId === loggedUserId && !isEditing && (
                <button onClick={handleDelete}>Delete</button>
              )}
            </div>
          )}
          <h4 className="card-text">
            {moment(createdAtDate).fromNow()}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SongPageReview;
