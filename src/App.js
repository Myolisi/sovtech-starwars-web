import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Details from './components/Details';
import People from './components/People';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<People />} />
        <Route path="/people/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
