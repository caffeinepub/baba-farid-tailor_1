import { create } from 'zustand';
import type { Style } from '../backend';

interface SelectedStyleState {
  selectedStyle: Style | null;
  setSelectedStyle: (style: Style | null) => void;
  reconcileWithCatalog: (catalogStyles: Style[]) => void;
}

export const useSelectedStyle = create<SelectedStyleState>((set, get) => ({
  selectedStyle: null,
  setSelectedStyle: (style) => set({ selectedStyle: style }),
  reconcileWithCatalog: (catalogStyles: Style[]) => {
    const currentStyle = get().selectedStyle;
    if (currentStyle) {
      // Clear selection if style no longer exists by id OR if it's named "Saree Blouse" or "African Kaftan"
      const stillExists = catalogStyles.some(
        (style) => style.id === currentStyle.id
      );
      const isExcludedStyle = currentStyle.name === 'Saree Blouse' || currentStyle.name === 'African Kaftan';
      
      if (!stillExists || isExcludedStyle) {
        set({ selectedStyle: null });
      }
    }
  },
}));
