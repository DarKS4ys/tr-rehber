import styles from './styles/button.module.css';

const ShinyButton = ({label}: {label: string}) => {
  return (
    <button className={`${styles.button} dark:text-black dark:hover:text-neutral-950`}>{label}</button>
  );
};
export default ShinyButton;