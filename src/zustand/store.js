import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

let settingsStore = (set) => ({
  loginBtn: false,
  theLoginBtn: (type) => set((state) => ({ ...state, loginBtn: type })),
  theDefaultLoginBtn: () => set((state) => ({ ...state, loginBtn: false })),
  activePage: { text: '', href: '' },
  theActivePage: (path) => set((state) => ({ ...state, activePage: path }))
});
settingsStore = persist(settingsStore);
let userStore = (set) => ({
  user: null,
  theSetUser: (user) => set((state) => ({ ...state, user })),
  theLogout: () => set((state) => ({ ...state, user: null }))
});

export const useUserStore = create(devtools(userStore));
export const useSettingsStore = create(devtools(settingsStore));
