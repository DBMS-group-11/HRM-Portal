import { Container, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";

const PersonalInfo = ({data, isReadOnly}) => {

    const [name, setName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [dob, setDob] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        if(isReadOnly){
            setName(data && data.name || '');
            setEmployeeId(data && data.employeeId || '');
            setDob(data && data.dob || '');
            setMaritalStatus(data && data.maritalStatus || '');
            setGender(data && data.gender || '');
        }
    } , [isReadOnly, data]);
    
    return (

        <Container sx={{marginY:6}}>
            <Typography variant="h6" marginBottom={2}>Personal Information</Typography>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <TextField
                    id="name"
                    label="Name"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={name}
                    {...(isReadOnly ? {} : {onChange: (e) => setName(e.target.value)})}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                    id="emplyee-id"
                    label="Employee ID"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={employeeId}
                    {...(isReadOnly ? {} : {onChange: (e) => setEmployeeId(e.target.value)})}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                    id="dob"
                    label="Date of Birth"
                    variant="standard"
                    fullWidth
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