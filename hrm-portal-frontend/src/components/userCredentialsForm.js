import { Button, Container, Snackbar, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import axios from "axios";
import { useState } from "react";

const UserCredentialsForm = () => {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [changePassword, setChangePassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // console.log(userEmail, userPassword, newPassword);
        axios.patch('http://localhost:3000/api/users/editUserCredentials',{
            email:userEmail,
            oldPassword:userPassword,
            newPassword:newPassword
        })
        .then( res => {
            // console.log(res.data);
            if(res.data.success === 1) {
                console.log('success');
                alert("Password changed!");
                setChangePassword(false);
                setUserEmail('');
                setUserPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
            else {
                setError(res.data.message);
                console.log(res.data.message);
            }
        
        })
    }
    
    return (

        <Container sx={{marginY:2}}>
            {!changePassword && <Button variant="outlined" color="primary" onClick={() => setChangePassword(!changePassword)}>Edit Login Credentials</Button>}
            {changePassword &&
                <>
                <Typography variant="h6" marginY={2}>Edit User Credentials</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="user-email"
                            label="email"
                            variant="standard"
                            fullWidth
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            id="old-password"
                            label="old Password"
                            variant="standard"
                            fullWidth
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            id="new-password"
                            label="New Password"
                            variant="standard"
                            fullWidth
                            type="password"
                            value={newPassword}
                            {...(error && {error:true, helperText:error})}
                            onChange={(e) =>{
                                setNewPassword(e.target.value)
                                setError('')
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            id="confirm-password"
                            label="Confirm New Password"
                            variant="standard"
                            fullWidth
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                setError('')
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{width:'40%', m:'auto'}}
                            onClick={()=> {
                                setChangePassword(false);
                                setUserEmail('');
                                setUserPassword('');
                                setNewPassword('');
                                setConfirmPassword('');
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{width:'40%', m:'auto'}}
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
                </>
            }
        </Container>
    );
}
 
export default UserCredentialsForm;