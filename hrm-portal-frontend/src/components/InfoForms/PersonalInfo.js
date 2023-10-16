import { Container, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";

const PersonalInfo = ({data, isReadOnly, getData}) => {

    const [name, setName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        if(isReadOnly){
            setName(data && data.name || '');
            setEmployeeId(data && data.employeeId || '');
            setUsername(data && data.username || '');
            setEmail(data && data.email || '');
            setDob(data && data.dob || '');
            setMaritalStatus(data && data.maritalStatus || '');
            setGender(data && data.gender || '');
        }
        else{
            let formData = {name, employeeId, username, email, dob, maritalStatus, gender};
            getData(formData);
        }
    } , [isReadOnly, data, name, employeeId, username, email, dob, maritalStatus, gender]);
    
    return (

        <Container sx={{
            marginY:2, border:1, borderColor:'grey.400', borderRadius:2, padding:4
        }}>
            <Typography variant="h6" marginBottom={2}>Personal Information</Typography>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <TextField
                    id="name"
                    label="Name"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={name}
                    {...(isReadOnly ? {} : {onChange: (e) => {
                        setName(e.target.value);
                    }})}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                    id="emplyee-id"
                    label="Employee ID"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={employeeId}
                    {...(isReadOnly ? {} : {onChange: (e) => setEmployeeId(e.target.value)})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id="username"
                    label="username"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={username}
                    {...(isReadOnly ? {} : {onChange: (e) => setUsername(e.target.value)})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={email}
                    {...(isReadOnly ? {} : {onChange: (e) => setEmail(e.target.value)})}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                    id="dob"
                    label="Date of Birth"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={dob}
                    {...(isReadOnly ? {} : {onChange: (e) => setDob(e.target.value)})}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                    id="marital-status"
                    label="Marital Status"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                        readOnly: isReadOnly,
                    }}    
                    value={maritalStatus}
                    {...(isReadOnly ? {} : {onChange: (e) => setMaritalStatus(e.target.value)})}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                    id="gender"
                    label="Gender"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={gender}
                    {...(isReadOnly ? {} : {onChange: (e) => setGender(e.target.value)})}
                />
            </Grid>
        </Grid>
        </Container>
    );
}

export default PersonalInfo;