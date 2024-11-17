// import { useState } from 'react'
import { create } from 'zustand'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
// import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

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

interface ElementButtonProps {
  symbol: string
}

function ElementButton({ symbol } : ElementButtonProps) {
  const { selected, selectElement } = useAppStore();

  const StyledButton = styled(Button)({
    borderRadius: "8px",
    border: "1px solid transparent",
    backgroundColor: "#1a1a1a",
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
    <StyledButton
    size="small"
    color={(symbol==selected) ? 'primary': 'inherit'}
    onClick={() => {
      selectElement(symbol);
    }}>
    { symbol }
    </StyledButton>
  )
}

interface GroupProps {
  symbols: string[]
  offset?: number
}

function Group({ symbols, offset }: GroupProps) {
  let invisible_buttons;
  if (offset != undefined) {
    if (offset > 0 && offset < 10) {
      const range = Array.from(Array(offset).keys());
      invisible_buttons = range.map(_ =>
        <Box sx={{ visibility: "hidden" }}>
          <ElementButton symbol={"."}></ElementButton>
        </Box>
      )
    }
  }

  const buttons = symbols.map(
    el => <Grid size={1}>
      <ElementButton symbol={el}></ElementButton>
    </Grid>
  );

  return(
    <Grid container direction="column" spacing={1} columns={1}>
    {invisible_buttons}
    {buttons}
    </Grid>
  )
}

function PeriodicTableGrid() {
  return (
    <Grid container spacing={1} columns={18}>
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
  )
}

interface Element {
  atomic_number: number;
  symbol: string;
  mass_number: number;
  relative_atomic_mass: string;
  isotopic_composition: string;
  standard_atomic_weight: string;
  notes: string;
}

interface AppStore {
  selected: string | null;
  selectElement: (sym: string) => void;
}

const useAppStore = create<AppStore>()((set) => ({
  selected: null,
  selectElement: (payload) => set(
    { selected: payload }
  )
}))

function App() {
  const { selected } = useAppStore();

  return (
    <>
      <Box sx={{ flexGrow: 1, margin: "3rem" }}>
        <h1>{ selected }</h1>
        <PeriodicTableGrid></PeriodicTableGrid>
      </Box>
    </>
  )
}

export default App
