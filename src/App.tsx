import * as React from 'react';
import { useState, useEffect } from 'react';
import useAppStore from './store';

import PeriodicTableGrid from './PeriodicTableGrid';
import Plot from './Plot';
import Table from './Table';
import Nav from './Nav';

const App: React.FC = () => {
  const { showPlot } = useAppStore();

  return (
    <div className="container">
      <Nav />
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
