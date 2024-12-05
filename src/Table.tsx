import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import PeriodicTableGrid from './PeriodicTableGrid';
import ElementSquare from './ElementSquare';

import useAppStore from './store';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
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

function Table() {
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
    <Container maxWidth="xl">
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
    </Container>
  )
}

export default Table;