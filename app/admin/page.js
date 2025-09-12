'use client'; 

import { useState, useEffect } from 'react';

// Sample data (in a real app, this would come from an API or database)
const initialWriters = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    role: "writer",
    status: "active",
    bio: "Passionate writer and UX designer with 8+ years of experience.",
    articles: 24,
    totalViews: 12500,
    totalLikes: 847,
    joinedDate: "2024-03-15"
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@email.com",
    role: "editor",
    status: "active",
    bio: "Tech enthusiast and content strategist focused on emerging technologies.",
    articles: 18,
    totalViews: 9800,
    totalLikes: 623,
    joinedDate: "2024-02-20"
  },
  {
    id: 3,
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.rodriguez@email.com",
    role: "writer",
    status: "active",
    bio: "Business consultant and productivity expert.",
    articles: 15,
    totalViews: 7200,
    totalLikes: 456,
    joinedDate: "2024-04-10"
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Kim",
    email: "david.kim@email.com",
    role: "writer",
    status: "inactive",
    bio: "Innovation researcher and startup advisor.",
    articles: 8,
    totalViews: 3400,
    totalLikes: 234,
    joinedDate: "2024-01-05"
  }
];

const initialArticles = [
  {
    id: 1,
    title: "The Future of AI in Design",
    writerId: 1,
    writerName: "Sarah Johnson",
    category: "technology",
    status: "published",
    views: 2100,
    likes: 156,
    createdAt: "2025-01-10"
  },
  {
    id: 2,
    title: "Building Better User Experiences",
    writerId: 1,
    writerName: "Sarah Johnson",
    category: "design",
    status: "published",
    views: 1800,
    likes: 124,
    createdAt: "2025-01-08"
  },
  {
    id: 3,
    title: "Machine Learning Trends 2025",
    writerId: 2,
    writerName: "Michael Chen",
    category: "technology",
    status: "pending",
    views: 0,
    likes: 0,
    createdAt: "2025-01-12"
  },
  {
    id: 4,
    title: "Productivity Hacks for Remote Teams",
    writerId: 3,
    writerName: "Emily Rodriguez",
    category: "productivity",
    status: "published",
    views: 1650,
    likes: 98,
    createdAt: "2025-01-05"
  },
  {
    id: 5,
    title: "Innovation in Sustainable Tech",
    writerId: 4,
    writerName: "David Kim",
    category: "innovation",
    status: "draft",
    views: 0,
    likes: 0,
    createdAt: "2025-01-11"
  }
];

export default function Admin() {
  const [writers, setWriters] = useState(initialWriters);
  const [articles, setArticles] = useState(initialArticles);
  const [currentSection, setCurrentSection] = useState('overview');
  const [currentEditWriterId, setCurrentEditWriterId] = useState(null);
  const [currentDeleteWriterId, setCurrentDeleteWriterId] = useState(null);
  const [selectedArticles, setSelectedArticles] = useState(new Set());
  const [contentFilter, setContentFilter] = useState('all');
  const [editWriterForm, setEditWriterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'writer',
    status: 'active',
    bio: ''
  });
  const [newWriterForm, setNewWriterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'writer',
    status: 'active',
    bio: ''
  });

  // Initialize admin dashboard
  useEffect(() => {
    renderRecentActivity();
    renderWritersGrid();
    renderContentTable();
    renderTopWriters();
    updateOverviewStats();
  }, []);

  // Update overview stats
  const updateOverviewStats = () => {
    return {
      totalWriters: writers.length,
      totalArticles: articles.length
    };
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Render recent activity
  const renderRecentActivity = () => {
    const activities = [
      { type: 'article', message: 'Sarah Johnson published "The Future of AI in Design"', time: '2 hours ago', icon: '📝' },
      { type: 'writer', message: 'New writer Michael Chen joined the platform', time: '5 hours ago', icon: '👤' },
      { type: 'review', message: 'Article "Machine Learning Trends 2025" pending review', time: '1 day ago', icon: '⏳' },
      { type: 'milestone', message: 'Platform reached 100K total views!', time: '2 days ago', icon: '🎉' },
      { type: 'article', message: 'Emily Rodriguez published "Productivity Hacks for Remote Teams"', time: '3 days ago', icon: '📝' }
    ];

    return activities.map(activity => (
      <div key={activity.message} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
        <div className="text-2xl">{activity.icon}</div>
        <div className="flex-1">
          <div className="font-medium text-gray-800">{activity.message}</div>
          <div className="text-sm text-gray-600">{activity.time}</div>
        </div>
      </div>
    ));
  };

  // Render writers grid
  const renderWritersGrid = () => {
    return writers.map(writer => (
      <div key={writer.id} className="writer-card bg-white rounded-2xl p-6 shadow-soft">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
              {writer.firstName[0]}{writer.lastName[0]}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{writer.firstName} {writer.lastName}</h3>
              <p className="text-sm text-gray-600">{writer.email}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => editWriter(writer.id)} className="text-blue-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button onClick={() => deleteWriter(writer.id)} className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <span className={`role-badge role-${writer.role}`}>{writer.role}</span>
          <span className={`status-badge status-${writer.status}`}>{writer.status}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{writer.bio}</p>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="font-bold text-gray-800">{writer.articles}</div>
            <div className="text-xs text-gray-600">Articles</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-800">{writer.totalViews.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Views</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-800">{writer.totalLikes}</div>
            <div className="text-xs text-gray-600">Likes</div>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-4">
          Joined {formatDate(writer.joinedDate)}
        </div>
      </div>
    ));
  };

  // Add writer
  const addWriter = () => {
    const { firstName, lastName, email, role, status, bio } = newWriterForm;
    if (!firstName || !lastName || !email) {
      alert('Please fill in all required fields.');
      return;
    }

    const newWriter = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      role,
      status,
      bio,
      articles: 0,
      totalViews: 0,
      totalLikes: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setWriters([newWriter, ...writers]);
    setNewWriterForm({ firstName: '', lastName: '', email: '', role: 'writer', status: 'active', bio: '' });
    closeModal('add-writer-modal');
    alert('Writer added successfully!');
  };

  // Edit writer
  const editWriter = (id) => {
    const writer = writers.find(w => w.id === id);
    if (!writer) return;

    setCurrentEditWriterId(id);
    setEditWriterForm({
      firstName: writer.firstName,
      lastName: writer.lastName,
      email: writer.email,
      role: writer.role,
      status: writer.status,
      bio: writer.bio
    });
    showModal('edit-writer-modal');
  };

  // Update writer
  const updateWriter = () => {
    const { firstName, lastName, email, role, status, bio } = editWriterForm;
    if (!firstName || !lastName || !email) {
      alert('Please fill in all required fields.');
      return;
    }

    setWriters(writers.map(writer =>
      writer.id === currentEditWriterId ? { ...writer, firstName, lastName, email, role, status, bio } : writer
    ));
    closeModal('edit-writer-modal');
    alert('Writer updated successfully!');
  };

  // Delete writer
  const deleteWriter = (id) => {
    setCurrentDeleteWriterId(id);
    showModal('delete-writer-modal');
  };

  // Confirm delete writer
  const confirmDeleteWriter = () => {
    if (currentDeleteWriterId) {
      setWriters(writers.filter(w => w.id !== currentDeleteWriterId));
      setArticles(articles.filter(a => a.writerId !== currentDeleteWriterId));
      closeModal('delete-writer-modal');
      alert('Writer account and all associated articles deleted successfully!');
      setCurrentDeleteWriterId(null);
    }
  };

  // Render content table
  const renderContentTable = () => {
    const filteredArticles = contentFilter === 'all'
      ? articles
      : articles.filter(a => a.status === contentFilter);

    return filteredArticles.map(article => (
      <tr key={article.id} className="table-row border-b border-gray-100">
        <td className="px-6 py-4">
          <input
            type="checkbox"
            className="article-checkbox rounded border-gray-300"
            value={article.id}
            onChange={() => toggleArticleSelection(article.id)}
          />
        </td>
        <td className="px-6 py-4">
          <div className="font-semibold text-gray-800">{article.title}</div>
          <div className="text-sm text-gray-600">{article.category}</div>
        </td>
        <td className="px-6 py-4">
          <div className="font-medium text-gray-800">{article.writerName}</div>
        </td>
        <td className="px-6 py-4">
          <span className={`status-badge status-${article.status}`}>{article.status}</span>
        </td>
        <td className="px-6 py-4">
          <div className="font-medium text-gray-800">{article.views.toLocaleString()}</div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-600">{formatDate(article.createdAt)}</div>
        </td>
        <td className="px-6 py-4">
          <div className="flex space-x-2">
            {article.status === 'pending' && (
              <>
                <button
                  onClick={() => approveArticle(article.id)}
                  className="text-green-500 hover:text-green-600 p-1 rounded hover:bg-green-50 transition-colors"
                  title="Approve"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
                <button
                  onClick={() => rejectArticle(article.id)}
                  className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                  title="Reject"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </>
            )}
            <button
              onClick={() => deleteArticle(article.id)}
              className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  // Filter content
  const filterContent = (value) => {
    setContentFilter(value);
  };

  // Toggle article selection
  const toggleArticleSelection = (id) => {
    setSelectedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Toggle select all
  const toggleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectedArticles(checked ? new Set(articles.map(a => a.id)) : new Set());
  };

  // Bulk delete selected articles
  const bulkDeleteSelected = () => {
    if (selectedArticles.size === 0) {
      alert('Please select articles to delete.');
      return;
    }

    if (confirm(`Are you sure you want to delete ${selectedArticles.size} selected articles? This action cannot be undone.`)) {
      setArticles(articles.filter(a => !selectedArticles.has(a.id)));
      setSelectedArticles(new Set());
      alert('Selected articles deleted successfully!');
    }
  };

  // Approve article
  const approveArticle = (id) => {
    setArticles(articles.map(article =>
      article.id === id ? { ...article, status: 'published' } : article
    ));
    alert('Article approved and published!');
  };

  // Reject article
  const rejectArticle = (id) => {
    setArticles(articles.map(article =>
      article.id === id ? { ...article, status: 'draft' } : article
    ));
    alert('Article rejected and moved to drafts.');
  };

  // Delete article
  const deleteArticle = (id) => {
    if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      setArticles(articles.filter(a => a.id !== id));
      alert('Article deleted successfully!');
    }
  };

  // Render top writers
  const renderTopWriters = () => {
    const topWriters = writers
      .sort((a, b) => b.totalViews - a.totalViews)
      .slice(0, 5);

    return topWriters.map((writer, index) => (
      <div key={writer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {index + 1}
          </div>
          <div>
            <div className="font-semibold text-gray-800">{writer.firstName} {writer.lastName}</div>
            <div className="text-sm text-gray-600">{writer.articles} articles</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-gray-800">{writer.totalViews.toLocaleString()}</div>
          <div className="text-sm text-gray-600">views</div>
        </div>
      </div>
    ));
  };

  // Modal functions
  const showModal = (modalId) => {
    document.getElementById(modalId)?.classList.add('show');
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId)?.classList.remove('show');
  };

  // Logout function
  const adminLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logout successful! You would be redirected to the login page.');
      // In a real app, use Next.js router to redirect to login page
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-soft sticky top-0 z-40 border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 sunset-gradient rounded-2xl flex items-center justify-center shadow-lg floating-animation">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">WordNest Admin</h1>
                <p className="text-xs text-gray-500 font-medium">Platform Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <div className="font-semibold text-gray-800">Admin User</div>
                <div className="text-sm text-gray-500">Platform Administrator</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <button onClick={adminLogout} className="text-gray-600 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-md shadow-soft min-h-screen p-6">
          <nav className="space-y-2">
            <button
              onClick={() => setCurrentSection('overview')}
              className={`sidebar-item ${currentSection === 'overview' ? 'active' : 'text-gray-700 hover:bg-gray-100'} w-full text-left px-4 py-3 rounded-xl font-medium flex items-center space-x-3`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              <span>Overview</span>
            </button>
            <button
              onClick={() => setCurrentSection('writers')}
              className={`sidebar-item ${currentSection === 'writers' ? 'active' : 'text-gray-700 hover:bg-gray-100'} w-full text-left px-4 py-3 rounded-xl font-medium flex items-center space-x-3`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              <span>Manage Writers</span>
            </button>
            <button
              onClick={() => setCurrentSection('content')}
              className={`sidebar-item ${currentSection === 'content' ? 'active' : 'text-gray-700 hover:bg-gray-100'} w-full text-left px-4 py-3 rounded-xl font-medium flex items-center space-x-3`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
              </svg>
              <span>Content Management</span>
            </button>
            <button
              onClick={() => setCurrentSection('analytics')}
              className={`sidebar-item ${currentSection === 'analytics' ? 'active' : 'text-gray-700 hover:bg-gray-100'} w-full text-left px-4 py-3 rounded-xl font-medium flex items-center space-x-3`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              <span>Analytics</span>
            </button>
            <button
              onClick={() => setCurrentSection('settings')}
              className={`sidebar-item ${currentSection === 'settings' ? 'active' : 'text-gray-700 hover:bg-gray-100'} w-full text-left px-4 py-3 rounded-xl font-medium flex items-center space-x-3`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Overview Section */}
          {currentSection === 'overview' && (
            <section id="overview-section" className="admin-section-content">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Platform Overview 📊</h2>
                <p className="text-xl text-gray-600">Monitor your WordNest platform performance and activity.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="stats-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 sunset-gradient rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                    </div>
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{writers.length}</div>
                  <div className="text-gray-600 font-medium">Total Writers</div>
                  <div className="text-sm text-green-600 mt-2">+2 this month</div>
                </div>
                <div className="stats-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 tech-gradient rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{articles.length}</div>
                  <div className="text-gray-600 font-medium">Total Articles</div>
                  <div className="text-sm text-green-600 mt-2">+18 this week</div>
                </div>
                <div className="stats-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 design-gradient rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-2xl">👀</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">89.2K</div>
                  <div className="text-gray-600 font-medium">Total Views</div>
                  <div className="text-sm text-green-600 mt-2">+12.5K this week</div>
                </div>
                <div className="stats-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 green-gradient rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">94.7%</div>
                  <div className="text-gray-600 font-medium">Platform Health</div>
                  <div className="text-sm text-green-600 mt-2">All systems operational</div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-soft">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Platform Activity</h3>
                <div className="space-y-4" id="recent-activity">
                  {renderRecentActivity()}
                </div>
              </div>
            </section>
          )}

          {/* Writers Management Section */}
          {currentSection === 'writers' && (
            <section id="writers-section" className="admin-section-content">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Manage Writers 👥</h2>
                  <p className="text-xl text-gray-600">Add, edit, and manage writer accounts on your platform.</p>
                </div>
                <button onClick={() => showModal('add-writer-modal')} className="sunset-gradient text-white px-6 py-3 rounded-xl font-semibold button-hover pulse-glow">
                  Add New Writer
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" id="writers-grid">
                {renderWritersGrid()}
              </div>
            </section>
          )}

          {/* Content Management Section */}
          {currentSection === 'content' && (
            <section id="content-section" className="admin-section-content">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Content Management 📝</h2>
                  <p className="text-xl text-gray-600">Moderate and manage all articles across the platform.</p>
                </div>
                <div className="flex space-x-4">
                  <select
                    id="content-filter"
                    value={contentFilter}
                    onChange={(e) => filterContent(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
                  >
                    <option value="all">All Articles</option>
                    <option value="published">Published</option>
                    <option value="pending">Pending Review</option>
                    <option value="draft">Drafts</option>
                  </select>
                  <button onClick={bulkDeleteSelected} className="red-gradient text-white px-6 py-3 rounded-xl font-semibold button-hover">
                    Delete Selected
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left">
                          <input type="checkbox" id="select-all" onChange={toggleSelectAll} className="rounded border-gray-300" />
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Article</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Writer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Views</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="content-table-body">{renderContentTable()}</tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* Analytics Section */}
          {currentSection === 'analytics' && (
            <section id="analytics-section" className="admin-section-content">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Platform Analytics 📊</h2>
                <p className="text-xl text-gray-600">Deep insights into platform performance and user engagement.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 shadow-soft">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Top Performing Writers</h3>
                  <div className="space-y-4" id="top-writers">
                    {renderTopWriters()}
                  </div>
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-soft">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Content Categories</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Technology</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="font-semibold text-sm">42 articles</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Design</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="font-semibold text-sm">35 articles</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Business</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="font-semibold text-sm">28 articles</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Productivity</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="font-semibold text-sm">22 articles</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Settings Section */}
          {currentSection === 'settings' && (
            <section id="settings-section" className="admin-section-content">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Platform Settings ⚙️</h2>
                <p className="text-xl text-gray-600">Configure platform settings and preferences.</p>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-soft">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">General Settings</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Articles Per Page</label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all">
                          <option value="10">10 articles</option>
                          <option value="20">20 articles</option>
                          <option value="50">50 articles</option>
                          <option value="100">100 articles</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Default Article Status</label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all">
                          <option value="draft">Draft</option>
                          <option value="pending">Pending Review</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Content Moderation</h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-gray-700">Require admin approval for new articles</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-gray-700">Enable automatic spam detection</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-gray-700">Allow writers to publish immediately</span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-6">
                    <button type="button" className="sunset-gradient text-white px-8 py-4 rounded-xl font-semibold button-hover">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Add Writer Modal */}
          <div id="add-writer-modal" className="modal hidden">
            <div className="modal-content w-full max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Add New Writer</h3>
                <button onClick={() => closeModal('add-writer-modal')} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">First Name *</label>
                    <input
                      type="text"
                      value={newWriterForm.firstName}
                      onChange={(e) => setNewWriterForm({ ...newWriterForm, firstName: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Last Name *</label>
                    <input
                      type="text"
                      value={newWriterForm.lastName}
                      onChange={(e) => setNewWriterForm({ ...newWriterForm, lastName: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address *</label>
                  <input
                    type="email"
                    value={newWriterForm.email}
                    onChange={(e) => setNewWriterForm({ ...newWriterForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Role</label>
                    <select
                      value={newWriterForm.role}
                      onChange={(e) => setNewWriterForm({ ...newWriterForm, role: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                    >
                      <option value="writer">Writer</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
                    <select
                      value={newWriterForm.status}
                      onChange={(e) => setNewWriterForm({ ...newWriterForm, status: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Bio</label>
                  <textarea
                    value={newWriterForm.bio}
                    onChange={(e) => setNewWriterForm({ ...newWriterForm, bio: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
                  />
                </div>
                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => closeModal('add-writer-modal')}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={addWriter}
                    className="flex-1 sunset-gradient text-white py-3 rounded-xl font-semibold button-hover"
                  >
                    Add Writer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Writer Modal */}
          <div id="edit-writer-modal" className="modal hidden">
            <div className="modal-content w-full max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Edit Writer</h3>
                <button onClick={() => closeModal('edit-writer-modal')} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div className="space-y-6">
                <input type="hidden" value={currentEditWriterId || ''} />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">First Name</label>
                    <input
                      type="text"
                      value={editWriterForm.firstName}
                      onChange={(e) => setEditWriterForm({ ...editWriterForm, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Last Name</label>
                    <input
                      type="text"
                      value={editWriterForm.lastName}
                      onChange={(e) => setEditWriterForm({ ...editWriterForm, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                  <input
                    type="email"
                    value={editWriterForm.email}
                    onChange={(e) => setEditWriterForm({ ...editWriterForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Role</label>
                    <select
                      value={editWriterForm.role}
                      onChange={(e) => setEditWriterForm({ ...editWriterForm, role: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                    >
                      <option value="writer">Writer</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
                    <select
                      value={editWriterForm.status}
                      onChange={(e) => setEditWriterForm({ ...editWriterForm, status: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Bio</label>
                  <textarea
                    value={editWriterForm.bio}
                    onChange={(e) => setEditWriterForm({ ...editWriterForm, bio: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
                  />
                </div>
                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => closeModal('edit-writer-modal')}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={updateWriter}
                    className="flex-1 sunset-gradient text-white py-3 rounded-xl font-semibold button-hover"
                  >
                    Update Writer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Writer Modal */}
          <div id="delete-writer-modal" className="modal hidden">
            <div className="modal-content w-full max-w-md">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Writer Account</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this writer's account? This will also remove all their articles. This action cannot be undone.</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => closeModal('delete-writer-modal')}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteWriter}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
