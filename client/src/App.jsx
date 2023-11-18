import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Footer from './Pages/Footer';
import Main from './Pages/Main';
import Navbar from './Pages/Navbar';
import Perfil from './Pages/Perfil';

function App() {

  return (
    <Router>
      <main>
        <Navbar />
        <Routes>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/" element={<Main />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
