/*import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './pages/Login';

import SongSearch from './pages/SongSearch';

function App() {
  const user = useAuthContext();
  console.log("app use authcontext user: ", user)

  return (
    <HashRouter>
          <Routes>
            <Route 
              path="/" 
              element={user ? <SongSearch /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
          </Routes>
      </HashRouter>
  );
}

export default App;*/
import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './pages/Login';
import SongSearch from './pages/SongSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


function App() {
  const { user } = useAuthContext()
  const token = useSelector((state) => state.auth.token);
  ;


return (
  <HashRouter>
    <Routes>
      <Route
        path="/"
        element={user? <SongSearch /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
    </Routes>
  </HashRouter>
);
}

export default App;