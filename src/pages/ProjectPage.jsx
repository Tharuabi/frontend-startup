import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Chatbot from '../components/Chatbot';
import '../style/ProjectPage.css';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [quickFilters, setQuickFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [techFilter, setTechFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [userRatings, setUserRatings] = useState({});


  const navigate = useNavigate();
  const { addToCart, items } = useCart();

  // Generate enhanced placeholder image with category-specific designs
  const generateProjectImage = (project) => {
    // For now, we'll use enhanced placeholders instead of external screenshot services
    // This avoids timeout issues and provides consistent, reliable images
    
    // Fallback to enhanced placeholder with category-specific designs
    const getCategoryTheme = (cat) => {
      const category = cat.toLowerCase();
      if (category.includes('saas') || category.includes('software')) {
        return { bg: '#3b82f6', icon: '☁️', accent: '#1d4ed8' };
      } else if (category.includes('mobile') || category.includes('app')) {
        return { bg: '#10b981', icon: '📱', accent: '#059669' };
      } else if (category.includes('web3') || category.includes('blockchain')) {
        return { bg: '#8b5cf6', icon: '🔗', accent: '#7c3aed' };
      } else if (category.includes('ecommerce') || category.includes('shop')) {
        return { bg: '#f59e0b', icon: '🛒', accent: '#d97706' };
      } else if (category.includes('ai') || category.includes('machine learning')) {
        return { bg: '#ef4444', icon: '🤖', accent: '#dc2626' };
      } else if (category.includes('social') || category.includes('community')) {
        return { bg: '#ec4899', icon: '👥', accent: '#db2777' };
      } else if (category.includes('finance') || category.includes('payment')) {
        return { bg: '#06b6d4', icon: '💰', accent: '#0891b2' };
      } else {
        return { bg: '#667eea', icon: '🚀', accent: '#5a67d8' };
      }
    };

    const theme = getCategoryTheme(project.category);
    const shortTitle = project.title.length > 20 ? project.title.substring(0, 20) + '...' : project.title;
    
    const svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${theme.bg};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${theme.accent};stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
          </filter>
        </defs>
        
        <!-- Background with gradient -->
        <rect width="400" height="300" fill="url(#grad1)" rx="12"/>
        
        <!-- Decorative elements -->
        <circle cx="50" cy="50" r="30" fill="rgba(255,255,255,0.1)"/>
        <circle cx="350" cy="250" r="40" fill="rgba(255,255,255,0.08)"/>
        <rect x="320" y="30" width="60" height="60" rx="8" fill="rgba(255,255,255,0.1)"/>
        
        <!-- Category icon -->
        <text x="200" y="120" font-family="Arial, sans-serif" font-size="48" 
              fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle" filter="url(#shadow)">
          ${theme.icon}
        </text>
        
        <!-- Project title -->
        <text x="200" y="180" font-family="Arial, sans-serif" font-size="18" font-weight="bold"
              fill="white" text-anchor="middle" dominant-baseline="middle" filter="url(#shadow)">
          ${shortTitle}
        </text>
        
        <!-- Category label -->
        <text x="200" y="210" font-family="Arial, sans-serif" font-size="14"
              fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle">
          ${project.category || 'Project'}
        </text>
        
        <!-- Type indicator -->
        <rect x="20" y="20" width="80" height="24" rx="12" fill="rgba(255,255,255,0.2)"/>
        <text x="60" y="35" font-family="Arial, sans-serif" font-size="12" font-weight="bold"
              fill="white" text-anchor="middle" dominant-baseline="middle">
          🚀
        </text>
        
        <!-- Website preview indicator -->
        ${project.externalLink ? `
        <rect x="300" y="20" width="80" height="24" rx="12" fill="rgba(0,255,0,0.2)"/>
        <text x="340" y="35" font-family="Arial, sans-serif" font-size="10" font-weight="bold"
              fill="white" text-anchor="middle" dominant-baseline="middle">
          🌐 Live
        </text>
        ` : ''}
      </svg>
    `;
    
    // Use proper encoding for Unicode characters
    const encodedSvg = btoa(unescape(encodeURIComponent(svg)));
    return `data:image/svg+xml;base64,${encodedSvg}`;
  };

  // Generate enhanced placeholder image with category-specific designs (for ideas)
  const generatePlaceholder = (title, type = 'project', category = '') => {
    // Determine category-specific colors and icons
    const getCategoryTheme = (cat) => {
      const category = cat.toLowerCase();
      if (category.includes('saas') || category.includes('software')) {
        return { bg: '#3b82f6', icon: '☁️', accent: '#1d4ed8' };
      } else if (category.includes('mobile') || category.includes('app')) {
        return { bg: '#10b981', icon: '📱', accent: '#059669' };
      } else if (category.includes('web3') || category.includes('blockchain')) {
        return { bg: '#8b5cf6', icon: '🔗', accent: '#7c3aed' };
      } else if (category.includes('ecommerce') || category.includes('shop')) {
        return { bg: '#f59e0b', icon: '🛒', accent: '#d97706' };
      } else if (category.includes('ai') || category.includes('machine learning')) {
        return { bg: '#ef4444', icon: '🤖', accent: '#dc2626' };
      } else if (category.includes('social') || category.includes('community')) {
        return { bg: '#ec4899', icon: '👥', accent: '#db2777' };
      } else if (category.includes('finance') || category.includes('payment')) {
        return { bg: '#06b6d4', icon: '💰', accent: '#0891b2' };
      } else {
        return { bg: '#667eea', icon: '🚀', accent: '#5a67d8' };
      }
    };

    const theme = getCategoryTheme(category);
    const shortTitle = title.length > 20 ? title.substring(0, 20) + '...' : title;
    
    const svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${theme.bg};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${theme.accent};stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
          </filter>
        </defs>
        
        <!-- Background with gradient -->
        <rect width="400" height="300" fill="url(#grad1)" rx="12"/>
        
        <!-- Decorative elements -->
        <circle cx="50" cy="50" r="30" fill="rgba(255,255,255,0.1)"/>
        <circle cx="350" cy="250" r="40" fill="rgba(255,255,255,0.08)"/>
        <rect x="320" y="30" width="60" height="60" rx="8" fill="rgba(255,255,255,0.1)"/>
        
        <!-- Category icon -->
        <text x="200" y="120" font-family="Arial, sans-serif" font-size="48" 
              fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle" filter="url(#shadow)">
          ${theme.icon}
        </text>
        
        <!-- Project title -->
        <text x="200" y="180" font-family="Arial, sans-serif" font-size="18" font-weight="bold"
              fill="white" text-anchor="middle" dominant-baseline="middle" filter="url(#shadow)">
          ${shortTitle}
        </text>
        
        <!-- Category label -->
        <text x="200" y="210" font-family="Arial, sans-serif" font-size="14"
              fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle">
          ${category || 'Project'}
        </text>
        
        <!-- Type indicator -->
        <rect x="20" y="20" width="80" height="24" rx="12" fill="rgba(255,255,255,0.2)"/>
        <text x="60" y="35" font-family="Arial, sans-serif" font-size="12" font-weight="bold"
              fill="white" text-anchor="middle" dominant-baseline="middle">
          ${type === 'project' ? '🚀' : '💡'}
        </text>
        
        <!-- Category indicator -->
        <rect x="300" y="20" width="80" height="24" rx="12" fill="rgba(255,255,255,0.15)"/>
        <text x="340" y="35" font-family="Arial, sans-serif" font-size="10" font-weight="bold"
              fill="white" text-anchor="middle" dominant-baseline="middle">
          ${category || 'Project'}
        </text>
      </svg>
    `;
    
    // Use proper encoding for Unicode characters
    const encodedSvg = btoa(unescape(encodeURIComponent(svg)));
    return `data:image/svg+xml;base64,${encodedSvg}`;
  };

  // Fetch data from backend
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [projectsRes, ideasRes] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/ideas')
      ]);
      setProjects(projectsRes.data);
      setIdeas(ideasRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load projects and ideas');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh trending data every 45 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 45000); // 45 seconds
    return () => clearInterval(interval);
  }, []);

  // Track project view
  const trackProjectView = async (projectId) => {
    try {
      await axios.put(`/api/projects/${projectId}/view`);
    } catch (err) {
      console.error('Error tracking view:', err);
    }
  };



  // Handle idea like
  const handleLikeIdea = async (ideaId) => {
    try {
      const response = await axios.put(`/api/ideas/${ideaId}/like`);
      if (response.data.success) {
        setIdeas(prev => prev.map(idea => 
          idea._id === ideaId 
            ? { ...idea, likes: response.data.newLikes }
            : idea
        ));
      }
    } catch (err) {
      console.error('Error liking idea:', err);
    }
  };

  // Handle project view
  const handleProjectView = async (projectId) => {
    try {
      await trackProjectView(projectId);
    } finally {
      navigate(`/project/${projectId}`);
    }
  };

  // Handle user rating
  const handleUserRating = (projectId, rating) => {
    setUserRatings(prev => ({
      ...prev,
      [projectId]: rating
    }));
  };

  // Quick filter options
  const quickFilterOptions = [
    { value: 'under50k', label: 'Under ₹50K', icon: '💰' },
    { value: 'saas', label: 'SaaS', icon: '☁️' },
    { value: 'mobile', label: 'Mobile App', icon: '📱' },
    { value: 'web3', label: 'Web3', icon: '🔗' },
    { value: 'ecommerce', label: 'E-commerce', icon: '🛒' }
  ];

          // Category navigation options - Modern Startup Categories
        const categoryOptions = [
          { value: 'all', label: 'All', icon: '🏠' },
          { value: 'saas', label: 'SaaS', icon: '☁️' },
          { value: 'mobile', label: 'Mobile', icon: '📱' },
          { value: 'web3', label: 'Web3', icon: '🔗' },
          { value: 'ecommerce', label: 'E-commerce', icon: '🛒' },
          { value: 'electronics', label: 'Electronics', icon: '📺' },
          { value: 'fashion', label: 'Fashion', icon: '👕' },
          { value: 'beauty', label: 'Beauty', icon: '💄' },
          { value: 'home', label: 'Home', icon: '🏡' }
        ];

  const ideaQuickFilterOptions = [
    { value: 'beginner', label: 'Beginner', icon: '🌱' },
    { value: 'intermediate', label: 'Intermediate', icon: '🚀' },
    { value: 'advanced', label: 'Advanced', icon: '⚡' },
    { value: 'ai', label: 'AI/ML', icon: '🤖' },
    { value: 'fintech', label: 'FinTech', icon: '💳' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  // Toggle quick filter
  const toggleQuickFilter = (filter) => {
    setQuickFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setQuickFilters([]);
    setSearchTerm('');
  };

  // Filter and sort projects
  const filteredAndSortedProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters = quickFilters.length === 0 || 
        quickFilters.some(filter => {
          switch (filter) {
            case 'under50k': return project.price < 50000;
            case 'saas': return project.category.toLowerCase().includes('saas');
            case 'app': return project.category.toLowerCase().includes('app');
            case 'web3': return project.category.toLowerCase().includes('web3');
            case 'ecommerce': return project.category.toLowerCase().includes('ecommerce');
            default: return true;
          }
        });
      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'rating': return b.rating - a.rating;
        case 'views': return b.views - a.views;
        case 'dateAdded': return new Date(b.dateAdded) - new Date(a.dateAdded);
        default: return 0;
      }
    });

  // Filter and sort ideas
  const filteredAndSortedIdeas = ideas
    .filter(idea => {
      const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           idea.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters = quickFilters.length === 0 || 
        quickFilters.some(filter => {
          switch (filter) {
            case 'beginner': return idea.difficulty === 'Beginner';
            case 'intermediate': return idea.difficulty === 'Intermediate';
            case 'advanced': return idea.difficulty === 'Advanced';
            case 'ai': return idea.category.toLowerCase().includes('ai');
            case 'fintech': return idea.category.toLowerCase().includes('fintech');
            default: return true;
          }
        });
      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'estimatedCost': return a.estimatedCost - b.estimatedCost;
        case 'likes': return b.likes - a.likes;
        case 'views': return b.views - a.views;
        case 'dateAdded': return new Date(b.dateAdded) - new Date(a.dateAdded);
        default: return 0;
      }
    });

  // Get trending projects (top 6 by views and rating)
  const trendingProjects = projects
    .filter(project => project.trending || project.views > 100)
    .sort((a, b) => (b.views * b.rating) - (a.views * a.rating))
    .slice(0, 6);

  // Get trending ideas (top 3 by likes and views)
  const trendingIdeas = ideas
    .filter(idea => idea.trending || idea.likes > 10)
    .sort((a, b) => (b.likes * b.views) - (a.likes * a.views))
    .slice(0, 3);

  // Calculate stats
  const stats = {
    totalProjects: projects.length,
    totalIdeas: ideas.length,
    trendingProjects: trendingProjects.length,
    trendingIdeas: trendingIdeas.length,
    avgProjectPrice: projects.length > 0 ? projects.reduce((sum, p) => sum + p.price, 0) / projects.length : 0,
    avgIdeaCost: ideas.length > 0 ? ideas.reduce((sum, i) => sum + i.estimatedCost, 0) / ideas.length : 0
  };

  const handleAddToCart = (project) => {
    addToCart(project);
  };

  // Icons
  const SearchIcon = () => <span className="pp-icon-search">🔍</span>;
  const StarIcon = () => <span className="pp-icon">⭐</span>;
  const EyeIcon = () => <span className="pp-icon">👁️</span>;
  const HeartIcon = () => <span className="pp-icon-heart">❤️</span>;
  const TrendingIcon = () => <span className="pp-icon">🔥</span>;
  const LightbulbIcon = () => <span className="pp-icon-lightbulb">💡</span>;
  const ClockIcon = () => <span className="pp-icon">⏰</span>;
  const LinkIcon = () => <span className="pp-icon">🔗</span>;

  if (isLoading) {
    return (
      <div className="project-page">
        <div className="pp-loading">
          <div className="pp-spinner"></div>
          <p>Loading amazing projects and ideas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-page">
        <div className="pp-error">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchData}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-page">
      <Chatbot />
      {/* Header Section - Clean E-commerce Style */}
      <div className="pp-header">
        <div className="pp-header-top">
          <div className="pp-header-content">
            <h1>Discover Projects & Startup Ideas</h1>
            <p>Explore ready-to-use projects or get inspired by innovative startup ideas</p>
          </div>
          
          {/* Cart Access Button - Top Right */}
          <div className="pp-cart-access">
            <div className="pp-action-buttons">
              <button 
                className={`pp-action-btn pp-project-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                🚀 Projects
              </button>
              <button 
                className={`pp-action-btn pp-idea-btn ${activeTab === 'ideas' ? 'active' : ''}`}
                onClick={() => setActiveTab('ideas')}
              >
                💡 Ideas
              </button>
              <button 
                className="pp-cart-btn"
                onClick={() => navigate('/cart')}
              >
                🛒 View Cart ({items.length})
              </button>
            </div>
          </div>
        </div>

        {/* Stats Container - Clean Cards */}
        <div className="pp-stats-container">
          <div className="pp-stat-card">
            <div className="pp-stat-number">{stats.totalProjects}</div>
            <div className="pp-stat-label">Projects</div>
          </div>
          <div className="pp-stat-card">
            <div className="pp-stat-number">{stats.totalIdeas}</div>
            <div className="pp-stat-label">Ideas</div>
          </div>
          <div className="pp-stat-card">
            <div className="pp-stat-number">{stats.trendingProjects + stats.trendingIdeas}</div>
            <div className="pp-stat-label">Trending</div>
          </div>
          <div className="pp-stat-card">
            <div className="pp-stat-number">₹{(stats.avgProjectPrice + stats.avgIdeaCost).toLocaleString('en-IN')}</div>
            <div className="pp-stat-label">Avg Value</div>
          </div>
        </div>
      </div>

      {/* Comprehensive Search and Filter Bar */}
      <div className="pp-comprehensive-search">
        <div className="pp-search-filter-container">
          {/* Search Input */}
          <div className="pp-search-input-group">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search by name, category, tech...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pp-search-input-field"
            />
          </div>

          {/* Filter Options */}
          <div className="pp-filter-options">
            {/* Type Filter */}
            <div className="pp-filter-group">
              <label className="pp-filter-label">
                <span className="pp-filter-icon">🔧</span>
                Type
              </label>
              <select 
                className="pp-filter-select"
                value={selectedType || 'all'}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="project">Projects</option>
                <option value="idea">Ideas</option>
                <option value="saas">SaaS</option>
                <option value="mobile">Mobile App</option>
                <option value="web3">Web3</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="pp-filter-group">
              <label className="pp-filter-label">
                Price (₹)
              </label>
              <select 
                className="pp-filter-select"
                value={selectedPrice || 'all'}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="under10k">Under ₹10K</option>
                <option value="10k-50k">₹10K - ₹50K</option>
                <option value="50k-100k">₹50K - ₹100K</option>
                <option value="over100k">Over ₹100K</option>
              </select>
            </div>

            {/* Tech Filter */}
            <div className="pp-filter-group">
              <label className="pp-filter-label">
                Tech
              </label>
              <input
                type="text"
                placeholder="e.g., React, Python"
                value={techFilter}
                onChange={(e) => setTechFilter(e.target.value)}
                className="pp-tech-input"
              />
            </div>

            {/* Sort By */}
            <div className="pp-filter-group">
              <label className="pp-filter-label">
                <span className="pp-filter-icon">↕️</span>
                Sort By
              </label>
              <select 
                className="pp-filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="views">Views</option>
                <option value="dateAdded">Date Added</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="pp-view-toggle">
              <button 
                className={`pp-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <span className="pp-view-icon">⊞</span>
                Grid
              </button>
              <button 
                className={`pp-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <span className="pp-view-icon">☰</span>
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Bar - Modern Startup Marketplace */}






      {/* Trending Section with Scrolling Animation */}
      {activeTab === 'projects' && trendingProjects.length > 0 && (
        <div className="pp-trending-section">
          <h2><TrendingIcon /> Trending Projects</h2>
          <div className="pp-trending-scroll">
            <div className="pp-trending-scroll-content">
              {trendingProjects.map(project => (
                <div key={project._id} className="pp-trending-card">
                  <div className="pp-trending-image">
                    <img 
                      src={project.imageUrl || generateProjectImage(project)} 
                      alt={project.title}
                      onError={(e) => {
                        // If screenshot fails, fall back to enhanced placeholder
                        e.target.src = generatePlaceholder(project.title, 'project', project.category);
                      }}
                    />
                    <div className="pp-trending-badge">🔥 Trending</div>
                  </div>
                  <div className="pp-trending-content">
                    <h3>{project.title}</h3>
                    <p>{project.shortDescription}</p>
                    <div className="pp-trending-meta">
                      <div className="pp-trending-rating">
                        <StarIcon /> {project.rating.toFixed(1)}
                      </div>
                      <div className="pp-trending-views">
                        <EyeIcon /> {project.views}
                      </div>
                      <div className="pp-trending-price">
                        ₹{project.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    {project.externalLink && (
                      <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="pp-external-link">
                        <LinkIcon /> Visit Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ideas' && trendingIdeas.length > 0 && (
        <div className="pp-trending-section">
          <h2><LightbulbIcon /> Trending Ideas</h2>
          <div className="pp-trending-scroll">
            <div className="pp-trending-scroll-content">
              {trendingIdeas.map(idea => (
                <div key={idea._id} className="pp-trending-card pp-idea-card">
                  <div className="pp-idea-image">
                    <img 
                      src={idea.imageUrl || generatePlaceholder(idea.title, 'idea', idea.category)} 
                      alt={idea.title}
                      onError={(e) => {
                        e.target.src = generatePlaceholder(idea.title, 'idea', idea.category);
                      }}
                    />
                    <div className="pp-trending-badge pp-idea-badge">💡 Trending</div>
                  </div>
                  <div className="pp-idea-content">
                    <h3>{idea.title}</h3>
                    <p>{idea.description.substring(0, 120)}...</p>
                    <div className="pp-idea-meta">
                      <span className="pp-category">{idea.category}</span>
                      <div className="pp-idea-stats">
                        <span><HeartIcon /> {idea.likes}</span>
                        <span><EyeIcon /> {idea.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="pp-results-summary">
        <p>
          Showing {activeTab === 'projects' ? filteredAndSortedProjects.length : filteredAndSortedIdeas.length} {activeTab}
          {quickFilters.length > 0 && ` (filtered by ${quickFilters.join(', ')})`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="pp-content-grid">
        {activeTab === 'projects' ? (
          // Projects Grid
          filteredAndSortedProjects.map(project => (
            <div key={project._id} className="pp-project-card" onClick={() => handleProjectView(project._id)}>
              <div className="pp-project-image">
                <img 
                  src={project.imageUrl || generateProjectImage(project)} 
                  alt={project.title}
                  onError={(e) => {
                    // If screenshot fails, fall back to enhanced placeholder
                    e.target.src = generatePlaceholder(project.title, 'project', project.category);
                  }}
                />
                
                {/* Wishlist Button */}
                <button 
                  className="pp-wishlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Implement wishlist functionality
                  }}
                >
                  ♡
                </button>
                
                {/* Product Badges */}
                <div className="pp-product-badges">
                  {project.trending && <span className="pp-badge pp-badge-featured">🔥 Trending</span>}
                  {project.isNew && <span className="pp-badge pp-badge-new">New</span>}
                  {project.discount && <span className="pp-badge pp-badge-sale">{project.discount}% OFF</span>}
                </div>
                
                {/* Stock Status */}
                <div className={`pp-stock-status ${project.stockStatus || 'in-stock'}`}>
                  {project.stockStatus === 'out-of-stock' ? 'Out of Stock' : 
                   project.stockStatus === 'low-stock' ? 'Low Stock' : 'In Stock'}
                </div>
                

              </div>
              
              <div className="pp-project-content">
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
                
                {/* Price Container with Original Price and Discount */}
                <div className="pp-price-container">
                  <span className="pp-price">₹{project.price.toLocaleString('en-IN')}</span>
                  {project.originalPrice && project.originalPrice > project.price && (
                    <>
                      <span className="pp-original-price">₹{project.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="pp-discount">
                        {Math.round(((project.originalPrice - project.price) / project.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
                
                <div className="pp-project-meta">
                  <span className="pp-category">{project.category}</span>
                  <div className="pp-rating">
                    <StarIcon /> {project.rating.toFixed(1)}
                  </div>
                </div>
                
                <div className="pp-project-stats">
                  <span><EyeIcon /> {project.views}</span>
                  <div className="pp-user-rating">
                    <span className="pp-rating-label">Rate this:</span>
                    <div className="pp-star-rating">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          className={`pp-star-btn ${userRatings[project._id] >= star ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUserRating(project._id, star);
                          }}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="pp-project-actions">
                  <button
                    className="pp-add-to-cart-btn-small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(project);
                    }}
                  >
                    🛒 Add to Cart
                  </button>
                  {project.externalLink && (
                    <a 
                      href={project.externalLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="pp-visit-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LinkIcon /> Visit
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          // Ideas Grid
          filteredAndSortedIdeas.map(idea => (
            <div key={idea._id} className="pp-idea-card">
              <div className="pp-idea-image">
                <img 
                  src={idea.imageUrl || generatePlaceholder(idea.title, 'idea', idea.category)} 
                  alt={idea.title}
                  onError={(e) => {
                    e.target.src = generatePlaceholder(idea.title, 'idea', idea.category);
                  }}
                />
                {idea.trending && <div className="pp-trending-indicator">💡</div>}
                <div className={`pp-difficulty-badge ${idea.difficulty.toLowerCase()}`}>
                  {idea.difficulty}
                </div>
              </div>
              <div className="pp-idea-content">
                <h3>{idea.title}</h3>
                <p>{idea.description.substring(0, 120)}...</p>

                <div className="pp-idea-details">
                  <div className="pp-idea-problem">
                    <strong>Problem:</strong> {idea.problem.substring(0, 80)}...
                  </div>
                  <div className="pp-idea-solution">
                    <strong>Solution:</strong> {idea.solution.substring(0, 80)}...
                  </div>
                </div>

                <div className="pp-idea-meta">
                  <span className="pp-category">{idea.category}</span>
                  <div className="pp-idea-stats">
                    <span><HeartIcon /> {idea.likes}</span>
                    <span><EyeIcon /> {idea.views}</span>
                  </div>
                </div>

                <div className="pp-idea-info">
                  <div className="pp-idea-cost">
                    <strong>Cost:</strong> ₹{idea.estimatedCost.toLocaleString('en-IN')}
                  </div>
                  <div className="pp-idea-timeline">
                    <ClockIcon /> {idea.timeline}
                  </div>
                </div>

                <div className="pp-idea-tags">
                  {idea.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="pp-tag">{tag}</span>
                  ))}
                </div>

                <div className="pp-idea-actions">
                  <button
                    className="pp-like-btn"
                    onClick={() => handleLikeIdea(idea._id)}
                  >
                    <HeartIcon /> Like
                  </button>
                  <button className="pp-view-details-btn">
                    View Details
                  </button>
                </div>

                <div className="pp-idea-author">
                  By {idea.author}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty State */}
      {((activeTab === 'projects' && filteredAndSortedProjects.length === 0) ||
        (activeTab === 'ideas' && filteredAndSortedIdeas.length === 0)) && (
        <div className="pp-empty-state">
          <h3>No {activeTab} found</h3>
          <p>Try adjusting your filters or check back later for new content.</p>
          <button onClick={clearAllFilters}>Clear Filters</button>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;