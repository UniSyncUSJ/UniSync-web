import React from "react";
import styles from "./errorPage.module.scss";

function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      {/* Animated background elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingShape}></div>
        <div className={styles.floatingShape}></div>
        <div className={styles.floatingShape}></div>
        <div className={styles.glowOrb}></div>
        <div className={styles.glowOrb}></div>
      </div>

      {/* Main content container */}
      <div className={styles.container}>
        {/* 404 Number with glitch effect */}
        <div className={styles.errorNumber}>
          <span className={styles.glitchText} data-text="404">
            404
          </span>
        </div>

        {/* Error icon */}
        <div className={styles.iconContainer}>
          <div className={styles.errorIcon}>
            <div className={styles.iconInner}>
              <span>!</span>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className={styles.textContent}>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>
        </div>

        {/* Action buttons */}
        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            onClick={() => window.history.back()}
          >
            <span>Go Back</span>
            <div className={styles.buttonGlow}></div>
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => (window.location.href = "/")}
          >
            <span>Home Page</span>
          </button>
        </div>

        {/* Decorative elements */}
        <div className={styles.decorativeElements}>
          <div className={styles.line}></div>
          <div className={styles.dot}></div>
          <div className={styles.line}></div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
