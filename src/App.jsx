// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutScream from './pages/AboutScream/AboutScream';

function App() {
  return (
    <Router basename="/screaver_temp">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-scream" element={<AboutScream />} />
      </Routes>
    </Router>
  );
}

export default App;
