import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Main from './pages/MainPage';
import Topup from './pages/TopupPage';
import Transaction from './pages/TransactionPage';
import Akun from './pages/ProfilePage';
import Service from './pages/ServicePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
          <Route path="/topup" element={<ProtectedRoute><Topup /></ProtectedRoute>} />
          <Route path="/service" element={<ProtectedRoute><Service /></ProtectedRoute>} />
          <Route path="/transaction" element={<ProtectedRoute><Transaction /></ProtectedRoute>} />
          <Route path="/akun" element={<ProtectedRoute><Akun /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
