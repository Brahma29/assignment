import Login from './Components/Login';
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Signup from './Components/Signup';
import { useState } from 'react';
import Alert from './Components/Alert';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
    <Router>
      <Alert alert={alert}/>
    <Routes>
    <Route exact path="/" element={<Dashboard showAlert={showAlert}/>} exact/>
    <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
    <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
