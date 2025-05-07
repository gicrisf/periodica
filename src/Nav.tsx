import * as React from 'react';
import useAppStore from './store';

const Nav: React.FC = () => {
  const { showPlot, changeContent } = useAppStore();

  return (
    <nav style={{
      backgroundColor: 'black',
      color: 'white',
      padding: '.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>Periodica</div>
      <button
        onClick={() => changeContent()}
        style={{
          background: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          cursor: 'pointer'
        }}
      >
        {showPlot ? 'Show Table' : 'Show Plot'}
      </button>
    </nav>
  );
};

export default Nav;
