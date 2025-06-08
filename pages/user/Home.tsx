/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  BookOpen,
  Bell,
  Play,
  ArrowRight,
  Zap,
  Shield,
  Target,
} from "lucide-react";
import Styles from "../../styles/Home.module.scss";
import { Link } from "react-router-dom";
import { getTokenAuth } from "../../utils/user/auth";

export default function UniSyncLanding() {
  const token = getTokenAuth();
  console.log("Token in UniSyncLanding:", token);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  const features = [
    {
      icon: <Calendar size={28} />,
      title: "Smart Event Tracking",
      description:
        "AI-powered event recommendations based on your academic interests and schedule",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: <Zap size={28} />,
      title: "Instant Notifications",
      description:
        "Real-time alerts for deadlines, schedule changes, and important announcements",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: <Target size={28} />,
      title: "Academic Goals",
      description:
        "Set and track your academic milestones with intelligent progress monitoring",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      text: "UniSync changed how I manage my university life. Never missed an important event again!",
    },
    {
      name: "Marcus Williams",
      role: "Engineering Student",
      text: "The notification system is incredibly smart. It knows exactly when to remind me about things.",
    },
    {
      name: "Emma Rodriguez",
      role: "Business Student",
      text: "Finally, all my academic information in one beautiful, easy-to-use platform.",
    },
  ];

  return (
    <>
      <div className={Styles.background}>
        <div className={Styles.floatingElements}>
          <div className={Styles.floatingElement}>
            <Users size={40} />
          </div>
          <div className={Styles.floatingElement}>
            <BookOpen size={35} />
          </div>
          <div className={Styles.floatingElement}>
            <Bell size={38} />
          </div>
          <div className={Styles.floatingElement}>
            <Calendar size={42} />
          </div>
        </div>

        <div className={Styles.mainWindow}>
          <div className={Styles.left}>
            <div className={Styles.logoContainer}>
              <div className={Styles.logoIcon}>U</div>
              <div className={Styles.logoText}>UniSync</div>
            </div>

            <h1 className={Styles.mainTitle}>
              Your University Life,
              <br />
              <span className={Styles.highlight}>Perfectly Synced</span>
            </h1>

            <p className={Styles.subtitle}>
              Transform your academic journey with intelligent event tracking,
              seamless schedule management, and personalized notifications that
              keep you ahead of every important moment.
            </p>

            <div className={Styles.ctaContainer}>
              <Link to="/signin" className={Styles.primaryButton}>
                Login
              </Link>
              <Link to="/signup" className={Styles.secondaryButton}>
                SignUp
              </Link>
            </div>

            <div className={Styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={Styles.featureCard}>
                  <div className={Styles.featureIcon}>{feature.icon}</div>
                  <h3 className={Styles.featureTitle}>{feature.title}</h3>
                  <p className={Styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className={Styles.statsSection}>
              <div className={Styles.statItem}>
                <div className={Styles.statNumber}>50K+</div>
                <div className={Styles.statLabel}>Active Students</div>
              </div>
              <div className={Styles.statItem}>
                <div className={Styles.statNumber}>200+</div>
                <div className={Styles.statLabel}>Universities</div>
              </div>
              <div className={Styles.statItem}>
                <div className={Styles.statNumber}>99.9%</div>
                <div className={Styles.statLabel}>Uptime</div>
              </div>
              <div className={Styles.statItem}>
                <div className={Styles.statNumber}>4.9★</div>
                <div className={Styles.statLabel}>User Rating</div>
              </div>
            </div>
          </div>

          <div className={Styles.right}>
            <div className={Styles.rightContent}>
              <div className={Styles.testimonialCard}>
                <div className={Styles.testimonialText}>
                  "{testimonials[currentSlide].text}"
                </div>
                <div className={Styles.testimonialAuthor}>
                  {testimonials[currentSlide].name}
                </div>
                <div className={Styles.testimonialRole}>
                  {testimonials[currentSlide].role}
                </div>
              </div>

              <div className={Styles.slideIndicators}>
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`${Styles.slideIndicator} ${
                      currentSlide === index ? Styles.active : ""
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
