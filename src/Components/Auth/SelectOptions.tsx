import type { LucideIcon } from 'lucide-react';
import styles from './selectOptions.module.scss'

interface Props {
  name: string;
  value: string;
  clasName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
  icon? : LucideIcon
  options?: { [key: string | number]: string };
}

const SelectOptions = (props : Props) => {
  return (
    <div className={styles.formGroup}>
      <div className={styles.inputWrapper}>
        {props.icon && <props.icon size={20} className={styles.inputIcon} /> }
        <select
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className={ `${styles.select} ${props.clasName} `}
          onBlur={props.onBlur}
          required = {props.required}
        >
          <option value="">Select {props.name.charAt(0).toUpperCase()+ props.name.slice(1)}</option>
          {props.options && Object.entries(props.options).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SelectOptions;