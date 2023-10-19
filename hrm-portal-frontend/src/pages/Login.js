import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';
import { useEffect } from 'react';

const Login = ({setLoggedIn}) => {
    
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
                    <LoginForm setLoggedIn={setLoggedIn} />
                </Box>
            </Grid>
        </Grid>
     );
}
 
export default Login;