import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(data);
      user.setIsAuth(true);
    }).finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
});

export default App;
