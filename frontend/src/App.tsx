import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './pages/Login';
import User from './interfaces/User';
import Register from './pages/Register';
import './css/App.css';

import SongSearch from './pages/SongSearch';
import { useEffect } from 'react';

function App() {
  const authContext = useAuthContext();
  const user: User = authContext.user;
  

  return (
    <div className="app">
    <HashRouter>
      <div className="main_container">
          <Routes>
            <Route 
              path="/" 
              element={user != null && user.id != null? <SongSearch /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!(user != null && user.id != null) ? <Login /> : <Navigate to="/" />} 
            />
             <Route
                path="/register"
                element={!(user != null && user.id != null) ? <Register /> : <Navigate to="/" />}
              />
          </Routes>
        </div>
      </HashRouter>
      </div>
  );
}

export default App;