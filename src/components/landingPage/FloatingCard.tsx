import type { LucideIcon } from 'lucide-react';
import styles from  './floatingCard.module.scss'

interface Props {
  icon : LucideIcon,
  text : string,
}

const FloatingCard = (props : Props) => {
  return (
  <div className={styles.floatingCard}>
    <props.icon size={24} />
    <span> {props.text} </span>
  </div>
  )
}

export default FloatingCard;