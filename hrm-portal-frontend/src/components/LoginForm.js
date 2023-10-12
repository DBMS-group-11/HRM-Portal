import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onValidUsername = (val) => {
        const usernameRegex = /^[A-Za-z0-9_.@]+$/
        return usernameRegex.test(val)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(onValidUsername(email)){
            // console.log(username, password)
            const values={ email , password };
            axios.post('http://localhost:3000/api/users/login',values)
            .then(res=>{  
                console.log(res.data)
                console.log(res.data.success);
            if(res.data.success==1){
                navigate('/dashboard');
            }
        }).catch(err=>{
            console.log("Axios post Error");
        })
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
                <TextField label="username" variant="outlined" fullWidth sx={{my:1}} onChange={e=>setEmail(e.target.value)}/>
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