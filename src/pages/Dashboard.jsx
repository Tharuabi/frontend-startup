import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Dashboard.css'; // We will create/update this CSS file

// --- ICONS --- (Using emojis that roughly match the image's intent)
const IconProjectsUploaded = () => <span className="dash-icon-custom">📊</span>; // Bar chart for projects
const IconTotalEarnings = () => <span className="dash-icon-custom">💰</span>;  // Money bag
const IconTotalViews = () => <span className="dash-icon-custom">👁️</span>;     // Eye
const IconTotalLikes = () => <span className="dash-icon-custom">❤️</span>;     // Heart
const IconTotalInquiries = () => <span className="dash-icon-custom">💬</span>; // Speech bubble

// Generic icons (can be kept or replaced if you have a proper icon library)
const IconProjects = () => <span className="dash-icon">📊</span>;
const IconEarnings = () => <span className="dash-icon">💰</span>;
const IconUsers = () => <span className="dash-icon">👥</span>;
const IconPerformance = () => <span className="dash-icon">📈</span>;
const IconNotification = () => <span className="dash-icon">🔔</span>;

const IconEdit = () => <span className="dash-action-icon">✏️</span>;
const IconDelete = () => <span className="dash-action-icon">🗑️</span>;
const IconAdd = () => <span className="dash-action-icon">➕</span>;
const IconProfile = () => <span className="dash-action-icon">👤</span>;
const IconPurchases = () => <span className="dash-action-icon">🛒</span>;
const IconApprove = () => <span className="dash-action-icon">✔️</span>;
const IconReject = () => <span className="dash-action-icon">❌</span>;
const IconViewDetails = () => <span className="dash-action-icon">📄</span>;


// --- DUMMY DATA ---
const dummyCurrentUserData = {
  id: 'user123',
  name: 'Alex Developer',
  role: 'user', // Can be 'user' or 'admin'
};

const initialUserProjectsData = [
  // Match the number of projects in the image and their status for accurate styling
  { id: 'p1', title: 'EcoFriendly Marketplace', status: 'Approved', price: 1200, views: 12100, likes: 250, inquiries: 15, earnings: 1100, isSold: true },
  { id: 'p2', title: 'AI Fitness Coach', status: 'Approved', price: 950, views: 5200, likes: 180, inquiries: 8, earnings: 0, isSold: false },
  { id: 'p4', title: 'Indie Game MVP', status: 'Pending', price: 250, views: 1100, likes: 45, inquiries: 2, earnings: 0, isSold: false },
  // Add more if they appear below the fold in your image
];

// Updated to reflect the 5 stats from the image
const userStatsDataFromImage = {
  projectsUploaded: 4,      // From image
  totalEarnings: 1100,    // From image
  totalViews: 18750,      // From image
  totalLikes: 485,        // From image
  totalInquiries: 26,       // From image
};


const allMarketplaceProjectsData = [
  ...initialUserProjectsData,
  { id: 'p5', userId: 'user456', userName: 'Jane Designer', title: 'Portfolio Website Template', status: 'Approved', price: 150, views: 8000, likes: 190, inquiries: 10, dateListed: '2023-09-20', earnings: 130, isSold: true },
  { id: 'p6', userId: 'user789', userName: 'Mike Coder', title: 'Task Management App', status: 'Pending', price: 400, views: 500, likes: 20, inquiries: 0, dateListed: '2023-12-05', earnings: 0, isSold: false },
];

const dummyAdminStats = {
  totalProjectsSubmitted: allMarketplaceProjectsData.length,
  totalUsers: 150,
  activeUsers: 120,
  overallSales: allMarketplaceProjectsData.reduce((sum, p) => sum + (p.isSold ? p.price : 0), 0),
  marketplaceEarnings: allMarketplaceProjectsData.reduce((sum, p) => sum + (p.isSold ? p.price * 0.1 : 0), 0),
  pendingApprovalCount: allMarketplaceProjectsData.filter(p => p.status === 'Pending').length,
};


const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(dummyCurrentUserData);
  const [userProjects, setUserProjects] = useState(initialUserProjectsData);
  const [userStats, setUserStats] = useState(userStatsDataFromImage);
  const [allProjects, setAllProjects] = useState(allMarketplaceProjectsData);
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const toggleRole = () => {
    setCurrentUser(prev => ({
      ...prev,
      role: prev.role === 'user' ? 'admin' : 'user'
    }));
    if (currentUser.role === 'admin') {
      setUserStats(userStatsDataFromImage);
    }
  };

  const handleDeleteProject = (projectId, projectTitle) => {
    if (window.confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
      if (currentUser.role === 'user') {
        setUserProjects(current => current.filter(p => p.id !== projectId));
        setAllProjects(current => current.filter(p => p.id !== projectId));
      } else if (currentUser.role === 'admin') {
        setAllProjects(current => current.filter(p => p.id !== projectId));
      }
      console.log(`Project ${projectId} deleted.`);
    }
  };

  const handleEditProject = (projectId) => navigate(`/edit-project/${projectId}`);

  const handleProjectApproval = (projectId, newStatus) => {
    if (currentUser.role === 'admin') {
      setAllProjects(current =>
        current.map(p =>
          p.id === projectId ? { ...p, status: newStatus } : p
        )
      );
      console.log(`Project ${projectId} status changed to ${newStatus}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="dashboard-root">
      {/* Top Bar */}
      <div className="dashboard-topbar">
        <div className="dashboard-welcome">
          <h1 className="dashboard-welcome-title">
            Welcome back, <span className="dashboard-user-name">{currentUser.name}</span>! 👋
          </h1>
          <p className="dashboard-welcome-desc">
            Here's what's happening with your projects today.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="dashboard-stats-row">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">📊</div>
          <div className="dashboard-stat-value">{userStats.projectsUploaded}</div>
          <div className="dashboard-stat-label">Total Projects</div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">✅</div>
          <div className="dashboard-stat-value">{userProjects.filter(p => p.status === 'Approved').length}</div>
          <div className="dashboard-stat-label">Completed</div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">⏳</div>
          <div className="dashboard-stat-value">{userProjects.filter(p => p.status === 'Pending').length}</div>
          <div className="dashboard-stat-label">In Progress</div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">💰</div>
          <div className="dashboard-stat-value">₹{userStats.totalEarnings.toLocaleString()}</div>
          <div className="dashboard-stat-label">Revenue</div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="dashboard-projects">
        <div className="dashboard-projects-header">
          <h3>Recent Projects</h3>
          <div className="dashboard-action-buttons">
            <button
              className="dashboard-add-btn"
              onClick={() => setShowModal(true)}
            >
              + Add Project
            </button>
            <button
              className="dashboard-action-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔 Notifications
            </button>
          </div>
        </div>

        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userProjects.map((project, index) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>Web Development</td>
                  <td>
                    <span className={`dash-status-badge ${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>₹{project.price.toLocaleString()}</td>
                  <td>
                    <Link to="/projectpage" className="dashboard-action-btn">View</Link>
                    <button 
                      onClick={() => handleEditProject(project.id)} 
                      className="dashboard-action-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(project.id, project.title)} 
                      className="dashboard-action-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="dashboard-notifications-panel">
          <h4>Recent Notifications</h4>
          <div className="notification-item">
            <p>✅ Project "E-commerce Platform" has been approved!</p>
            <span>2 hours ago</span>
          </div>
          <div className="notification-item">
            <p>💰 Payment received for "Mobile App" project</p>
            <span>1 day ago</span>
          </div>
          <div className="notification-item">
            <p>📝 New project "AI Chatbot" added to your portfolio</p>
            <span>3 days ago</span>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showModal && (
        <div 
          className="modal-backdrop"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Add New Project</h3>
            <form>
              <label>Project Name</label>
              <input type="text" placeholder="Enter project name" />
              
              <label>Category</label>
              <select>
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>AI/ML</option>
                <option>E-commerce</option>
              </select>
              
              <label>Description</label>
              <textarea placeholder="Enter project description"></textarea>
              
              <label>Price</label>
              <input type="number" placeholder="Enter price" />
              
              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;