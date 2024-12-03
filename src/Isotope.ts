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

export default Isotope;
