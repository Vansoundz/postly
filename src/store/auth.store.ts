import { writable } from "svelte/store";
import type { User } from "../interfaces/user.interface";

interface Auth {
  user?: User;
  loading: boolean;
  isLoggedIn: boolean;
}

const createStore = () => {
  let { subscribe, update, set } = writable<Auth>({
    user: undefined,
    loading: false,
    isLoggedIn: false,
  });

  return {
    subscribe,
    init: () =>
      set({
        user: undefined,
        loading: true,
        isLoggedIn: false,
      }),
    login: (user?: User) => {
      update((store) => {
        return {
          ...store,
          loading: false,
          isLoggedIn: true,
          user,
        };
      });
    },
    logout: () => {
      update((store) => {
        return {
          ...store,
          user: undefined,
          isLoggedIn: false,
          loading: false,
        };
      });
    },
  };
};

export const auth = createStore();
