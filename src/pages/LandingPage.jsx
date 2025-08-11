import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import '../style/LandingPage.css';

// Import local user assets
import userImage from '../assets/user.jpg';
import user1Image from '../assets/user1.jpg';
import user2Image from '../assets/user2.jpg';
import user3Image from '../assets/user3.jpg';
import user4Image from '../assets/user4.jpg';
import image3Image from '../assets/image3.jpg';
import image2Image from '../assets/image2.jpg.jpg';

// Icons
const RocketIcon = () => <span className="icon">🚀</span>;
const ShieldIcon = () => <span className="icon">🛡️</span>;
const ZapIcon = () => <span className="icon">⚡</span>;
const UsersIcon = () => <span className="icon">👥</span>;
const CheckIcon = () => <span className="icon">✅</span>;
const StarIcon = () => <span className="icon">⭐</span>;
const ArrowUpIcon = () => <span className="icon">⬆️</span>;

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navbarHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const navbarOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Refs for smooth scrolling
  const pricingSectionRef = useRef(null);
  const trustedSectionRef = useRef(null);

  // Show notification on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("🎉 New AI-powered matching feature released!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'linear-gradient(135deg, #059669, #047857)',
          color: 'white',
          fontWeight: '500',
          fontSize: '0.875rem',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        },
      });
    }, 2000);

    // Make toast function globally available
    window.toast = toast;

    return () => {
      clearTimeout(timer);
      delete window.toast;
    };
  }, []);

  // Floating notification state
  const [showFloatingNotification, setShowFloatingNotification] = useState(true);

  // Auto-dismiss floating notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingNotification(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to pricing section
  const scrollToPricing = () => {
    pricingSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Handle button clicks with authentication check
  const handleActionButton = (action, targetPath) => {
    if (!user) {
      // Store the intended action in localStorage
      localStorage.setItem('intendedAction', action);
      localStorage.setItem('intendedPath', targetPath);
      navigate('/login');
      toast.info("Please login to continue", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      navigate(targetPath);
    }
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, TechFlow",
      image: userImage,
      text: "MicroStartupX helped us launch our MVP in record time. The platform is intuitive and the community is incredibly supportive.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO, InnovateLab",
      image: user1Image,
      text: "The quality of projects and the ease of finding investors exceeded our expectations. Highly recommended for any startup!",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Product Manager, GrowthCo",
      image: user2Image,
      text: "From idea to market in 3 months! The platform's tools and resources made all the difference in our journey.",
      rating: 5
    }
  ];

  // Auto-rotate testimonials - MOVED AFTER testimonials array
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const features = [
    {
      icon: <RocketIcon />,
      title: "Launch Faster",
      description: "Get your MVP to market in weeks, not months. Our streamlined process accelerates your startup journey."
    },
    {
      icon: <ShieldIcon />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime ensure your projects are always safe and accessible."
    },
    {
      icon: <ZapIcon />,
      title: "Lightning Fast",
      description: "Optimized performance and CDN distribution deliver blazing-fast loading times worldwide."
    },
    {
      icon: <UsersIcon />,
      title: "Global Community",
      description: "Connect with 50,000+ founders, investors, and developers from around the world."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "₹0",
      period: "month",
      description: "Perfect for getting started",
      features: [
        "Up to 3 projects",
        "Basic analytics",
        "Community support",
        "Standard templates"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "₹2,999",
      period: "month",
      description: "Ideal for single-page landing sites",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "Custom domains",
        "API access",
        "Team collaboration"
      ],
      cta: "Choose Your Plan",
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹9,999",
      period: "month",
      description: "For large-scale operations",
      features: [
        "Everything in Pro",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "Advanced security",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const handleStickyCTA = () => {
    toast.info("🚀 Redirecting to registration...", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <motion.div
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'relative',
        paddingTop: '70px', /* Account for fixed navbar */
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Floating Notification */}
      <AnimatePresence>
        {showFloatingNotification && (
          <motion.div
            className="floating-notification"
            initial={{ opacity: 0, x: 100, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="notification-content">
              <span className="notification-icon">🎉</span>
              <span className="notification-text">Welcome to MicroStartupX!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky CTA Button */}
      <motion.div
        className="sticky-cta"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          className="sticky-cta-btn"
          onClick={handleStickyCTA}
          animate={pulseAnimation}
        >
          <Link to="/register">Get Started</Link>
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Animated Background Blobs */}
        <div className="hero-bg-blobs">
          <motion.div
            className="blob blob-1"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="blob blob-2"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <motion.h1
              className="hero-title"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              Build the Future,
              <span className="gradient-text"> One Startup at a Time</span>
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              Connect with investors, launch your MVP, and scale your startup with our comprehensive platform.
              Join thousands of entrepreneurs who've turned their ideas into successful businesses.
            </motion.p>
            <motion.div
              className="hero-buttons"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                className="btn btn-primary enhanced-btn"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleActionButton('start-building', '/home')}
              >
                Start Building Projects
              </motion.button>
              <motion.button
                className="btn btn-secondary enhanced-btn"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleActionButton('explore', '/projectpage')}
              >
                Explore Projects
              </motion.button>
            </motion.div>
            <motion.div
              className="hero-stats"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="stat"
                whileHover={{ scale: 1.1 }}
              >
                <span className="stat-number">50,000+</span>
                <span className="stat-label">Active Users</span>
              </motion.div>
              <motion.div
                className="stat"
                whileHover={{ scale: 1.1 }}
              >
                <span className="stat-number">₹500M+</span>
                <span className="stat-label">Funding Raised</span>
              </motion.div>
              <motion.div
                className="stat"
                whileHover={{ scale: 1.1 }}
              >
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Startups Launched</span>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="hero-image"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
              alt="Team collaborating on startup project"
              animate={floatingAnimation}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Trusted by Founders Worldwide Section */}
      <motion.section
        className="trusted-section"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        ref={trustedSectionRef}
      >
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Trusted by Founders Worldwide</h2>
            <p>Join thousands of successful entrepreneurs who've built their dreams with MicroStartupX</p>
          </motion.div>
          <motion.div
            className="trusted-content"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="trusted-logos">
              <motion.div
                className="trusted-logo"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <img src={userImage} alt="Startup Founder 1" />
              </motion.div>
              <motion.div
                className="trusted-logo"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img src={user1Image} alt="Startup Founder 2" />
              </motion.div>
              <motion.div
                className="trusted-logo"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <img src={user2Image} alt="Startup Founder 3" />
              </motion.div>
              <motion.div
                className="trusted-logo"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <img src={user3Image} alt="Startup Founder 4" />
              </motion.div>
              <motion.div
                className="trusted-logo"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <img src={user4Image} alt="Startup Founder 5" />
              </motion.div>
              <motion.div
                className="trusted-logo"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <img src={image2Image} alt="Startup Founder 6" />
              </motion.div>

            </div>
            <div className="trusted-stats">
              <motion.div
                className="trusted-stat"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="trusted-stat-number">150+</div>
                <div className="trusted-stat-label">Countries</div>
              </motion.div>
              <motion.div
                className="trusted-stat"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="trusted-stat-number">25+</div>
                <div className="trusted-stat-label">Languages</div>
              </motion.div>
              <motion.div
                className="trusted-stat"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <div className="trusted-stat-number">98%</div>
                <div className="trusted-stat-label">Satisfaction Rate</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="features-section"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
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
            <h2>Why Choose MicroStartupX?</h2>
            <p>Everything you need to build, launch, and scale your startup</p>
          </motion.div>
          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card enhanced-card"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="feature-icon"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="testimonials-section"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
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
            <h2>Success Stories</h2>
            <p>See what our community has to say about their success</p>
          </motion.div>
          <motion.div
            className="testimonials-container"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                className="testimonial-card enhanced-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="testimonial-content">
                  <div className="stars">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <StarIcon />
                      </motion.span>
                    ))}
                  </div>
                  <p>"{testimonials[currentTestimonial].text}"</p>
                  <div className="testimonial-author">
                    <motion.img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <h4>{testimonials[currentTestimonial].name}</h4>
                      <span>{testimonials[currentTestimonial].role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        className="pricing-section"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        ref={pricingSectionRef}
      >
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Choose Your Plan</h2>
            <p>Start free and scale as you grow</p>
          </motion.div>
          <motion.div
            className="pricing-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`pricing-card enhanced-card ${plan.popular ? 'popular' : ''}`}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: plan.popular ? 1.08 : 1.02,
                  boxShadow: plan.popular
                    ? "0 25px 50px rgba(99, 102, 241, 0.3)"
                    : "0 25px 50px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                {plan.popular && (
                  <motion.div
                    className="popular-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Most Popular
                  </motion.div>
                )}
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                  <div className="price">
                    <span className="amount">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                  <p>{plan.description}</p>
                </div>
                <ul className="features-list">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <CheckIcon />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className={`btn enhanced-btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: plan.popular
                      ? "0 20px 40px rgba(99, 102, 241, 0.3)"
                      : "0 20px 40px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (plan.name === "Pro" && plan.cta === "Choose Your Plan") {
                      // Scroll to the Pro plan specifically
                      const proPlanElement = document.querySelector('.pricing-card.popular');
                      if (proPlanElement) {
                        proPlanElement.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'center'
                        });
                      }
                    } else {
                      handleActionButton('pricing', '/register');
                    }
                  }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="cta-section"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Build Your Startup?</h2>
            <p>Join thousands of entrepreneurs who've already launched their dreams</p>
            <motion.button
              className="btn btn-primary btn-large enhanced-btn"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActionButton('get-started', '/register')}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <motion.div
            className="footer-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="footer-section" variants={itemVariants}>
              <h3>MicroStartupX</h3>
              <p>Building the future, one startup at a time.</p>
              <div className="social-links">
                {['🐦', '💼', '📚', '💬'].map((icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    aria-label={`Social ${index + 1}`}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      backgroundColor: "var(--primary)"
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            <motion.div className="footer-section" variants={itemVariants}>
              <h4>Platform</h4>
              <ul>
                <li><Link to="/projectpage">Explore Projects</Link></li>
                <li><Link to="/investors">Find Investors</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/about">About Us</Link></li>
              </ul>
            </motion.div>
            <motion.div className="footer-section" variants={itemVariants}>
              <h4>Support</h4>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </motion.div>
            <motion.div className="footer-section" variants={itemVariants}>
              <h4>Resources</h4>
              <ul>
                <li><Link to="/guides">Startup Guides</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/api">API Docs</Link></li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 MicroStartupX. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
};
export default LandingPage;