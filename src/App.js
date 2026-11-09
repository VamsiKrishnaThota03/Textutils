import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TextUpper from './components/TextUpper';
import About from './components/About';
import Alert from './components/Alert';

const initialMode = () => {
  const saved = localStorage.getItem('textutils-mode');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function App() {
  const [mode, setMode] = useState(initialMode);
  const [alert, setAlert] = useState(null);
  const timer = useRef(null);

  const showAlert = useCallback((mssg, type) => {
    setAlert({ mssg, type });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAlert(null), 1800);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', mode);
    localStorage.setItem('textutils-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    showAlert(`Theme is now ${next}`, 'success');
  };

  return (
    <Router>
      <Navbar title="TextUtils" aboutText="About" mode={mode} handleOnClick={toggleMode} />
      <Alert alert={alert} />
      <main className="container py-4 py-md-5">
        <Routes>
          <Route path="/" element={<TextUpper heading="Enter your text below" showAlert={showAlert} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<TextUpper heading="Enter your text below" showAlert={showAlert} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
