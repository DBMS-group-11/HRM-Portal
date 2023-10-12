import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onValidUsername = (val) => {
        const usernameRegex = /^[A-Za-z0-9_.]+$/
        return usernameRegex.test(val)
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(onValidUsername(username)){
            console.log(username, password)
        }
        else{
            alert("Invalid username")
        }

        // navigate('/dashboard');
    }

    return ( 
        <Box paddingX={6}>
            <Typography variant="h5"><b>Hello Again!</b></Typography>
            <Typography variant="body2">Welcome Back</Typography>
            <form>
                <TextField label="username" variant="outlined" fullWidth sx={{my:1}} onChange={e=>setUsername(e.target.value)}/>
                <TextField label="password" variant="outlined" type="password" fullWidth sx={{my:1}} onChange={e=>setPassword(e.target.value)}/>
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