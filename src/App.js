import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddDevice from './AddDevice'
import Home from './Home';
import UpdateDevice from './UpdateDevice';

function App() {
  return (
    <>
      <nav>
        <h2 style={{color: 'white'}}>UCLAcorns</h2>
      </nav>
      <div className='container'>
        <Router>
          <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/add' element={<AddDevice />} /> 
          <Route exact path='/update/:id' element={<UpdateDevice />} /> 
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
