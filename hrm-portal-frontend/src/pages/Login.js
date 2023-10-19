import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import { Snackbar, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';
import { useState, useEffect } from 'react';

const Login = ({setLoggedIn}) => {

    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const handleSnackBarClick = () => {
        setSnackBarOpen(true);
      };

    const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setSnackBarOpen(false);
    };
    
    useEffect(() => {
        setLoggedIn(false);
    },[]);

    return ( 
        <Grid container height="100vh">
            <Grid
                item xs={8}
                margin={'auto'}
                height="100%"
                sx={{
                    backgroundImage:"url(/LoginBG.png)"
                }}
                display={'flex'}
            >
                <Box width={'fit-content'} margin={'auto'} color={'#FFF'}>
                    <Typography variant='h4'>
                        <b>HRM-Portal</b>
                    </Typography>
                    <Typography varient='body2'>
                        Streamline, Simplify, Succeed. HRM Made Easy!
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={4} margin={'auto'}>
                <Box width={'fit-content'} margin={'auto'}>
                    <LoginForm setLoggedIn={setLoggedIn} snackBarOpen={handleSnackBarClick} snackBarClose={handleSnackBarClose} />
                </Box>
            </Grid>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
                TransitionComponent={'TransitionRight'}
                message="Try to Remember your Password next time!"
            />
        </Grid>
     );
}
 
export default Login;