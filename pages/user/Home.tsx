/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import {
  BookOpen,
  Calendar,
  Users,
  Bell,
  Award,
  ArrowRight,
  User,
  Shield,
} from "lucide-react";
import styles from "../../styles/Home.module.scss";
import Modal from "../../src/components/common/modal/Modal";
import { Link } from "react-router-dom";
type ModalHandle = {
  open: () => void;
  close: () => void;
};
const UniSyncLanding = () => {
  const modal = useRef<ModalHandle | null>(null);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [showUserType, setShowUserType] = useState(false);

  const openModal = (mode: React.SetStateAction<string>) => {
    setAuthMode(mode);
    setShowUserType(true);
    modal.current?.open();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>UniSync</div>

        <nav className={styles.navBar}>
          <a href="#features" className={styles.navLink}>
            Features
          </a>
          <span className={styles.separator}>•</span>
          <a href="#about" className={styles.navLink}>
            About
          </a>
          <span className={styles.separator}>•</span>
          <a href="#contact" className={styles.navLink}>
            Contact
          </a>
        </nav>

        <div className={styles.userActions}>
          <button
            className={styles.loginBtn}
            onClick={() => openModal("login")}
          >
            Login
          </button>
          <button
            className={styles.signupBtn}
            onClick={() => openModal("signup")}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* User Type Modal */}
      <Modal ref={modal}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Choose Account Type</h3>
            <p>Are you a student or representing an organization?</p>

            <div className={styles.userTypeOptions}>
              <Link to={`student/${authMode}`} className={styles.userTypeBtn}>
                <User size={24} />
                <span>Student</span>
                <p>Access events, updates, and academic resources</p>
              </Link>

              <Link to={`admin/${authMode}`} className={styles.userTypeBtn}>
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

      {/* Hero Section */}
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

        <div className={styles.heroVisual}>
          <div className={styles.floatingCardGroup}>
            <div className={styles.floatingCard}>
              <Calendar size={24} />
              <span>Upcoming Events</span>
            </div>
            <div className={styles.floatingCard}>
              <Bell size={24} />
              <span>Live Updates</span>
            </div>
            <div className={styles.floatingCard}>
              <BookOpen size={24} />
              <span>Academic Resources</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Everything You Need in One Place</h2>
          <p>Powerful features designed for modern university life</p>
        </div>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <Calendar className={styles.featureIcon} />
            <h3>Event Management</h3>
            <p>
              Discover, track, and never miss important university events,
              seminars, and activities.
            </p>
          </div>

          <div className={styles.featureCard}>
            <Bell className={styles.featureIcon} />
            <h3>Real-time Updates</h3>
            <p>
              Get instant notifications about academic deadlines, schedule
              changes, and announcements.
            </p>
          </div>

          <div className={styles.featureCard}>
            <BookOpen className={styles.featureIcon} />
            <h3>Academic Tracking</h3>
            <p>
              Stay on top of your coursework, assignments, and academic progress
              with smart reminders.
            </p>
          </div>

          <div className={styles.featureCard}>
            <Users className={styles.featureIcon} />
            <h3>Community Connect</h3>
            <p>
              Connect with classmates, join study groups, and participate in
              campus communities.
            </p>
          </div>

          <div className={styles.featureCard}>
            <Award className={styles.featureIcon} />
            <h3>Achievement Tracking</h3>
            <p>
              Monitor your academic milestones and celebrate your university
              achievements.
            </p>
          </div>

          <div className={styles.featureCard}>
            <Shield className={styles.featureIcon} />
            <h3>Admin Dashboard</h3>
            <p>
              Comprehensive tools for organizations to manage events and
              communicate with students.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>UniSync</h3>
            <p>Connecting university life, one sync at a time.</p>
          </div>

          <div className={styles.footerSection}>
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#support">Support</a>
          </div>

          <div className={styles.footerSection}>
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2025 UniSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UniSyncLanding;
