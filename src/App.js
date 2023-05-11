import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import CoinPage from './components/CoinPage';
import { makeStyles } from 'tss-react/mui';


function App() {
  const useStyles = makeStyles()(() => {
    return {
      App: {
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh"
      }
    };
  });

  const { classes } = useStyles();

  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header />  
      <Routes>  
        <Route exact path="/" element={<Homepage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
