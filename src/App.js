import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './Home';
import Profile from './Profile';
import Footer from './components/footer';
import Portfolio from './Portfolio';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Helmet>
          <title>{'Raj Maisuriya - Fullstack Developer'}</title>
          <meta name="description" content="Web Developer" />
          <meta property="og:title" content={'Raj Maisuriya'} />
          <meta property="og:description" content="Web Developer" />
          <meta property="og:image" content={'https://res.cloudinary.com/dqm29weex/image/upload/v1734267969/Screenshot_2024-12-15_183242_hzb3bt.png'} />
          <meta property="og:url" content={'https://raj-maisuriya.web.app/'} />
          <meta property="og:type" content="website" />
        </Helmet>
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
