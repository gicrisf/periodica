import * as React from 'react';
import { useState, useEffect } from 'react';
import useAppStore from './store';

import PeriodicTableGrid from './PeriodicTableGrid';
import Plot from './Plot';
import Table from './Table';

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="plot">
        <Table />
      </div>
      <div className="table">
        <PeriodicTableGrid />
      </div>
    </div>
  )
}

export default App;
