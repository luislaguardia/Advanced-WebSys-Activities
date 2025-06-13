import React, { useEffect, useState } from 'react';
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../../services/ArticleService';
import '../../styles/ArticlesPage.css';

const DashArticleListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    status: 'draft',
    featured: false
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Technology',
    'Business',
    'Health',
    'Science',
    'Sports',
    'Entertainment',
    'Politics',
    'Education',
    'Travel',
    'Lifestyle'
  ];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await getArticles();
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    
    if (formData.title && formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }
    
    if (formData.content && formData.content.length < 50) {
      newErrors.content = 'Content must be at least 50 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const submitData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      if (editingId) {
        await updateArticle(editingId, submitData);
        alert('Article updated successfully!');
      } else {
        await createArticle(submitData);
        alert('Article created successfully!');
      }
      setShowModal(false);
      setEditingId(null);
      setErrors({});
      fetchArticles();
    } catch (err) {
      console.error(err);
      alert('Failed to save article.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(id);
        alert('Article deleted successfully!');
        fetchArticles();
      } catch (err) {
        console.error(err);
        alert('Failed to delete article.');
      }
    }
  };

  const openEditModal = (article) => {
    setFormData({
      ...article,
      tags: Array.isArray(article.tags) ? article.tags.join(', ') : article.tags || '',
      status: article.status || 'draft',
      featured: article.featured || false
    });
    setEditingId(article._id);
    setShowModal(true);
    setErrors({});
  };

  const openCreateModal = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      category: '',
      tags: '',
      status: 'draft',
      featured: false
    });
    setEditingId(null);
    setShowModal(true);
    setErrors({});
  };

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
  };

  const filteredArticles = articles.filter((a) => {
    const term = searchTerm.toLowerCase();
    return (
      a.title.toLowerCase().includes(term) ||
      a.author.toLowerCase().includes(term) ||
      a.category.toLowerCase().includes(term)
    );
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'published': return 'status-published';
      case 'draft': return 'status-draft';
      case 'archived': return 'status-archived';
      default: return 'status-draft';
    }
  };

  return (
    <div className="article-container">
      <div className="article-header">
        <h2>Article Management</h2>
        <button onClick={openCreateModal} className="add-article-btn">+ Add Article</button>
      </div>

      <div className="article-searchbar">
        <input
          type="text"
          placeholder="Search by title, author, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="articles-table-container">
        <table className="article-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Content Preview</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((a) => (
              <tr key={a._id}>
                <td>
                  <div className="article-title">
                    {a.title}
                    {a.featured && <span className="featured-badge">★ Featured</span>}
                  </div>
                </td>
                <td>{a.author}</td>
                <td><span className="category-badge">{a.category}</span></td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(a.status)}`}>
                    {a.status || 'draft'}
                  </span>
                </td>
                <td className="content-preview">
                  {a.content && a.content.length > 80 ? `${a.content.slice(0, 80)}...` : a.content}
                </td>
                <td>
                  <div className="article-actions">
                    <button onClick={() => openEditModal(a)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(a._id)} className="delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="article-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h2>{editingId ? 'Edit Article' : 'Add New Article'}</h2>
              <button className="close-btn" onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Article Information Section */}
                <div className="form-section">
                  <h3 className="section-title">Article Information</h3>
                  
                  <div className="form-group full-width">
                    <label htmlFor="title">Article Title *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={errors.title ? 'error' : ''}
                      placeholder="Enter a compelling article title"
                    />
                    {errors.title && <span className="error-text">{errors.title}</span>}
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="author">Author *</label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className={errors.author ? 'error' : ''}
                        placeholder="Enter author name"
                      />
                      {errors.author && <span className="error-text">{errors.author}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="category">Category *</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={errors.category ? 'error' : ''}
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {errors.category && <span className="error-text">{errors.category}</span>}
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="tags">Tags</label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="Enter tags separated by commas (e.g., technology, innovation, AI)"
                    />
                    <small className="help-text">Separate multiple tags with commas</small>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="content">Article Content *</label>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      className={errors.content ? 'error' : ''}
                      placeholder="Write your article content here..."
                      rows="8"
                    />
                    {errors.content && <span className="error-text">{errors.content}</span>}
                    <small className="help-text">Minimum 50 characters required</small>
                  </div>
                </div>

                {/* Publishing Options Section */}
                <div className="form-section">
                  <h3 className="section-title">Publishing Options</h3>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="status">Publication Status</label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                        Featured Article
                      </label>
                      <small className="help-text">Featured articles appear prominently on the homepage</small>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingId ? 'Update Article' : 'Create Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashArticleListPage;