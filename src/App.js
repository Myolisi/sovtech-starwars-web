import './App.css';
import People from './components/People';
import { BrowserRouter as Router, Route, Routes, Link as RouterLink } from 'react-router-dom';
import Details from './components/Details';

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
