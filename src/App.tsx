import * as React from 'react';
import { useState, useEffect } from 'react';
import useAppStore from './store';

import PeriodicTableGrid from './PeriodicTableGrid';
import Plot from './Plot';
import Table from './Table';

const App: React.FC = () => {
  const [showPlot, setShowPlot] = useState(true);

  return (
    <div className="container">
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
          onClick={() => setShowPlot(!showPlot)}
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
      <div className="content">
        {showPlot ? (
          <div className="plot">
            <Plot />
          </div>
        ) : (
          <div className="plot">
            <Table />
          </div>
        )}
      </div>
      <div className="table">
        <PeriodicTableGrid />
      </div>
    </div>
  )
}

export default App;
