import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    }

    return ( 
        <Box paddingX={6}>
            <Typography variant="h5"><b>Hello Again!</b></Typography>
            <Typography variant="body2">Welcome Back</Typography>
            <form>
                <TextField label="username" variant="outlined" fullWidth sx={{my:1}}/>
                <TextField label="password" variant="outlined" fullWidth sx={{my:1}}/>
                <Box display={"flex"}>
                    <Typography variant="caption" marginY={'auto'} marginRight={6}>Forgot password?</Typography>
                    <Button variant="contained" sx={{px:10, mt:1, flexGrow:1}} onClick={handleSubmit}>
                        Login
                    </Button>
                </Box>
            </form>
        </Box>
     );
}
 
export default LoginForm;