import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';
import StockPage from './pages/StockPage';
import AgentPage from './pages/AgentPage';
import DrawerAppBar from './components/RespAppWithDraw';
import Home from './components/Home';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AlgoProvider} from "./components/AlgoContext";
import NotFound from './pages/NotFound';
import ErrorBoundary from "./components/ErrorBoundary";




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Tidal '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {
  return (
    <Router>
       <ErrorBoundary>
          <AlgoProvider>
            <div className="App">
                <DrawerAppBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/About" element={<About/>}/>
                    <Route path="/Contact" element={<Contact/>}/>
                    <Route path="/:agent/:stock" element={<StockPage/>} />
                    <Route path="/:agent" element={<AgentPage/>} />
                    <Route path="*" element={<NotFound/>} /> {/* Catch-all route for 404 */}
                </Routes>
                <Copyright sx={{ pt: 4 }} />
            </div>
            <Box />
          </AlgoProvider>
       </ErrorBoundary>

    </Router>
  );
}

export default App;
