// import all_isotopes from './assets/all_isotopes.min.json';
import common_isotopes from './assets/common_isotopes.min.json';
import spins from './assets/spins.json';

// I assume everything is parsed as string when deserializing the JSON
// The type-checking is done in the Element constructor
// (that's why I removed original Isotope and Spin interfaces)

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
enum Note {
  G = "g",
  M = "m",
  R = "r",
}

// Imagine this is implemented specifically into Note
// TODO Use it only on place as a lambda when needed
// function serializeNote(note: Note): string {
//   switch(note) {
//       case Note.g:
//           return "Geological materials are known in which the element has an isotopic composition outside the limits for normal material. The difference between the atomic weight of the element in such materials and that given in the table may exceed the stated uncertainty.";
//       case Note.m:
//           return "Modified isotopic compositions may be found in commercially available material because the material has been subjected to an undisclosed or inadvertent isotopic fractionation. Substantial deviations in atomic weight of the element from that given in the table can occur."
//       case Note.r:
//           return "Range in isotopic composition of normal terrestrial material prevents a more precise standard atomic weight being given; the tabulated atomic-weight value and uncertainty should be applicable to normal materials."
//       default:
//           return "Not a note"
//   }
// }

// Isotope interface after the conversions
//
// into the Element constructor
// We build this by matching the Isotope var
// with an expected Spin into the dataset
// This search shouldn't fail, but could fail;
// that's why we keep the spin fields optional.
interface Isotope {
  id: number,
  mass_number: number,
  isotopic_composition: number,
  relative_atomic_mass: number,
  nucleus: string;
  elevel: string;
  spin: string;
  thalf: string;
}

export class Element {
  symbol: string;
  atomic_number: string;
  standard_atomic_weight: string;
  notes: Note[];
  isotopes: Isotope[];

  constructor(symbol: string) {
    this.symbol = symbol;
    // Fallbacks
    this.notes = [];
    this.atomic_number = "0";
    this.standard_atomic_weight = "0.0";

    this.isotopes = common_isotopes
      .filter(el => el.symbol == symbol)
      .map((el, idx) => {
        const nucleus = el.mass_number.concat(symbol.toUpperCase());
        let n_spins = spins.find(s => s.nucleus == nucleus);

        // Fallback for n_spins
        if (n_spins == undefined) {
          n_spins = {
            nucleus: nucleus,
            elevel: "?",
            spin: "?",
            thalf: "?",
          }
        };

        // Ugly solution to get these values out of here
        if (this.atomic_number == "0") {
          this.atomic_number = el.atomic_number;
        }

        if (this.standard_atomic_weight == "0.0") {
          this.standard_atomic_weight = el.standard_atomic_weight;
        }

        // It should be an enum, clearly
        if (this.notes.length === 0) {
          // I start by collecting an array of strings
          let notes: string[];
          switch(el.notes) {
            case undefined:
              notes = [];
              break;
            default:
              notes = el.notes.split(",");
          };
          // Now, I enforce the type Note on the array values
          this.notes = notes.map((n: string): Note => {
            switch(n) {
              case "g":
                return Note.G
              case "m":
                return Note.M
              case "r":
                return Note.M
              default:
                // This should never happen
                throw new Error(`Unhandled note: ${n}`);
            }
          });
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

export default Element;
