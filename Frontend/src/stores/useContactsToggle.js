import { create } from "zustand";

export const useContactsToggle = create(
    (set, get) => ({
        isSidebarOpen: false,

        setSidebarOpen: () => set({ isSidebarOpen: !get().isSidebarOpen }),

        setSidebarClose: () => set({ isSidebarOpen: false }),
    })
);