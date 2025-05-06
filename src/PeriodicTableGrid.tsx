import React from 'react';
import './PeriodicTable.css';
import useAppStore from './store';

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
  symbol: string;
  invisible?: boolean;
}

function ElementButton({ symbol, invisible }: ElementButtonProps) {
  const { selected, selectElement } = useAppStore();

  return (
    <button
      className={`element-button ${symbol === selected.symbol ? 'selected' : ''} ${
        invisible ? 'invisible' : ''
      }`}
      onClick={() => selectElement(symbol)}
    >
      {symbol}
    </button>
  );
}

interface GroupProps {
  symbols: string[];
  offset?: number;
}

function Group({ symbols, groupNumber }: { symbols: string[]; groupNumber: number }) {
  return (
    <div className={`group group-${groupNumber.toString().padStart(2, '0')}`}>
      {symbols.map((el, idx) => (
        <ElementButton
          key={el}
          symbol={el}
        />
      ))}
    </div>
  );
}

function PeriodicTableGrid() {
    return (
        <div className="periodic-table">
        <div className="main-groups">
            {/* Group 1 (Alkali Metals) */}
            <Group symbols={group_01_symbols} groupNumber={1} />

            {/* Group 2 (Alkaline Earth Metals) */}
            <Group symbols={group_02_symbols} groupNumber={2} offset={1} />

            {/* Groups 3-12 (Transition Metals) */}
            <Group symbols={group_03_symbols} groupNumber={3} offset={3} />
            <Group symbols={group_04_symbols} groupNumber={4} offset={3} />
            <Group symbols={group_05_symbols} groupNumber={5} offset={3} />
            <Group symbols={group_06_symbols} groupNumber={6} offset={3} />
            <Group symbols={group_07_symbols} groupNumber={7} offset={3} />
            <Group symbols={group_08_symbols} groupNumber={8} offset={3} />
            <Group symbols={group_09_symbols} groupNumber={9} offset={3} />
            <Group symbols={group_10_symbols} groupNumber={10} offset={3} />
            <Group symbols={group_11_symbols} groupNumber={11} offset={3} />
            <Group symbols={group_12_symbols} groupNumber={12} offset={3} />

            {/* Groups 13-16 (Pnictogens, Chalcogens) */}
            <Group symbols={group_13_symbols} groupNumber={13} offset={1} />
            <Group symbols={group_14_symbols} groupNumber={14} offset={1} />
            <Group symbols={group_15_symbols} groupNumber={15} offset={1} />
            <Group symbols={group_16_symbols} groupNumber={16} offset={1} />

            {/* Group 17 (Halogens) */}
            <Group symbols={group_17_symbols} groupNumber={17} offset={1} />

            {/* Group 18 (Noble Gases) */}
            <Group symbols={group_18_symbols} groupNumber={18} />
        </div>

        {/* Lanthanides and Actinides */}
        <div className="inner-transition">
        <div className="spacer" />
        {lanthanides_symbols.map(el => (
            <ElementButton key={el} symbol={el} />
        ))}
      <div className="spacer" />
      {actinides_symbols.map(el => (
        <ElementButton key={el} symbol={el} />
      ))}
      </div>
    </div>
    );
}

export default PeriodicTableGrid;
