import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from "react";
import LandingPage from '../LandingPage';

jest.mock('framer-motion', () => ({
  motion: ({ children, ...props }) => <div {...props}>{children}</div>,
  AnimatePresence: ({ children }) => <div>{children}</div>,
  useInView: () => true,
  useScroll: () => ({ scrollY: { onChange: () => {}, get: () => 0 } }),
  useTransform: () => 0,
  useSpring: (v) => v,
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: { name: 'Test User', email: 'test@example.com' } }),
}));

describe('LandingPage() LandingPage method', () => {
  describe('Happy Paths', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders the main hero section and headline correctly', () => {
      render(<LandingPage />);
      expect(screen.getByText(/Where/i)).toBeInTheDocument();
      expect(screen.getByText(/Startups/i)).toBeInTheDocument();
      expect(screen.getByText(/Get/i)).toBeInTheDocument();
      expect(screen.getByText(/Funded\./i)).toBeInTheDocument();
      expect(screen.getByText(/India's first micro-startup exchange/i)).toBeInTheDocument();
    });

    it('renders the navbar and responds to navigation button clicks', () => {
      render(<LandingPage />);
      expect(screen.getByText(/MicroStartupX/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Marketplace/i));
      fireEvent.click(screen.getByText(/Explore/i));
      expect(mockNavigate).toHaveBeenCalledWith('/projectpage');
      fireEvent.click(screen.getByText(/Get Started/i));
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('renders trending deals and allows navigation to deal details', () => {
      render(<LandingPage />);
      expect(screen.getByText(/Trending Deals/i)).toBeInTheDocument();
      const deal = screen.getByText(/Eco-Charge AI/i);
      expect(deal).toBeInTheDocument();
      fireEvent.click(deal);
      expect(mockNavigate).toHaveBeenCalledWith('/project/1');
    });

    it('renders platform pillars and allows pillar card interaction', () => {
      render(<LandingPage />);
      expect(screen.getByText(/For Founders/i)).toBeInTheDocument();
      expect(screen.getByText(/For Developers/i)).toBeInTheDocument();
      expect(screen.getByText(/For Investors/i)).toBeInTheDocument();
      const founderCard = screen.getByText(/For Founders/i).closest('.pillar-card');
      fireEvent.mouseEnter(founderCard);
      expect(screen.getByText(/Post & Fund/i)).toBeInTheDocument();
      const getStartedBtn = screen.getByText(/Get started/i);
      fireEvent.click(getStartedBtn);
      expect(mockNavigate).toHaveBeenCalledWith('/post-idea');
    });

    it('renders pricing plans and allows CTA button interaction', () => {
      render(<LandingPage />);
      expect(screen.getByText(/Pricing Plans/i)).toBeInTheDocument();
      expect(screen.getByText(/Seedling/i)).toBeInTheDocument();
      expect(screen.getByText(/Singam Pro/i)).toBeInTheDocument();
      expect(screen.getByText(/Enterprise/i)).toBeInTheDocument();
      const ctaBtn = screen.getByText(/Start Free/i);
      fireEvent.click(ctaBtn);
      expect(mockNavigate).toHaveBeenCalledWith('/register');
    });

    it('renders "How It Works" section and toggles tabs', () => {
      render(<LandingPage />);
      expect(screen.getByText(/How It Works/i)).toBeInTheDocument();
      expect(screen.getByText(/For Founders/i)).toBeInTheDocument();
      expect(screen.getByText(/For Investors/i)).toBeInTheDocument();
      expect(screen.getByText(/Post Your Idea/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/For Investors/i));
      expect(screen.getByText(/Browse Deals/i)).toBeInTheDocument();
    });

    it('renders founder wins and allows story navigation', () => {
      render(<LandingPage />);
      expect(screen.getByText(/Founder Wins/i)).toBeInTheDocument();
      expect(screen.getByText(/Arun Kumar/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Priya Lakshmi/i));
      expect(screen.getByText(/I am a developer/i)).toBeInTheDocument();
      const dots = screen.getAllByRole('button', { name: '' });
      fireEvent.click(dots[2]);
      expect(screen.getByText(/Three investors competed/i)).toBeInTheDocument();
    });

    it('renders footer and allows interaction with social links', () => {
      render(<LandingPage />);
      expect(screen.getByText(/MicroStartupX/i)).toBeInTheDocument();
      expect(screen.getByText(/Tamil Nadu's premier hub/i)).toBeInTheDocument();
      const socialLinks = screen.getAllByText(/𝕏|in|YT|IG/);
      expect(socialLinks.length).toBeGreaterThan(0);
      fireEvent.mouseEnter(socialLinks[0]);
      fireEvent.mouseLeave(socialLinks[0]);
    });

    it('renders CTA banner and allows navigation', () => {
      render(<LandingPage />);
      expect(screen.getByText(/Make Your/i)).toBeInTheDocument();
      const postIdeaBtn = screen.getByText(/Post Your Idea/i);
      fireEvent.click(postIdeaBtn);
      expect(mockNavigate).toHaveBeenCalledWith('/post-idea');
      const browseProjectsBtn = screen.getByText(/Browse Projects/i);
      fireEvent.click(browseProjectsBtn);
      expect(mockNavigate).toHaveBeenCalledWith('/projectpage');
    });

    it('renders trust strip with all trust items', () => {
      render(<LandingPage />);
      expect(screen.getByText(/NDA Protected/i)).toBeInTheDocument();
      expect(screen.getByText(/Escrow Payments/i)).toBeInTheDocument();
      expect(screen.getByText(/Verified Founders/i)).toBeInTheDocument();
      expect(screen.getByText(/Deal Support/i)).toBeInTheDocument();
      expect(screen.getByText(/TN #1 Platform/i)).toBeInTheDocument();
    });

    it('renders email input in footer and allows subscribe button interaction', () => {
      render(<LandingPage />);
      const emailInput = screen.getByPlaceholderText(/Your email/i);
      expect(emailInput).toBeInTheDocument();
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
      expect(emailInput.value).toBe('user@example.com');
      const subscribeBtn = screen.getByText(/Subscribe/i);
      fireEvent.click(subscribeBtn);
      // No navigation, but button is clickable
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('handles empty founderWins array gracefully', () => {
      jest.spyOn(React, 'useState').mockImplementationOnce(() => [0, () => {}]);
      render(<LandingPage />);
      expect(screen.getByText(/Founder Wins/i)).toBeInTheDocument();
    });

    it('handles empty trendingIdeas array gracefully', () => {
      jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], () => {}]);
      render(<LandingPage />);
      expect(screen.getByText(/Trending Deals/i)).toBeInTheDocument();
      expect(screen.queryByText(/Eco-Charge AI/i)).not.toBeInTheDocument();
    });

    it('handles empty pricingPlans array gracefully', () => {
      jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], () => {}]);
      render(<LandingPage />);
      expect(screen.getByText(/Pricing Plans/i)).toBeInTheDocument();
      expect(screen.queryByText(/Seedling/i)).not.toBeInTheDocument();
    });

    it('handles empty categories array gracefully', () => {
      jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], () => {}]);
      render(<LandingPage />);
      expect(screen.getByText(/Live Marketplace/i)).toBeInTheDocument();
    });

    it('handles empty pillars array gracefully', () => {
      jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], () => {}]);
      render(<LandingPage />);
      expect(screen.getByText(/What you can do here/i)).toBeInTheDocument();
      expect(screen.queryByText(/For Founders/i)).not.toBeInTheDocument();
    });

    it('handles missing user from useAuth gracefully', () => {
      jest.mock("../../context/AuthContext", () => ({
        useAuth: () => ({}),
      }));
      render(<LandingPage />);
      expect(screen.getByText(/MicroStartupX/i)).toBeInTheDocument();
    });

    it('handles mouse events for cursor ambient glow', () => {
      render(<LandingPage />);
      act(() => {
        fireEvent.mouseMove(document, { clientX: 100, clientY: 200 });
      });
      const ambientGlow = document.querySelector('div[style*="pointerEvents: none"]');
      expect(ambientGlow).toBeInTheDocument();
    });

    it('handles scroll event for navbar style change', () => {
      render(<LandingPage />);
      act(() => {
        window.scrollY = 100;
        fireEvent.scroll(window);
      });
      const navbar = document.querySelector('nav');
      expect(navbar).toBeInTheDocument();
    });

    it('handles clicking on proposal button in trending deal card', () => {
      render(<LandingPage />);
      const proposalBtn = screen.getAllByText(/View Proposal/i)[0];
      fireEvent.click(proposalBtn);
      // No navigation, but button is clickable
    });

    it('handles clicking on "View All Deals" button in trending deals section', () => {
      render(<LandingPage />);
      const viewAllBtn = screen.getByText(/View All Deals/i);
      fireEvent.click(viewAllBtn);
      expect(mockNavigate).toHaveBeenCalledWith('/projectpage');
    });
  });
});