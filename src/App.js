import './App.css';
import react, { useState } from 'react';
import Navbar from './components/Navbar'
import TextUpper from './components/TextUpper';
import About from './components/About';
import Alert from './components/Alert';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";


function App() {

  const [mode, setmode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (mssg, type) => {
    setAlert({
      mssg: mssg,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }


  const handleOnClick = () => {
    if (mode == 'light') {
      setmode('dark');
      document.body.style.backgroundColor = 'black';
      showAlert("Theme is now changed to dark", "success")
    }
    else {
      setmode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Theme is now changed to light", "dark")

    }
  }

  return (
    <>
      <Router>
        <Navbar aboutText="About" mode={mode} handleOnClick={handleOnClick} />
        <Alert alert={alert} />

        <Routes>
          <Route exact path='/' element={<TextUpper text="Enter Your Text Below" mode={mode} />} />
          <Route exact path='/about' element={<About />} />
        </Routes>

      </Router>
      {/* <About /> */}
    </>
  );
}


export default App;
