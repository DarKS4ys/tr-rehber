import styles from './styles/button.module.css';

const ShinyButton = ({disabled, label, onClick, onMouseLeave, onMouseEnter}: {disabled?: boolean; onClick?: () => void; onMouseLeave?: () => void; onMouseEnter?: () => void, label: string}) => {
  return (
    <button disabled={disabled} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`${styles.button} disabled:opacity-50 disabled:cursor-not-allowed dark:text-black dark:hover:text-neutral-950`}>{label}</button>
  );
};
export default ShinyButton;