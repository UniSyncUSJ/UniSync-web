import React, { useRef, useState } from "react";
import {
  BookOpen,
  Calendar,
  Users,
  Bell,
  ArrowRight,
  User,
  Shield,
} from "lucide-react";
import styles from "./landingPage.module.scss";
import Modal from "../../components/common/modal/Modal";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/landingPage/Footer";
import FloatingCardsSection from "../../components/landingPage/FloatingCardsSection";
import FeatureCard from "../../components/landingPage/FeatureCard";

type ModalHandle = {
  open: () => void;
  close: () => void;
};

const UniSyncLanding = () => {
  const modal = useRef<ModalHandle | null>(null);
  const [authMode, setAuthMode] = useState("signin"); // 'login' or 'signup'
  const [showUserType, setShowUserType] = useState(false);

  const openModal = (mode: React.SetStateAction<string>) => {
    setAuthMode(mode);
    setShowUserType(true);
    modal.current?.open();
  };

  const AuthModal = () => {
    return <Modal ref={modal}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h3>Choose Account Type</h3>
          <p>Are you a student or representing an organization?</p>

          <div className={styles.userTypeOptions}>
            <Link to={`student/signin`} className={styles.userTypeBtn}>
              <User size={24} />
              <span>Student</span>
              <p>Access events, updates, and academic resources</p>
            </Link>

            <Link to={`admin/signin`} className={styles.userTypeBtn}>
              <Shield size={24} />
              <span>Organization Admin</span>
              <p>Manage events, send updates, and organize activities</p>
            </Link>
          </div>

          <button
            className={styles.closeModal}
            onClick={() => modal.current?.close()}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  }

  return (
    <div className={styles.container}>
      <Header isAuthenticated={false} />

      {AuthModal()}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Stay Connected with Your
            <span className={styles.highlight}> University Life</span>
          </h1>
          <p className={styles.heroDescription}>
            UniSync brings together all your university events, academic
            updates, and campus notifications in one seamless platform. Never
            miss what matters most to your student journey.
          </p>
          <div className={styles.heroActions}>
            <button
              className={styles.ctaButton}
              onClick={() => openModal("signup")}
            >
              Get Started Free
              <ArrowRight size={20} />
            </button>
            <a href="#features" className={styles.learnMore}>
              Learn More
            </a>
          </div>
        </div>

        <FloatingCardsSection />
      </section>

      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Everything You Need in One Place</h2>
          <p>Powerful features designed for modern university life</p>
        </div>

        <div className={styles.featureGrid}>
          <FeatureCard 
            icon={Calendar} 
            title="Event Management" 
            description="Discover, track, and never miss important university events, seminars, and activities."
          />

          <FeatureCard 
            icon={Bell} 
            title="Real-time Updates" 
            description="Get instant notifications about academic deadlines, schedule
              changes, and announcements."
          />

          <FeatureCard 
            icon={BookOpen} 
            title="Academic Tracking" 
            description="Stay on top of your coursework, assignments, and academic progress
              with smart reminders."
          />

          <FeatureCard 
            icon={Users} 
            title="Community Connect" 
            description="Connect with classmates, join study groups, and participate in
              campus communities."
          />

          <FeatureCard 
            icon={Users} 
            title="Achievement Tracking" 
            description="Monitor your academic milestones and celebrate your university
              achievements."
          />

          <FeatureCard 
            icon={Users} 
            title="Admin Dashboard" 
            description="Comprehensive tools for organizations to manage events and
              communicate with students."
          />
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Your University Experience?</h2>
          <p>
            Join thousands of students already using UniSync to stay organized
            and connected.
          </p>

          <button
            className={styles.ctaButton}
            onClick={() => openModal("signup")}
          >
            Start Your Journey
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    
    <Footer />
    </div>
  );
};

export default UniSyncLanding;
