import './loader.module.scss'

const Loader = ({ label = 'Loading' }) => (
  <div className="loader-overlay">
    <div className="loader-overlay__ring">
      <div className="loader-overlay__dot" />
    </div>
    {label && (
      <div className="loader-overlay__label">
        <span className="loader-overlay__text">{label}</span>
        <div  className="loader-overlay__rule" />
      </div>
    )}
  </div>
);

export default Loader;