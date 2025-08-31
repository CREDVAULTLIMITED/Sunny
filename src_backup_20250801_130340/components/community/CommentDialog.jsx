import React from 'react';
import Comment from '../Comment';

const CommentDialog = ({ post, onClose, onComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: {
          name: 'You',
          handle: '@you',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you'
        },
        content: commentText,
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: []
      };

      onComment(post.id, newComment);
      setCommentText('');
    }
  };

  return (
    <div className="comment-dialog">
      <div className="dialog-content">
        <div className="dialog-header">
          <h3>Comments</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="dialog-body">
          <div className="original-post">
            <div className="post-header">
              <div className="post-avatar">
                <img src={post.author.avatar} alt={post.author.name} />
              </div>
              <div className="post-meta">
                <div className="author-info">
                  <span className="author-name">{post.author.name}</span>
                  {post.author.verified && <span className="verified-badge">✓</span>}
                  <span className="author-handle">{post.author.handle}</span>
                </div>
              </div>
            </div>
            <div className="post-content">
              {post.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <div className="comments-section">
            {post.comments && post.comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={(text, parentId) => onComment(post.id, {
                  id: Date.now(),
                  author: {
                    name: 'You',
                    handle: '@you',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you'
                  },
                  content: text,
                  timestamp: new Date().toISOString(),
                  likes: 0,
                  replies: []
                }, parentId)}
                onLike={(commentId) => {/* Handle comment like */}}
              />
            ))}
          </div>
        </div>

        <div className="dialog-footer">
          <div className="comment-input">
            <div className="input-avatar">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=you" alt="Your avatar" />
            </div>
            <textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <div className="comment-actions">
            <button 
              className="btn btn-primary"
              disabled={!commentText.trim()}
              onClick={handleSubmitComment}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDialog;
