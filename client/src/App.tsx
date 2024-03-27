import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';
import { check } from './http/userAPI';
import { useDispatch } from 'react-redux';
import { IUser, setUser } from './features/users/usersSlice';

const App = observer(() => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
            .then((data: IUser) => {
                dispatch(setUser(data));
            })
            .catch(() => setLoading(false))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {!loading && (
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            )}
        </>
    );
});

export default App;
