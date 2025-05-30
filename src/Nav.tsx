import * as React from 'react';
import useAppStore from './store';

const Nav: React.FC = () => {
  const { showPlot, changeContent } = useAppStore();
  const { showHelp, help } = useAppStore();
  const { showLegends, legends } = useAppStore();
  const { showAbout, about } = useAppStore();

  return (
    <nav>
      <div>Zeeman</div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {!showAbout && (
          <> 
          {showPlot && (
            <>
              <button className="navButton" onClick={() => help()}>
                {showHelp ? 'Hide Help' : 'Show Help'}
              </button>
            <button className="navButton" onClick={() => legends()}>
              {showLegends ? 'Hide Legends' : 'Show Legends'}
            </button>
            </>
          )}
            <button className="navButton" onClick={() => changeContent()}>
              {showPlot ? 'Show Table' : 'Show Plot'}
            </button>
          </>
        )}
        <button className="navButton" onClick={() => about()}>
          {showAbout ? 'Back to the data' : 'About'}
        </button>
      </div>
    </nav>
  ); 
};

export default Nav;
