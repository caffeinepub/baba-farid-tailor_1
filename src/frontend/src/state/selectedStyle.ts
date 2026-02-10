import { create } from 'zustand';
import type { Style } from '../backend';

interface SelectedStyleState {
  selectedStyle: Style | null;
  setSelectedStyle: (style: Style | null) => void;
}

export const useSelectedStyle = create<SelectedStyleState>((set) => ({
  selectedStyle: null,
  setSelectedStyle: (style) => set({ selectedStyle: style }),
}));
