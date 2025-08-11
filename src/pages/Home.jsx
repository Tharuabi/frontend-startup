import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../style/Home.css';

// Import local images
import featuredImage1 from '../assets/home5.jpg';
import featuredImage2 from '../assets/image2.jpg.jpg';
import featuredImage3 from '../assets/image3.jpg';
import userImage from '../assets/user.jpg';
import user1Image from '../assets/user1.jpg';
import user2Image from '../assets/user2.jpg';
import user3Image from '../assets/user3.jpg';
import user4Image from '../assets/user4.jpg';
import image2Image from '../assets/image2.jpg.jpg';

// Enhanced Icons with better styling
const StarIcon = () => <span className="icon-rating">★</span>;
const HeartIcon = () => <span className="icon-like">♥</span>;
const ArrowIcon = () => <span className="arrow-icon">→</span>;
const RocketIcon = () => <span className="rocket-icon">🚀</span>;
const SparkleIcon = () => <span className="sparkle-icon">✨</span>;

const dummyFeaturedProjects = [
  {
    id: '1',
    title: 'Recipe Finder App',
    description: 'An app to discover recipes and meal ideas with user ratings and favorites. Explore thousands of culinary delights from around the globe.',
    price: '$350',
    category: 'App',
    techStack: ['React', 'Node.js', 'MongoDB', 'API'],
    image: featuredImage1,
    rating: 4.8,
    likes: 215,
    featured: true,
  },
  {
    id: '2',
    title: 'Productivity MVP', 
    description: 'A minimalistic task management app with reminders and deadlines. Perfect for personal productivity or small team task management.',
    price: '$150',
    category: 'MVP',
    techStack: ['Vue.js', 'Firebase'],
    image: featuredImage2,
    rating: 4.5,
    likes: 120,
    featured: true,
  },
  {
    id: '3',
    title: 'ClipShare Social', 
    description: 'A social media platform focused on sharing short video clips. Engage with a vibrant community and showcase your creativity.',
    price: '$500',
    category: 'App',
    techStack: ['Next.js', 'Express', 'PostgreSQL'],
    image: featuredImage3,
    rating: 4.2,
    likes: 350,
    featured: true,
  },
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const dummyExploreProjectsData = [
    {
      id: 'ex1',
      title: 'Modern E-commerce Store', 
      price: '$1250',
      category: 'eCommerce',
      techStack: ['Shopify', 'Liquid', 'JS'],
      description: 'A fully functional e-commerce store template for modern brands. Easily customizable and scalable for your business needs.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=70', 
      rating: 4.9,
      likes: 480,
    },
    {
      id: 'ex2',
      title: 'SaaS Dashboard Kit', 
      price: '$800',
      category: 'SaaS',
      techStack: ['Node.js', 'React', 'Stripe'],
      description: 'A starter kit for building subscription-based software products quickly. Includes authentication, payments, and more.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=70', 
      rating: 4.7,
      likes: 190,
    },
    {
      id: 'ex3',
      title: 'Travel Blog Theme',
      price: '$220',
      category: 'Website',
      techStack: ['WordPress', 'PHP', 'CSS'],
      description: 'A beautiful and responsive theme for travel bloggers and content creators. SEO optimized and easy to use.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=70', 
      rating: 4.6,
      likes: 155,
    },
  ];

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="home-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section with Enhanced Design */}
      <motion.section 
        className="hero-section"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Background Elements */}
        <div className="hero-background" style={{ display: 'none' }}>
          <motion.div 
            className="floating-shape shape-1"
            variants={floatingAnimation}
            animate="animate"
          />
          <motion.div 
            className="floating-shape shape-2"
            variants={floatingAnimation}
            animate="animate"
            style={{ animationDelay: '1s' }}
          />
          <motion.div 
            className="floating-shape shape-3"
            variants={floatingAnimation}
            animate="animate"
            style={{ animationDelay: '2s' }}
          />
          <div className="gradient-overlay" />
        </div>

        <div className="hero-content">
          <motion.div 
            className="hero-badge"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <SparkleIcon />
            <span>Join 50,000+ Entrepreneurs Worldwide</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            variants={itemVariants}
          >
            Build Your <span className="gradient-text">Dream Startup</span> in Minutes
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            variants={itemVariants}
          >
            Skip the coding, skip the design, skip the months of development. 
            Launch your next big idea with ready-to-deploy startup projects from successful entrepreneurs.
          </motion.p>

          <motion.div 
            className="hero-stats"
            variants={itemVariants}
          >
            <div className="stat-item">
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
              >
                1,200+
              </motion.div>
              <div className="stat-label">Projects Launched</div>
            </div>
            <div className="stat-item">
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              >
                $5M+
              </motion.div>
              <div className="stat-label">Revenue Generated</div>
            </div>
            <div className="stat-item">
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
              >
                99%
              </motion.div>
              <div className="stat-label">Success Rate</div>
            </div>
          </motion.div>

          <motion.div 
            className="hero-actions"
            variants={itemVariants}
          >
            <motion.div
              className="primary-action"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/projectpage" className="hero-btn hero-btn-primary">
                <RocketIcon />
                <span>Browse Projects</span>
                <ArrowIcon />
              </Link>
            </motion.div>
            
            <motion.div
              className="secondary-action"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/add-project" className="hero-btn hero-btn-secondary">
                <span>Sell Your Project</span>
                <SparkleIcon />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-scroll-indicator"
            variants={itemVariants}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="scroll-arrow">↓</div>
            <span>Scroll to explore</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Projects Section */}
      <motion.section 
        className="featured-section"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-header">
          <motion.div 
            className="section-badge"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SparkleIcon />
            <span>Featured Projects</span>
          </motion.div>
          
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Handpicked <span className="gradient-text">Success Stories</span>
          </motion.h2>
          
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover our most successful and innovative startup projects
          </motion.p>
        </div>

        <motion.div 
          className="featured-grid"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {dummyFeaturedProjects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className={`featured-card ${project.featured ? 'featured' : ''}`}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(project.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="card-badge">
                <SparkleIcon />
                <span>Featured</span>
              </div>
              
              <div className="card-image-wrapper">
                <img src={project.image} alt={project.title} className="card-image"/>
                <div className="card-overlay">
                  <motion.div
                    className="overlay-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredCard === project.id ? 1 : 0,
                      y: hoveredCard === project.id ? 0 : 20
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/project/${project.id}`} className="overlay-btn">
                      View Details
                    </Link>
                  </motion.div>
                </div>
              </div>

              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{project.title}</h3>
                  <div className="card-price">{project.price}</div>
                </div>
                
                <p className="card-description">{project.description}</p>
                
                <div className="card-tech">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="card-metrics">
                  <div className="metric">
                    <StarIcon />
                    <span>{project.rating}</span>
                  </div>
                  <div className="metric">
                    <HeartIcon />
                    <span>{project.likes}</span>
                  </div>
                </div>

                <motion.div 
                  className="card-action"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={`/project/${project.id}`} className="card-btn">
                    <span>Explore Project</span>
                    <ArrowIcon />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Explore Projects Section */}
      <motion.section 
        className="explore-section"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Explore <span className="gradient-text">All Projects</span>
          </motion.h2>
          
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Browse through our extensive collection of startup projects
          </motion.p>
        </div>

        <motion.div 
          className="explore-grid"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {dummyExploreProjectsData.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="explore-card"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="card-image-wrapper">
                <img src={project.image} alt={project.title} className="card-image"/>
                <div className="card-overlay">
                  <motion.div
                    className="overlay-content"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/project/${project.id}`} className="overlay-btn">
                      View Details
                    </Link>
                  </motion.div>
                </div>
              </div>

              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{project.title}</h3>
                  <div className="card-price">{project.price}</div>
                </div>
                
                <p className="card-description">{project.description}</p>
                
                <div className="card-tech">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="card-metrics">
                  <div className="metric">
                    <StarIcon />
                    <span>{project.rating}</span>
                  </div>
                  <div className="metric">
                    <HeartIcon />
                    <span>{project.likes}</span>
                  </div>
                </div>

                <motion.div 
                  className="card-action"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={`/project/${project.id}`} className="card-btn">
                    <span>Explore Project</span>
                    <ArrowIcon />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="explore-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/projectpage" className="cta-btn">
              <span>View All Projects</span>
              <ArrowIcon />
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Success Stories Section */}
      <motion.section
        className="success-stories-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="section-badge">
              <SparkleIcon />
              <span>Success Stories</span>
            </div>
            <h2>From Idea to <span className="gradient-text">$1M+ Revenue</span></h2>
            <p>Real entrepreneurs who turned our projects into thriving businesses</p>
          </motion.div>
          
          <motion.div
            className="success-grid"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="success-card"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="success-avatar">
                <img src={userImage} alt="Sarah Chen" />
              </div>
              <div className="success-content">
                <h3>Sarah Chen</h3>
                <p className="success-role">Founder, RecipeHub</p>
                <p className="success-quote">"Bought a recipe app template for $350, launched in 2 weeks, now generating $15K/month in subscriptions."</p>
                <div className="success-metrics">
                  <span>Revenue: $180K/year</span>
                  <span>Users: 25K+</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="success-card"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="success-avatar">
                <img src={user1Image} alt="Marcus Rodriguez" />
              </div>
              <div className="success-content">
                <h3>Marcus Rodriguez</h3>
                <p className="success-role">CEO, TaskFlow Pro</p>
                <p className="success-quote">"Started with a productivity MVP, scaled to 50+ enterprise clients. Best $150 investment ever made."</p>
                <div className="success-metrics">
                  <span>Revenue: $2.5M/year</span>
                  <span>Clients: 50+</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="success-card"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="success-avatar">
                <img src={user2Image} alt="Emma Thompson" />
              </div>
              <div className="success-content">
                <h3>Emma Thompson</h3>
                <p className="success-role">Founder, ClipShare</p>
                <p className="success-quote">"The social video platform template was exactly what I needed. Now we're competing with TikTok in our niche."</p>
                <div className="success-metrics">
                  <span>Revenue: $800K/year</span>
                  <span>Users: 100K+</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;