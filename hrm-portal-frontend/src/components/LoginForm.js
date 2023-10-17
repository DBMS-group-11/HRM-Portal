import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errUserName, setErrUserName] = useState(false);
    const [errorCredentials, setErrorCredentials] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onValidUsername = (val) => {
        const usernameRegex = /^[A-Za-z0-9_.@]+$/
        return usernameRegex.test(val)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(onValidUsername(email)){
            // console.log(username, password)
            const values={ email , password };
            axios.post('http://localhost:3000/api/users/login',values)
            .then(res=>{
                console.log(res.data.success);
                if(res.data.success==1){
                    navigate('/dashboard/home');
                }
            }).catch(err=>{
                console.log("Axios post Error");
                // alert("Invalid username or password");
                setErrorCredentials(true);
            }).finally(()=>{
                setIsLoading(false);
            });
        }
        else{
            setErrUserName(true);
            setIsLoading(false);
        }

        // REMOVE THIS LINE LATER=================================================
        // WORKAROUND TO BYPASS LOGIN
        if(email === '11' && password === '11'){
            navigate('/dashboard/home');
        }
        // REMOVE UPTO HERE=======================================================
    }

    return ( 
        <Box paddingX={6}>
            <Typography variant="h5"><b>Hello Again!</b></Typography>
            <Typography variant="body2">Welcome Back</Typography>
            <form>
                <TextField
                    label="username"
                    variant="outlined"
                    fullWidth
                    {...(errUserName && {error:true, helperText:"Invalid username"})}
                    {...(errorCredentials && {error:true})}
                    sx={{my:1}}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                        setErrUserName(false);
                        setErrorCredentials(false);
                    }}
                />
                <TextField 
                    label="password" 
                    variant="outlined" 
                    type="password" 
                    fullWidth 
                    {...(errorCredentials && {error:true, helperText:"Invalid email or password"})}
                    sx={{my:1}} 
                    onChange={(e)=>{
                        setPassword(e.target.value);
                        setErrorCredentials(false);
                    }}
                />
                <Box display={"flex"}>
                    <Typography variant="caption" marginY={'auto'} marginRight={6}>Forgot password?</Typography>
                    {isLoading ? (
                        <Button variant="contained" disabled sx={{px:10, mt:1, flexGrow:1}}>Loading...</Button>
                    ):(
                        <Button variant="contained" sx={{px:10, mt:1, flexGrow:1}} onClick={handleSubmit}> Login </Button>
                    )}
                </Box>
            </form>
        </Box>
    );
}

export default LoginForm;