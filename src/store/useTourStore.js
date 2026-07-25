import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Turlarla bağlı qlobal state.
 *
 * savedIds      — istifadəçinin "Seçilmişlər"ə əlavə etdiyi turların id-ləri.
 *                 persist middleware sayəsində localStorage-də saxlanılır,
 *                 yəni səhifə yenilənəndə itmir.
 * showSavedOnly — turlar bölməsində yalnız seçilmişləri göstərmək rejimi.
 */
export const useTourStore = create(
  persist(
    (set, get) => ({
      savedIds: [],
      showSavedOnly: false,

      toggleSaved: (id) =>
        set((state) => {
          const savedIds = state.savedIds.includes(id)
            ? state.savedIds.filter((savedId) => savedId !== id)
            : [...state.savedIds, id];

          return {
            savedIds,
            // Son seçilmiş tur da silinsə, filtri açıq saxlamağın mənası yoxdur
            showSavedOnly: savedIds.length === 0 ? false : state.showSavedOnly,
          };
        }),

      toggleShowSavedOnly: () =>
        set((state) => ({ showSavedOnly: !state.showSavedOnly })),

      isSaved: (id) => get().savedIds.includes(id),

      clearSaved: () => set({ savedIds: [], showSavedOnly: false }),
    }),
    {
      name: "vintage-travel-tours",
      // Yalnız seçilmiş turlar yadda qalsın, filtr rejimi yox
      partialize: (state) => ({ savedIds: state.savedIds }),
    },
  ),
);
