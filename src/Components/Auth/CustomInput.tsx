import type { LucideIcon } from 'lucide-react';
import styles from './customInput.module.scss'

interface Props {
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  className?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

const CustomInput = (props : Props) => {
  return (
    <div className={styles.inputGroup}>
      {props.icon && <props.icon className={styles.inputIcon} />}
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        value={props.value}
        onChange={props.onChange}
        className={styles.customInput + ' ' + styles.className}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
    </div>
  )
}

export default CustomInput;