import React from "react";
import Style from "./loadingPage.module.scss"; // Adjust the path as necessary

function LoadingPage() {
  return (
    <div className={Style.loadingPage}>
      {/* Animated background */}
      <div className={Style.bgGradient}></div>
      <div className={Style.bgOverlay}></div>

      {/* Floating particles */}
      <div className={Style.particles}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={Style.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main content */}
      <div className={Style.content}>
        {/* Animated logo/icon */}
        {/* <div className={Style.logoContainer}>
          <div className={Style.logo}>
            <div className={Style.logoInner}></div>
          </div>
        </div> */}

        {/* Loading spinner */}
        <div className={Style.spinnerContainer}>
          <div className={Style.spinner}>
            <div className={Style.spinnerRing}></div>
            <div className={Style.spinnerRing}></div>
            <div className={Style.spinnerRing}></div>
          </div>
        </div>

        {/* Text content */}
        <div className={Style.textContent}>
          <h1 className={Style.loadingTitle}>UniSync</h1>
          <div className={Style.loadingDots}>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
          <p className={Style.loadingSubtitle}>Preparing your experience</p>
        </div>

        {/* Progress bar */}
        {/* <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default LoadingPage;
