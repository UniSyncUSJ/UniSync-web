import { type LucideIcon } from 'lucide-react'
import styles from './featureCard.module.scss'

interface Props {
  icon : LucideIcon,
  title : string,
  description : string
}

const FeatureCard = (props : Props) => {  
  return (
    <div className={styles.featureCard}>
      <props.icon className={styles.featureIcon} />
      <h3> {props.title} </h3>
      <p>
        {props.description}
      </p>
    </div>
  )
}

export default FeatureCard;