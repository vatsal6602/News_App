import './App.css';
import React, {useState} from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const App = ()=> {

  const [progress, setProgress] = useState(0)

  
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color="#f11946"
        progress={progress}

      />

          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress}  country="us" pageSize={12} category="top" key="world" />} />
            <Route exact path="/business" element={<News setProgress={setProgress}  country="us" pageSize={12} category="business" key="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress}  country="us" pageSize={12} category="entertainment" key="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={setProgress}  country="us" pageSize={12} category="health" key="health" />} />
            <Route exact path="/science" element={<News setProgress={setProgress}  country="us" pageSize={12} category="science" key="science" />} />
            <Route exact path="/sports" element={<News setProgress={setProgress}  country="us" pageSize={12} category="sports" key="sports" />} />
            <Route exact path="/technology" element={<News setProgress={setProgress}  country="us" pageSize={12} category="technology" key="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  
}

export default App
