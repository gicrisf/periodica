import * as React from 'react';
import { useState, useEffect } from 'react';
import useAppStore from './store';

import PeriodicTableGrid from './PeriodicTableGrid';
import Plot from './Plot';
import Table from './Table';

// <Table></Table>
// <Plot />

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="plot">
        <Plot />
      </div>
      <div className="table">
        <PeriodicTableGrid />
      </div>
    </div>
  )
}

export default App;
