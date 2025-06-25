import styles from "./errorPage.module.scss";

function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <div className={styles.backgroundElements}>
        <div className={styles.floatingShape}></div>
        <div className={styles.floatingShape}></div>
        <div className={styles.floatingShape}></div>
        <div className={styles.glowOrb}></div>
        <div className={styles.glowOrb}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.errorNumber}>
          <span className={styles.glitchText} data-text="404">
            404
          </span>
        </div>

        <div className={styles.textContent}>
          <h1 className={styles.title}>Page Not Found !</h1>
          <p className={styles.description}>
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>
        </div>

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
      </div>
    </div>
  );
}

export default ErrorPage;
