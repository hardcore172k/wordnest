'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../supabase';

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [currentEditId, setCurrentEditId] = useState(null);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editForm, setEditForm] = useState({ title: '', category: '', summary: '', content: '' });
  const [userName, setUserName] = useState('User');
  const router = useRouter();

  // Initialize dashboard with Supabase and handle session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        router.push('/');
        return;
      }
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role, first_name')
        .eq('id', session.user.id)
        .single();
      if (userError) {
        console.error('Error fetching user data:', userError);
        return;
      }
      setUserName(userData.first_name || session.user.user_metadata?.first_name || 'User');
      if (userData.role === 'admin' || userData.role === 'editor') {
        router.push('/admin');
        return;
      }
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select('*')
        .eq('writer_id', session.user.id);
      if (articlesError) {
        console.error('Error fetching articles:', articlesError);
        return;
      }
      setArticles(articlesData || []);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        checkSession(); // Refresh session and data on sign-in (e.g., after signup)
      }
      if (event === 'SIGNED_OUT') {
        router.push('/');
      }
    });

    // Send close message to original tab when dashboard loads in new tab
    if (window.opener) {
      window.opener.postMessage('closeTab', '*');
    }

    return () => subscription.unsubscribe();
  }, [router]);

  // Update stats
  const updateStats = () => {
    const totalArticles = articles.length;
    const publishedArticles = articles.filter(a => a.status === 'published').length;
    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
    const totalLikes = articles.reduce((sum, a) => sum + (a.likes || 0), 0);
    return { totalArticles, publishedArticles, totalViews, totalLikes };
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Render recent articles
  const renderRecentArticles = () => {
    return articles
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 3)
      .map(article => (
        <div key={article.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="flex-1">
            <div className="font-semibold text-gray-800 mb-1">{article.title}</div>
            <div className="text-sm text-gray-600">{formatDate(article.created_at)} • {article.category}</div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`status-badge status-${article.status}`}>{article.status}</span>
            <div className="text-right text-sm">
              <div className="text-gray-800 font-medium">{article.views || 0} views</div>
              <div className="text-gray-600">{article.likes || 0} likes</div>
            </div>
          </div>
        </div>
      ));
  };

  // Filter articles
  const filterArticles = (status) => {
    setCurrentFilter(status);
  };

  // Render articles grid
  const renderArticlesGrid = () => {
    const filteredArticles = currentFilter === 'all' 
      ? articles 
      : articles.filter(a => a.status === currentFilter);
    
    return filteredArticles.map(article => (
      <div key={article.id} className="article-card bg-white rounded-2xl p-6 shadow-soft">
        <div className="flex items-start justify-between mb-4">
          <span className={`status-badge status-${article.status}`}>{article.status}</span>
          <div className="flex space-x-2">
            <button onClick={() => editArticle(article.id)} className="text-blue-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button onClick={() => deleteArticle(article.id)} className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{article.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.summary || ''}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="bg-gray-100 px-3 py-1 rounded-full">{article.category}</span>
          <span>{formatDate(article.created_at)}</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>👀 {article.views || 0}</span>
            <span>❤️ {article.likes || 0}</span>
          </div>
          <div className="flex space-x-2">
            {article.tags?.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    ));
  };

  // Save article
  const saveArticle = async (status) => {
    const title = document.getElementById('article-title')?.value;
    const category = document.getElementById('article-category')?.value;
    const summary = document.getElementById('article-summary')?.value;
    const content = document.getElementById('article-content')?.innerHTML;
    const tags = document.getElementById('article-tags')?.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);

    if (!title || !category || !content) {
      alert('Please fill in all required fields.');
      return;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert('Error: User not authenticated');
      router.push('/login');
      return;
    }

    const newArticle = {
      title,
      category,
      summary,
      content,
      status,
      created_at: new Date().toISOString().split('T')[0],
      tags,
      writer_id: user.id,
      writer_name: `${user.user_metadata.first_name || ''} ${user.user_metadata.last_name || ''}`.trim()
    };

    const { data, error } = await supabase.from('articles').insert([newArticle]).select().single();
    if (error) {
      alert('Error saving article: ' + error.message);
      return;
    }
    setArticles([data, ...articles]);
    document.getElementById('article-form')?.reset();
    document.getElementById('article-content').innerHTML = '';
    alert(`Article ${status === 'published' ? 'published' : status === 'pending' ? 'submitted for review' : 'saved as draft'} successfully!`);
  };

  // Edit article
  const editArticle = async (id) => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) {
      alert('Error loading article: ' + (error?.message || 'Not found'));
      return;
    }
    setCurrentEditId(id);
    setEditForm({
      title: data.title,
      category: data.category,
      summary: data.summary || '',
      content: data.content
    });
    showModal('edit-modal');
  };

  // Update article
  const updateArticle = async () => {
    const title = document.getElementById('edit-article-title')?.value;
    const category = document.getElementById('edit-article-category')?.value;
    const summary = document.getElementById('edit-article-summary')?.value;
    const content = document.getElementById('edit-article-content')?.innerHTML;

    if (!title || !category || !content) {
      alert('Please fill in all required fields.');
      return;
    }

    const { error } = await supabase
      .from('articles')
      .update({ title, category, summary, content })
      .eq('id', currentEditId);
    if (error) {
      alert('Error updating article: ' + error.message);
      return;
    }
    setArticles(articles.map(article =>
      article.id === currentEditId ? { ...article, title, category, summary, content } : article
    ));
    closeModal('edit-modal');
    alert('Article updated successfully!');
  };

  // Delete article
  const deleteArticle = (id) => {
    setCurrentDeleteId(id);
    showModal('delete-modal');
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!currentDeleteId) return;
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', currentDeleteId);
    if (error) {
      alert('Error deleting article: ' + error.message);
      return;
    }
    setArticles(articles.filter(a => a.id !== currentDeleteId));
    closeModal('delete-modal');
    alert('Article deleted successfully!');
    setCurrentDeleteId(null);
  };

  // Modal functions
  const showModal = (modalId) => {
    document.getElementById(modalId)?.classList.add('show');
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId)?.classList.remove('show');
  };

  // Text formatting functions
  const formatText = (command) => {
    document.execCommand(command, false, null);
    document.getElementById('article-content')?.focus();
  };

  const formatEditText = (command) => {
    document.execCommand(command, false, null);
    document.getElementById('edit-article-content')?.focus();
  };

  // Logout function
  const logout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert('Error logging out: ' + error.message);
        return;
      }
      router.push('/');
      alert('Logged out successfully!');
    }
  };

  // Stats for dashboard
  const { totalArticles, publishedArticles, totalViews, totalLikes } = updateStats();

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-md shadow-soft min-h-screen p-6">
        <nav className="space-y-2">
          <button onClick={() => setCurrentSection('dashboard')} className={`sidebar-item ${currentSection === 'dashboard' ? 'active' : 'text-gray-700 hover:bg-gray-100'} w-full text-left px-4 py-3 rounded-xl font-medium flex items-center space-x-3`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
            <span>Dashboard</span>
          </button>
          <button onClick={() => setCurrentSection('articles')} className={`sidebar-item ${currentSection === 'articles' ? 'active' : 'text-gray-700 hover:bg-gray-100'} w-full text-left px-4 py-3 rounded-xl font-medium flex items-center space-x-3`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
            </svg>
            <span>My Articles</span>
          </button>
          <button onClick={() => setCurrentSection('create')} className={`sidebar-item ${currentSection === 'create' ? 'active' : 'text-gray-700 hover:bg-gray-100'} w-full text-left px-4 py-3 rounded-xl font-medium flex items-center space-x-3`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
            </svg>
            <span>Create Article</span>
          </button>
          <button onClick={() => setCurrentSection('analytics')} className={`sidebar-item ${currentSection === 'analytics' ? 'active' : 'text-gray-700 hover:bg-gray-100'} w-full text-left px-4 py-3 rounded-xl font-medium flex items-center space-x-3`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            <span>Analytics</span>
          </button>
          <button onClick={() => setCurrentSection('profile')} className={`sidebar-item ${currentSection === 'profile' ? 'active' : 'text-gray-700 hover:bg-gray-100'} w-full text-left px-4 py-3 rounded-xl font-medium flex items-center space-x-3`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
            </svg>
            <span>Profile</span>
          </button>
          <button onClick={logout} className="sidebar-item text-gray-700 hover:bg-gray-100 w-full text-left px-4 py-3 rounded-xl font-medium flex items-center space-x-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
            </svg>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Dashboard Section */}
        {currentSection === 'dashboard' && (
          <section id="dashboard-section" className="section-content">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome back, {userName}! 👋</h2>
              <p className="text-xl text-gray-600">Here&apos;s what&apos;s happening with your content today.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="stats-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 sunset-gradient rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-2xl">📝</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{totalArticles}</div>
                <div className="text-gray-600 font-medium">Total Articles</div>
                <div className="text-sm text-green-600 mt-2">+{totalArticles} this month</div>
              </div>
              <div className="stats-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 sunset-gradient rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-2xl">✅</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{publishedArticles}</div>
                <div className="text-gray-600 font-medium">Published Articles</div>
                <div className="text-sm text-green-600 mt-2">+{publishedArticles} this month</div>
              </div>
              <div className="stats-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 sunset-gradient rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-2xl">👀</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{totalViews}</div>
                <div className="text-gray-600 font-medium">Total Views</div>
                <div className="text-sm text-green-600 mt-2">+{totalViews} this month</div>
              </div>
              <div className="stats-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 sunset-gradient rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a3 3 0 014.243 0L10 7.757l2.586-2.586a3 3 0 014.243 4.243l-2.586 2.586 2.586 2.586a3 3 0 01-4.243 4.243L10 13.243l-2.586 2.586a3 3 0 01-4.243-4.243l2.586-2.586L3.172 5.172a3 3 0 010-4.243z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-2xl">❤️</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{totalLikes}</div>
                <div className="text-gray-600 font-medium">Total Likes</div>
                <div className="text-sm text-green-600 mt-2">+{totalLikes} this month</div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Recent Articles</h3>
                <button onClick={() => setCurrentSection('articles')} className="text-orange-500 hover:text-orange-600 font-medium">View All</button>
              </div>
              <div className="space-y-4" id="recent-articles">
                {renderRecentArticles()}
                {articles.length === 0 && <p className="text-gray-600">No recent articles.</p>}
              </div>
            </div>
          </section>
        )}

        {/* Articles Section */}
        {currentSection === 'articles' && (
          <section id="articles-section" className="section-content">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">My Articles</h2>
                <p className="text-xl text-gray-600">Manage all your published and draft articles.</p>
              </div>
              <button onClick={() => setCurrentSection('create')} className="sunset-gradient text-white px-6 py-3 rounded-xl font-semibold button-hover pulse-glow">
                Create New Article
              </button>
            </div>
            <div className="bg-white rounded-2xl p-2 shadow-soft mb-8 inline-flex">
              <button onClick={() => filterArticles('all')} className={`filter-tab ${currentFilter === 'all' ? 'active sunset-gradient text-white' : 'text-gray-600'} px-6 py-3 rounded-xl font-medium transition-all`}>All Articles</button>
              <button onClick={() => filterArticles('published')} className={`filter-tab ${currentFilter === 'published' ? 'active sunset-gradient text-white' : 'text-gray-600'} px-6 py-3 rounded-xl font-medium transition-all`}>Published</button>
              <button onClick={() => filterArticles('draft')} className={`filter-tab ${currentFilter === 'draft' ? 'active sunset-gradient text-white' : 'text-gray-600'} px-6 py-3 rounded-xl font-medium transition-all`}>Drafts</button>
              <button onClick={() => filterArticles('pending')} className={`filter-tab ${currentFilter === 'pending' ? 'active sunset-gradient text-white' : 'text-gray-600'} px-6 py-3 rounded-xl font-medium transition-all`}>Pending Review</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" id="articles-grid">
              {renderArticlesGrid()}
              {articles.length === 0 && <p className="text-gray-600">No articles found.</p>}
            </div>
          </section>
        )}

        {/* Create Article Section */}
        {currentSection === 'create' && (
          <section id="create-section" className="section-content">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Create New Article</h2>
              <p className="text-xl text-gray-600">Share your knowledge with the WordNest community.</p>
            </div>
            <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
              <form id="article-form" className="space-y-6 p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Article Title *</label>
                    <input type="text" id="article-title" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all" placeholder="Enter your article title..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Category *</label>
                    <select id="article-category" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all">
                      <option value="">Select a category</option>
                      <option value="technology">Technology</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                      <option value="productivity">Productivity</option>
                      <option value="innovation">Innovation</option>
                      <option value="lifestyle">Lifestyle</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Article Summary</label>
                  <textarea id="article-summary" rows="3" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all resize-none" placeholder="Brief summary of your article..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Tags</label>
                  <input type="text" id="article-tags" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all" placeholder="Enter tags separated by commas..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Content *</label>
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="editor-toolbar">
                      <button type="button" className="editor-btn" onClick={() => formatText('bold')} title="Bold">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 4a1 1 0 011-1h3a3 3 0 110 6H6v2h3a3 3 0 110 6H6a1 1 0 01-1-1V4zm2 2v3h2a1 1 0 100-2H7zm0 6v3h2a1 1 0 100-2H7z" clipRule="evenodd"/>
                        </svg>
                      </button>
                      <button type="button" className="editor-btn" onClick={() => formatText('italic')} title="Italic">I</button>
                      <button type="button" className="editor-btn" onClick={() => formatText('underline')} title="Underline">U</button>
                    </div>
                    <div id="article-content" className="content-editor" contentEditable="true" />
                  </div>
                </div>
                <div className="flex space-x-4 pt-6">
                  <button type="button" onClick={() => saveArticle('draft')} className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                    Save as Draft
                  </button>
                  <button type="button" onClick={() => saveArticle('pending')} className="flex-1 tech-gradient text-white py-4 rounded-xl font-semibold button-hover">
                    Submit for Review
                  </button>
                  <button type="button" onClick={() => saveArticle('published')} className="flex-1 sunset-gradient text-white py-4 rounded-xl font-semibold button-hover">
                    Publish Now
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Analytics Section */}
        {currentSection === 'analytics' && (
          <section id="analytics-section" className="section-content">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Analytics</h2>
              <p className="text-xl text-gray-600">View performance metrics for your articles.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <p className="text-gray-600">Analytics data will be displayed here soon.</p>
              {/* Add Supabase queries for analytics (e.g., views, likes trends) */}
            </div>
          </section>
        )}

        {/* Profile Section */}
        {currentSection === 'profile' && (
          <section id="profile-section" className="section-content">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Profile</h2>
              <p className="text-xl text-gray-600">Manage your account details.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <p className="text-gray-600">Profile details will be displayed here soon.</p>
              {/* Add Supabase queries for profile (e.g., email, first_name, role) */}
            </div>
          </section>
        )}

        {/* Edit Article Modal */}
        <div id="edit-modal" className="modal hidden">
          <div className="modal-content w-full max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Edit Article</h3>
              <button onClick={() => closeModal('edit-modal')} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <form id="edit-article-form" className="space-y-6">
              <input type="hidden" id="edit-article-id" value={currentEditId || ''} />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Article Title</label>
                  <input
                    type="text"
                    id="edit-article-title"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                  <select
                    id="edit-article-category"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                  >
                    <option value="technology">Technology</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="productivity">Productivity</option>
                    <option value="innovation">Innovation</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Summary</label>
                <textarea
                  id="edit-article-summary"
                  rows="3"
                  value={editForm.summary}
                  onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Content</label>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="editor-toolbar">
                    <button type="button" className="editor-btn" onClick={() => formatEditText('bold')} title="Bold">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 4a1 1 0 011-1h3a3 3 0 110 6H6v2h3a3 3 0 110 6H6a1 1 0 01-1-1V4zm2 2v3h2a1 1 0 100-2H7zm0 6v3h2a1 1 0 100-2H7z" clipRule="evenodd"/>
                      </svg>
                    </button>
                    <button type="button" className="editor-btn" onClick={() => formatEditText('italic')} title="Italic">I</button>
                    <button type="button" className="editor-btn" onClick={() => formatEditText('underline')} title="Underline">U</button>
                  </div>
                  <div id="edit-article-content" className="content-editor" contentEditable="true" dangerouslySetInnerHTML={{ __html: editForm.content }} />
                </div>
              </div>
              <div className="flex space-x-4 pt-6">
                <button type="button" onClick={() => closeModal('edit-modal')} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                  Cancel
                </button>
                <button type="button" onClick={updateArticle} className="flex-1 sunset-gradient text-white py-3 rounded-xl font-semibold button-hover">
                  Update Article
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <div id="delete-modal" className="modal hidden">
          <div className="modal-content w-full max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Article</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this article? This action cannot be undone.</p>
              <div className="flex space-x-4">
                <button onClick={() => closeModal('delete-modal')} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}