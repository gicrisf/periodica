import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Element } from "./Element";

interface ElementSquareProps {
  selected: Element
}

function ElementSquare( { selected } : ElementSquareProps ) {
  return (
    <Box>
      <Grid container sx={{ padding: "1.5rem" }}>
        <Grid size={12}>
          <Box sx={{ fontSize: "3rem" }}>
            <span>{ selected.atomic_number }</span>
          </Box>
        </Grid>
        <Grid size={2}></Grid>
        <Grid size="auto">
          <Box sx={{ fontSize: "8.2rem" }}>
            <span>{ selected.symbol }</span>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ElementSquare;
