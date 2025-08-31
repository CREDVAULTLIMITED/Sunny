import React from 'react';
import { useState } from 'react';

const CommunityPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Sarah Chen',
        handle: '@sarahc',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
      },
      content: 'Just implemented Sunny payments in my SaaS app - the API is so clean and well-documented! 🚀',
      timestamp: '2025-06-14T10:30:00Z',
      likes: 42,
      comments: 12,
      shares: 8,
      media: null,
      category: 'projects'
    },
    {
      id: 2,
      author: {
        name: 'Dev Team',
        handle: '@sunnydev',
        avatar: '/assets/logos/sunny-logo.svg',
        verified: true
      },
      content: '🎉 New SDK Release: v2.3.0\n\n- Enhanced WebSocket support\n- New currency conversion methods\n- Improved error handling\n\nCheck out the docs for more details!',
      timestamp: '2025-06-14T09:15:00Z',
      likes: 156,
      comments: 23,
      shares: 45,
      media: null,
      category: 'announcements'
    }
  ]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPost, setNewPost] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'projects', name: 'Projects' },
    { id: 'questions', name: 'Questions' },
    { id: 'tutorials', name: 'Tutorials' },
    { id: 'announcements', name: 'Announcements' }
  ];

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const handleComment = (postId) => {
    // Open comment modal or section
    // This is a placeholder - implement comment functionality as needed
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId) => {
    // Share functionality
    // This is a placeholder - implement sharing functionality as needed
    console.log('Share post:', postId);
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const newPostObj = {
      id: Date.now(),
      author: {
        name: 'You',
        handle: '@you',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you'
      },
      content: newPost,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      media: null,
      category: selectedCategory === 'all' ? 'general' : selectedCategory
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setShowPostModal(false);
  };

  return (
    <div className="community-page">
      <div className="page-header">
        <h1>Sunny Community Forum</h1>
        <p>Join the discussion, share your projects, and get help from other developers</p>
        
        <div className="auth-buttons">
          <button className="btn btn-outline">Sign in with GitHub</button>
          <button className="btn btn-outline">Sign in with Google</button>
          <button className="btn btn-outline">Continue as Guest</button>
        </div>
      </div>

      <div className="community-content">
        <aside className="community-sidebar">
          <nav>
            <h3>Categories</h3>
            <ul>
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="trending-topics">
            <h3>Trending Topics</h3>
            <ul>
              <li># Payment Integration</li>
              <li># Mobile SDKs</li>
              <li># Security Best Practices</li>
              <li># Webhooks Setup</li>
            </ul>
          </div>
        </aside>

        <main className="community-main">
          <div className="post-actions">
            <button className="btn btn-primary">Create New Post</button>
            <div className="post-filters">
              <select className="filter-select">
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="unanswered">Unanswered</option>
              </select>
            </div>
          </div>

          <div className="posts-list">
            {posts.length === 0 ? (
              <div className="empty-state">
                <h3>Welcome to the Community!</h3>
                <p>Be the first to start a discussion or share your Sunny project.</p>
                <button className="btn btn-primary" onClick={() => setShowPostModal(true)}>Create First Post</button>
              </div>
            ) : (
              <>
                <div className="new-post-card">
                  <div className="post-avatar">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=you" alt="Your avatar" />
                  </div>
                  <div className="post-input">
                    <textarea 
                      placeholder="Share your thoughts, projects, or questions..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      onClick={() => setShowPostModal(true)}
                    />
                  </div>
                </div>

                {posts.map(post => (
                  <div key={post.id} className="post-card">
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
                        <span className="post-time">
                          {new Date(post.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="post-content">
                      {post.content.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                      {post.media && (
                        <div className="post-media">
                          <img src={post.media} alt="Post attachment" />
                        </div>
                      )}
                    </div>
                    
                    <div className="post-actions">
                      <button className="action-btn" onClick={() => handleLike(post.id)}>
                        <span className="icon">♡</span>
                        <span className="count">{post.likes}</span>
                      </button>
                      <button className="action-btn" onClick={() => handleComment(post.id)}>
                        <span className="icon">💬</span>
                        <span className="count">{post.comments}</span>
                      </button>
                      <button className="action-btn" onClick={() => handleShare(post.id)}>
                        <span className="icon">⟳</span>
                        <span className="count">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {showPostModal && (
            <div className="post-modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Create a Post</h3>
                  <button className="close-btn" onClick={() => setShowPostModal(false)}>×</button>
                </div>
                <div className="modal-body">
                  <textarea
                    placeholder="What's on your mind?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={4}
                  />
                  <div className="upload-actions">
                    <button className="btn btn-outline">
                      <span className="icon">📷</span> Add Image
                    </button>
                    <button className="btn btn-outline">
                      <span className="icon">📎</span> Add File
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline" onClick={() => setShowPostModal(false)}>Cancel</button>
                  <button 
                    className="btn btn-primary" 
                    disabled={!newPost.trim()}
                    onClick={handleCreatePost}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;
