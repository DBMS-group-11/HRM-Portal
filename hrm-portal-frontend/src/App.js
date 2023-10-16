import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import { createTheme ,ThemeProvider } from '@mui/material/styles';
import Dashboard from './pages/Dashboard';
import MyAccount from './pages/MyAccount';
import Page404 from './pages/Page404';
import RequestALeave from './pages/RequestALeave';
import ManageLeave from './pages/ManageLeave';
import AddEmployee from './pages/AddEmployee';
import LeaveApproval from './pages/LeaveApproval';

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
          <Route exact path='/' element={<Navigate to="/login" />}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/dashboard' element={<Dashboard/>}>
            {/* <Routes> */}
              {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
              <Route path='/dashboard/myAccount' element={<MyAccount/>}/>
              <Route path='/dashboard/manage-leaves' element={<ManageLeave/>}/>
              <Route path='/dashboard/manage-leaves/leave-approval' element={<LeaveApproval/>}/>
              <Route path='/dashboard/request-a-leave' element={<RequestALeave/>}/>
              <Route path='/dashboard/add-employee' element={<AddEmployee/>}/>
          </Route>
          <Route path='*' element={<Navigate to="/404" />}/>
          <Route path='/404' element={<Page404/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
