import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './pages/Login';

import SongSearch from './pages/SongSearch';

function App() {
  const user = useAuthContext();

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

export default App;