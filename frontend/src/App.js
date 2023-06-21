import React, { useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./Components/Main";
import Login from "./Components/Login";
import Error from "./Components/Error";

export const UserContext = createContext(null);

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
