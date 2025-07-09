import styles from './customButton.module.scss'

interface Props {
  type?: "button" | "submit" | "reset";
  title : string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const CustomButton = ( props : Props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className= {!props.disabled ? (`${styles.customButton} ${props.className}`) : styles.disabled}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
};

export default CustomButton;