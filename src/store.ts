import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools } from 'zustand/middleware';

import Element from './Element';

type State = {
  selected: Element;
  elements: Element[];
  themeName: string;
  showPlot: boolean;
  showHelp: boolean;
  showLegends: boolean;
  showAbout: boolean;
}

type Actions = {
  selectElement: (payload: string) => void;
  selectThemeName: (payload: string) => void;
  changeContent: () => void;
  help: () => void;
  legends: () => void;
  about: () => void;
}

const useAppStore = create<State & Actions>()(
  devtools(
    persist(
      immer((set) => ({
        selected: new Element("H"),
        elements: [],
        themeName: "light",
        showPlot: true,
        showHelp: false,
        showLegends: false,
        showAbout: false,
        selectElement: (payload) =>
          set((draft) => {
            const element = draft.elements.find(e => e.symbol == payload);
            switch (element) {
              case undefined:
                draft.selected = new Element(payload);  // new selection
                draft.elements.push(draft.selected);  // add to cache
                break;
              default:
                draft.selected = element;  // Use cached element
            };
          }),
        changeContent: () =>
          set((draft) => {
            draft.showPlot = !draft.showPlot;
          }),
        help: () =>
          set((draft) => {
            draft.showHelp = !draft.showHelp;
          }),
        about: () =>
          set((draft) => {
            draft.showAbout = !draft.showAbout;
          }),
        legends: () =>
          set((draft) => {
            draft.showLegends = !draft.showLegends;
          }),
        // FIXME I should remove this
        selectThemeName: (payload) =>
          // Just change the string with the new theme name
          set((draft) => {
            draft.themeName = payload;
          })
      })),
      {
        name: 'periodica-storage'
      }
    )
  )
)

export default useAppStore;
