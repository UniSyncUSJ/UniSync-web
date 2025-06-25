import { Award, Bell, BookOpen } from "lucide-react";
import FloatingCard from "./FloatingCard";
import styles from './floatingCardsSection.module.scss'
const FloatingCardsSection = () => {
  return <div className={styles.heroVisual}>
    <div className={styles.floatingCardGroup}>
      <FloatingCard icon={Award} text="Upcoming Events" />
      <FloatingCard icon={Bell} text="Live Updates" />
      <FloatingCard icon={BookOpen} text="Academic Resources" />
    </div>
  </div>
}

export default FloatingCardsSection;