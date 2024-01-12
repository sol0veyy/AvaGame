import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { IUserStore, UserStore } from './store/UserStore';
import { AvatarsStore, IAvatarsStore } from './store/AvatarStore';

interface IContext {
  user: IUserStore;
  avatars: IAvatarsStore;
}

export const Context = createContext<IContext>(null)

const root = ReactDOM.createRoot(document.getElementById('root')!);

const user: IUserStore = new UserStore();
const avatars: IAvatarsStore = new AvatarsStore();

root.render(
  <Context.Provider value={{
    user,
    avatars
  }}>
    <App />
  </Context.Provider>
);