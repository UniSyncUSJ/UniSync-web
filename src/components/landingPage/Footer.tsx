import styles from './footer.module.scss';

const Footer = () => {
  return (
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
  )
}

export default Footer;