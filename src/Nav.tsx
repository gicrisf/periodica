import * as React from 'react';
import useAppStore from './store';

const Nav: React.FC = () => {
  const { showPlot, changeContent } = useAppStore();

  return (
    <nav>
      <div>Periodica</div>
      <button onClick={() => changeContent()}>
        {showPlot ? 'Show Table' : 'Show Plot'}
      </button>
    </nav>
  );
};

export default Nav;
