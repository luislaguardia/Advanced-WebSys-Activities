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
    category: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateArticle(editingId, formData);
      } else {
        await createArticle(formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchArticles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this article?')) {
      await deleteArticle(id);
      fetchArticles();
    }
  };

  const openEditModal = (article) => {
    setFormData(article);
    setEditingId(article._id);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setFormData({ title: '', content: '', author: '', category: '' });
    setEditingId(null);
    setShowModal(true);
  };

  const filteredArticles = articles.filter((a) => {
    const term = searchTerm.toLowerCase();
    return (
      a.title.toLowerCase().includes(term) ||
      a.author.toLowerCase().includes(term) ||
      a.category.toLowerCase().includes(term)
    );
  });

  return (
    <div className="article-container">
      <div className="article-header">
        <h2>Article Management</h2>
        <button onClick={openCreateModal} className="add-article-btn">+ Add Article</button>
      </div>

      {/* ✅ Search bar */}
      <div className="article-searchbar">
        <input
          type="text"
          placeholder="Search by title, author, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="article-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Snippet</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((a) => (
            <tr key={a._id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.category}</td>
              <td>{a.content.length > 100 ? `${a.content.slice(0, 100)}...` : a.content}</td>
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

      {showModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>{editingId ? 'Edit Article' : 'Add New Article'}</h3>
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input name="author" value={formData.author} onChange={handleChange} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Category</label>
            <input name="category" value={formData.category} onChange={handleChange} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Content</label>
            <textarea
              name="content"
              rows="5"
              value={formData.content}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="modal-footer">
          <button type="submit" className="edit-btn">
            {editingId ? 'Update' : 'Create'}
          </button>
          <button type="button" onClick={() => setShowModal(false)} className="delete-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default DashArticleListPage;