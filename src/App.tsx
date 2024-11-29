import { useEffect } from 'react'
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// import all_isotopes from './assets/all_isotopes.min.json';
import common_isotopes from './assets/common_isotopes.min.json';
import spins from './assets/spins.json';

const group_01_symbols: string[] = ["H", "Li", "Na", "K", "Rb", "Cs", "Fr"];
const group_02_symbols: string[] = ["Be", "Mg", "Ca", "Sr", "Ba", "Ra"];
const group_03_symbols: string[] = ["Sc", "Y"];
const group_04_symbols: string[] = ["Ti", "Zr", "Hf", "Rf"];
const group_05_symbols: string[] = ["V", "Nb", "Ta", "Db"];
const group_06_symbols: string[] = ["Cr", "Mo", "W", "Sg"];
const group_07_symbols: string[] = ["Mn", "Tc", "Re", "Bh"];
const group_08_symbols: string[] = ["Fe", "Ru", "Os", "Hs"];
const group_09_symbols: string[] = ["Co", "Rh", "Ir", "Mt"];
const group_10_symbols: string[] = ["Ni", "Pd", "Pt", "Ds"];
const group_11_symbols: string[] = ["Cu", "Ag", "Au", "Rg"];
const group_12_symbols: string[] = ["Zn", "Cd", "Hg", "Cn"];
const group_13_symbols: string[] = ["B", "Al", "Ga", "In", "Tl", "Nh"];
const group_14_symbols: string[] = ["C", "Si", "Ge", "Sn", "Pb", "Fl"];
const group_15_symbols: string[] = ["N", "P", "As", "Sb", "Bi", "Mc"];
const group_16_symbols: string[] = ["O", "S", "Se", "Te", "Po", "Lv"];
const group_17_symbols: string[] = ["F", "Cl", "Br", "I", "At", "Ts"];
const group_18_symbols: string[] = ["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"];

const lanthanides_symbols: string[] =
  ["La", "Ce", "Pr", "Nd", "Pm", "Sm",
   "Eu", "Gd", "Tb", "Dy", "Ho", "Er",
   "Tm", "Yb", "Lu"];

const actinides_symbols: string[] =
  ["Ac", "Th", "Pa", "U", "Np", "Pu",
   "Am", "Cm", "Bk", "Cf", "Es", "Fm",
   "Md", "No", "Lr"];

interface ElementButtonProps {
  symbol: string
  invisible?: boolean
}

function ElementButton({ symbol, invisible } : ElementButtonProps) {
  const { selected, selectElement } = useAppStore();

  const StyledButton = styled(Button)({
    borderRadius: "8px",
    border: "1px solid ",
    textTransform: "inherit",
    cursor: "pointer",
    transition: "border-color 0.25s",
    '&:hover': {
      borderColor: "#646cff",
    },
    // Can I avoid this duplication?
    '&:focus': {
      outline: "4px auto -webkit-focus-ring-color",
    },
    '&:focusVisible': {
      outline: "4px auto -webkit-focus-ring-color",
    }
  })

  return(
    <Grid size={1} sx={{visibility: (invisible) ? "hidden" : "inherit" }}>
      <StyledButton
        size="small"
        color={(symbol==selected.symbol) ? 'primary': 'inherit'}
        onClick={() => {
          selectElement(symbol);
        }}>
        { symbol }
      </StyledButton>
    </Grid>
  )
}

interface GroupProps {
  symbols: string[]
  offset?: number
}

function Group({ symbols, offset }: GroupProps) {
  const invisible_buttons = (() => {
    if (offset != undefined && offset > 0 && offset < 10) {
      return(
        Array
          .from(Array(offset).keys()) // Define a range of numbers to map
          .map(() => <ElementButton invisible symbol={"."}></ElementButton>)
      )
    }
  })();

  const buttons = symbols
    .map(el => <ElementButton symbol={el}></ElementButton>);

  return(
    <Grid container direction="column" spacing={1} columns={1}>
      {invisible_buttons}
      {buttons}
    </Grid>
  )
}

interface ElementSquareProps {
  selected: Element
}

function ElementSquare( { selected } : ElementeSquareProps ) {
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

function PeriodicTableGrid() {
  // Special treatment for lanthanides and actinides
  const invisible_buttons = Array
    .from(Array(3).keys())
    .map(_ => <ElementButton invisible symbol={"."}></ElementButton>);

  const lanthanides_buttons = lanthanides_symbols
    .map(el => <ElementButton symbol={el}></ElementButton>);

  const actinides_buttons = actinides_symbols
    .map(el => <ElementButton symbol={el}></ElementButton>);

  return (
    <Box>
      <Grid container spacing={1} columns={18} justifyContent="center">
        <Group symbols={group_01_symbols}></Group>
        <Group symbols={group_02_symbols} offset={1}></Group>
        <Group symbols={group_03_symbols} offset={3}></Group>
        <Group symbols={group_04_symbols} offset={3}></Group>
        <Group symbols={group_05_symbols} offset={3}></Group>
        <Group symbols={group_06_symbols} offset={3}></Group>
        <Group symbols={group_07_symbols} offset={3}></Group>
        <Group symbols={group_08_symbols} offset={3}></Group>
        <Group symbols={group_09_symbols} offset={3}></Group>
        <Group symbols={group_10_symbols} offset={3}></Group>
        <Group symbols={group_11_symbols} offset={3}></Group>
        <Group symbols={group_12_symbols} offset={3}></Group>
        <Group symbols={group_13_symbols} offset={1}></Group>
        <Group symbols={group_14_symbols} offset={1}></Group>
        <Group symbols={group_15_symbols} offset={1}></Group>
        <Group symbols={group_16_symbols} offset={1}></Group>
        <Group symbols={group_17_symbols} offset={1}></Group>
        <Group symbols={group_18_symbols}></Group>
      </Grid>

      <Box sx={{ height: ".5rem" }}></Box>
      <Grid container spacing={1} columns={10} justifyContent="center">
        <Grid container direction='row' spacing={1} columns={18}>
          {invisible_buttons}
          {lanthanides_buttons}
        </Grid>
        <Grid container direction='row' spacing={1} columns={18}>
          {invisible_buttons}
          {actinides_buttons}
        </Grid>
      </Grid>
    </Box>
  )
}

/* {
 *   "atomic_number": "1",
 *   "symbol": "H",
 *   "mass_number": "1",
 *   "relative_atomic_mass": "1.00782503223(9)",
 *   "isotopic_composition": "0.999885(70)",
 *   "standard_atomic_weight": "[1.00784,1.00811]",
 *   "notes": "m"
 * } */
interface Isotope {
  atomic_number: string;
  symbol: string;
  mass_number: string;
  relative_atomic_mass: string;
  isotopic_composition?: string;
  standard_atomic_weight: string;
  notes?: string;
}



/* g: Geological materials
/are known in which the element has an isotopic composition outside the limits for normal material.
/The difference between the atomic weight of the element in such materials and
/that given in the table may exceed the stated uncertainty.
 * m: Modified isotopic compositions may be found in commercially available material because
/the material has been subjected to an undisclosed or inadvertent isotopic fractionation.
/Substantial deviations in atomic weight of the element from that given in the table can occur.
 * r: Range in isotopic composition of normal terrestrial material prevents a more precise
/standard atomic weight being given; the tabulated atomic-weight value and uncertainty
/should be applicable to normal materials.
 */
type Note = "g" | "m" | "r";

// Imagine this is implemented specifically into Note
function serializeNote(note: Note): string {
  switch(note) {
      case "g":
          return "Geological materials are known in which the element has an isotopic composition outside the limits for normal material. The difference between the atomic weight of the element in such materials and that given in the table may exceed the stated uncertainty.";
      case "m":
          return "Modified isotopic compositions may be found in commercially available material because the material has been subjected to an undisclosed or inadvertent isotopic fractionation. Substantial deviations in atomic weight of the element from that given in the table can occur."
      case "r":
          return "Range in isotopic composition of normal terrestrial material prevents a more precise standard atomic weight being given; the tabulated atomic-weight value and uncertainty should be applicable to normal materials."
      default:
          return "Not a note"
  }
}

/* {
 *    "nucleus": "1H",
 *    "elevel": "0.0",
 *    "spin": "1/2+",
 *    "thalf": "STABLE"
 *  }, */
interface Spin {
  nucleus: string;
  elevel: string;
  spin: string;
  thalf: string;
}

class Element {
  symbol: string;
  atomic_number: string;
  standard_atomic_weight: string;
  notes: Note[];

  constructor(symbol: string) {
    this.symbol = symbol;

    this.isotopes = common_isotopes
      .filter(el => el.symbol == symbol)
      .map((el, idx) => {
        let nucleus = el.mass_number.concat(symbol.toUpperCase());
        let n_spins = spins.find(s => s.nucleus == nucleus);

        // Ugly solution
        if (this.atomic_number == undefined) {
          this.atomic_number = el.atomic_number;
        }

        if (this.standard_atomic_weight == undefined) {
          this.standard_atomic_weight = el.standard_atomic_weight;
        }

        // It should be an enum, clearly
        if (this.notes == undefined) {
          // I start by collecting an array of strings
          let notes: string[];
          switch(el.notes) {
            case undefined:
              notes = [];
              break;
            default:
              notes = el.notes.split(",");
          };
          // Now, I enforce the type Note[]
          // leveraging the class property
          this.notes = notes;
        }

        let isotopic_composition: number;
        switch(el.isotopic_composition) {
          case undefined:
            isotopic_composition = 0;
            break;
          case "1":
            isotopic_composition = 1;
            break;
          default:
            isotopic_composition =
              parseFloat(el.isotopic_composition.substring(0, 7));
        };

        let relative_atomic_mass: number;
        switch(el.relative_atomic_mass) {
          case undefined:
            // shouldn't happen at all
            relative_atomic_mass = 0;
            break;
          default:
            relative_atomic_mass =
              parseFloat(el.relative_atomic_mass.substring(0, 7));
        };

        let mass_number: number;
        switch(el.mass_number) {
          case undefined:
            // shouldn't happen at all
            mass_number = 0;
            break;
          default:
            mass_number = parseInt(el.mass_number);
        };

        return {
          id: idx,
          mass_number: mass_number,
          isotopic_composition: isotopic_composition,
          relative_atomic_mass: relative_atomic_mass,
          ...n_spins
        }
      });
  }
}

type State = {
  selected: Element;
  isotopes: Isotope[];
  spins: Spin[];
}

type Actions = {
  selectElement: (sym: string) => void
}

const useAppStore = create<State & Actions>()(
  immer((set) => ({
    selected: new Element("H"),
    isotopes: common_isotopes,
    selectElement: (payload) =>
      set((draft) => {
        draft.selected = new Element(payload)
      })
})))

function App() {
  const { selected } = useAppStore();

  // Debugging effect
  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const columns: GridColDef[] = [
    { field: 'mass_number', headerName: 'Mass Number', width: 130 },
    { field: 'relative_atomic_mass', headerName: 'Relative Atomic Mass', width: 200 },
    { field: 'isotopic_composition',
      headerName: 'Isotopic Composition',
      width: 200,
      renderCell: (params: GridRenderCellParams<any, number>) =>
        <LinearProgress value={params.value}></LinearProgress>
    },
    { field: 'spin', headerName: 'Spin', width: 200  },
    { field: 'thalf', headerName: 'Half Life', width: 200 },
  ];

  return (
    <>
      <Container maxWidth="xl">
      <Grid container spacing={3} direction='row' columns={2}>
        <Grid container spacing={3} columns={2}
          sx={{
          flexGrow: 1,
          fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
          padding: "3rem",
        }}>
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
            <PeriodicTableGrid></PeriodicTableGrid>
          </Grid>
        </Grid>
      </Grid>
      </Container>
    </>
  )
}

export default App
