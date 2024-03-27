import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AvatarsStore, IAvatarsStore } from './store/AvatarStore';
import { Provider } from 'react-redux';
import store from './store';

interface IContext {
  avatars: IAvatarsStore;
}

export const Context = createContext<IContext>(null);

const root = ReactDOM.createRoot(document.getElementById('root'));

const avatars: IAvatarsStore = new AvatarsStore();

root.render(
    <Provider store={store}>
        <Context.Provider value={{
            avatars
        }}>
            <App />
        </Context.Provider>
    </Provider>
);