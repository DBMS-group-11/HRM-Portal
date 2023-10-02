import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import { createTheme ,ThemeProvider } from '@mui/material/styles';
import Dashboard from './pages/Dashboard';

const theme = createTheme({
  typography:{
    fontFamily: 'Poppins'
  }
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='//dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
