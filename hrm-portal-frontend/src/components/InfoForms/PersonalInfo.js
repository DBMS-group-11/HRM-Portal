import { Container, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";

const PersonalInfo = ({data, isReadOnly, getData}) => {

    const [name, setName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        if(isReadOnly){
            setName(data && data.name || '');
            setEmployeeId(data && data.employeeId || '');
            setAddress(data && data.address || '');
            setCountry(data && data.country || '');
            setUsername(data && data.username || '');
            setEmail(data && data.email || '');
            setDob(data && data.dob || '');
            setMaritalStatus(data && data.maritalStatus || '');
            setGender(data && data.gender || '');
        }
        else{
            let formData = {name, address, country, username, email, dob, maritalStatus, gender};
            getData(formData);
        }
    } , [isReadOnly, data, name, address, country, username, email, dob, maritalStatus, gender]);
    
    return (

        <Container sx={{
            marginY:2, border:1, borderColor:'grey.400', borderRadius:2, padding:4
        }}>
            <Typography variant="h6" marginBottom={2}>Personal Information</Typography>
        <Grid container spacing={2}>
            {isReadOnly ? (
                <>
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
                        id="employee-id"
                        label="Employee ID"
                        variant="standard"
                        fullWidth
                        required
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                        value={employeeId}
                        {...(isReadOnly ? {} : {onChange: (e) => {
                            setEmployeeId(e.target.value);
                        }})}
                    />
                </Grid>
                </>
            ):(
                <Grid item xs={12}>
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
            )}
            <Grid item xs={8}>
                <TextField 
                    id="address"
                    label="Address"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={address}
                    {...(isReadOnly ? {} : {onChange: (e) => setAddress(e.target.value)})}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                    id="country"
                    label="Country"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={country}
                    {...(isReadOnly ? {} : {onChange: (e) => setCountry(e.target.value)})}
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