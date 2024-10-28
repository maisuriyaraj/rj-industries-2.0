import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './Home';
import Profile from './Profile';
import Footer from './components/footer';
import Portfolio from './Portfolio';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/portfolio' element={<Portfolio />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
