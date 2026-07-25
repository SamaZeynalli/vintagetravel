import { create } from "zustand";

/**
 * Turlarla bağlı qlobal state.
 * savedIds — istifadəçinin "Seçilmişlər"ə əlavə etdiyi turların id-ləri.
 */
export const useTourStore = create((set, get) => ({
  savedIds: [],

  toggleSaved: (id) =>
    set((state) => ({
      savedIds: state.savedIds.includes(id)
        ? state.savedIds.filter((savedId) => savedId !== id)
        : [...state.savedIds, id],
    })),

  isSaved: (id) => get().savedIds.includes(id),

  clearSaved: () => set({ savedIds: [] }),
}));
