import create from 'zustand';
import { useLayoutEffect } from 'react';
import createContext from 'zustand/context';
import { devtools } from 'zustand/middleware';
import { fetcher } from '../components/UTS/fetcher';
let store;
const initialState = {
  loginBtn: false,
  activePage: { text: '', href: '/' },
  user: null,
  lang: 'ar'
};

const zustandContext = createContext();
export const Provider = zustandContext.Provider;
// An example of how to get types
/** @type {import('zustand/index').UseStore<typeof initialState>} */
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
  return create(
    devtools((set, get) => ({
      ...initialState,
      ...preloadedState,
      theLoginBtn: (type) => set((state) => ({ loginBtn: type })),
      theDefaultLoginBtn: () => set((state) => ({ loginBtn: false })),
      theActivePage: (path) => set((state) => ({ activePage: path })),
      theSetUser: (user) => set({ user: user }),
      setLang: (lang) => set({ lang: lang }),
      theLogout: async () => {
        try {
          set({ user: null });

          await fetcher('auth/logout', 'POST');
        } catch (error) {
          return null;
        }
      }
    }))
  );
};

export function useCreateStore(initialState) {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState);
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState);
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState
      });
    }
  }, [initialState]);

  return () => store;
}
