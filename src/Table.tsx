import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const PeriodicTableGrid = React.lazy(() => import('./PeriodicTableGrid'));
// I expect the square to load instantly
import ElementSquare from './ElementSquare';

import useAppStore from './store';

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <span>{`${props.value.toFixed(2)}%`}</span>
      </Box>
    </Box>
  );
}

const Table: React.FC = () => {
  const { selected } = useAppStore();

  const columns: GridColDef[] = [
    { field: 'mass_number', headerName: 'Mass Number', width: 130 },
    { field: 'relative_atomic_mass', headerName: 'Relative Atomic Mass', width: 200 },
    { field: 'isotopic_composition',
      headerName: 'Isotopic Composition',
      width: 300,
      renderCell: (params: GridRenderCellParams<any, number>) =>
        <LinearProgressWithLabel value={ params.value ? params.value*100 : 0.0}></LinearProgressWithLabel>
    },
    { field: 'spin', headerName: 'Spin', width: 100  },
    { field: 'thalf', headerName: 'Half Life', width: 200 },
  ];

  return(
    <Grid container spacing={3} direction='row' columns={2}>
      <Grid container spacing={3} columns={2} sx={{ padding: "3rem" }}>
        <Grid container spacing={3} sx={{ width: "100%", padding: "3.5rem" }}>
          <Grid size="grow">
            <ElementSquare selected={selected}></ElementSquare>
          </Grid>
          <Grid size="auto" sx={{ height: 268 }}>
            <DataGrid
              rows={selected.isotopes}
              columns={columns}
              sortModel={[
                {
                  field: 'isotopic_composition',
                  sort: 'desc',
                }
              ]}
            />
          </Grid>
        </Grid>
        <Grid size={18}>
          <PeriodicTableGrid />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Table;
