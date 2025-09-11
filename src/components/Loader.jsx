import cake from '../assets/favicon.ico';
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="spinner">
          <img
            src={cake}
            alt="cake"
            width="120"
            height="120"
            style={{ verticalAlign: 'middle' }}
          />
        </div>
        <h2 className="loader-title">Reccypi</h2>
        <p className="loader-text">Loading delicious recipes...</p>
      </div>
    </div>
  );
};

export default Loader;
