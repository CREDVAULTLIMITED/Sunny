import React, { useState } from 'react';

const Comment = ({ comment, onReply, onLike }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      onReply(replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-avatar">
          <img src={comment.author.avatar} alt={comment.author.name} />
        </div>
        <div className="comment-meta">
          <div className="comment-author-info">
            <span className="comment-author-name">{comment.author.name}</span>
            {comment.author.verified && <span className="verified-badge">✓</span>}
            <span className="comment-author-handle">{comment.author.handle}</span>
          </div>
          <span className="comment-time">
            {new Date(comment.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      <div className="comment-content">
        <p>{comment.content}</p>
        {comment.media && (
          <div className="comment-media">
            <img src={comment.media} alt="Comment attachment" />
          </div>
        )}
      </div>
      
      <div className="comment-actions">
        <button className="action-btn" onClick={() => onLike(comment.id)}>
          <span className="icon">♡</span>
          <span className="count">{comment.likes}</span>
        </button>
        <button 
          className="action-btn" 
          onClick={() => setShowReplyInput(!showReplyInput)}
        >
          <span className="icon">↩</span>
          <span>Reply</span>
        </button>
      </div>

      {showReplyInput && (
        <div className="reply-input">
          <textarea
            placeholder="Write your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="reply-actions">
            <button 
              className="btn btn-outline"
              onClick={() => setShowReplyInput(false)}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary"
              disabled={!replyText.trim()}
              onClick={handleSubmitReply}
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={(text) => onReply(text, comment.id)}
              onLike={onLike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
