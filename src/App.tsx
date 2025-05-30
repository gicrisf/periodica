import * as React from 'react';
import { useState, useEffect } from 'react';
import useAppStore from './store';

import PeriodicTableGrid from './PeriodicTableGrid';
import Plot from './Plot';
import Table from './Table';
import Nav from './Nav';
import About from './About';

const App: React.FC = () => {
  const { showPlot } = useAppStore();
  const { showAbout } = useAppStore();

  return (
    <div className="container">
      <Nav />
      {!showAbout ? (
        <>
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
        </>
      ) : (
        <div className="content">
          <div className="plot">
            <About />
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
