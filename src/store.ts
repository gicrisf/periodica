import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import Isotope from './Isotope';
import Spin from './Spin';
import Element from './Element';

type State = {
  selected: Element;
  elements: Element[];
  isotopes: Isotope[];
  spins: Spin[];
  themeName: string;
}

type Actions = {
  selectElement: (payload: string) => void
  selectThemeName: (payload: string) => void
}

const useAppStore = create<State & Actions>()(
  immer((set) => ({
    selected: new Element("H"),
    elements: [],
    themeName: "light",
    selectElement: (payload) =>
      set((draft) => {
        let element = draft.elements.find(e => e.symbol == payload);
        switch (element) {
          case undefined:
            draft.selected = new Element(payload);  // new selection
            draft.elements.push(draft.selected);  // add to cache
            break;
          default:
            draft.selected = element;  // Use cached element
        };
      }),
    selectThemeName: (payload) =>
      // Just change the string with the new theme name
      set((draft) => {
        draft.themeName = payload;
      })
})))

export default useAppStore;
