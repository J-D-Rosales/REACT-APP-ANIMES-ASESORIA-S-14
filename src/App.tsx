import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Animes from './pages/Animes';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import History from './pages/History';
// No te olvides de importar lo que queda

// Componente para rutas protegidas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/animes" element={<ProtectedRoute><Animes /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );

}