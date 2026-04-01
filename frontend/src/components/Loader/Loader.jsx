import styles from './loader.module.scss'

const Loader = ({ label = 'Loading' }) => (
  <div className={styles.overlay}>
    <div className={styles.ring}>
      <div className={styles.dot} />
    </div>
    {label && (
      <div className={styles.label}>
        <span className={styles.text}>{label}</span>
        <div className={styles.rule} />
      </div>
    )}
  </div>
);

export default Loader;