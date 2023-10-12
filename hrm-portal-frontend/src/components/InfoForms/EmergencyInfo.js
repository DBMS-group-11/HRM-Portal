import { Container, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";


const EmergencyInfo = ({data, isReadOnly}) => {
    const [name1, setName1] = useState('');
    const [telNo1, setTelNo1] = useState('');
    const [name2, setName2] = useState('');
    const [telNo2, setTelNo2] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if(isReadOnly){
            setName1(data && data.emergencyName1 || '');
            setTelNo1(data && data.emergencyTel1 || '');
            setName2(data && data.emergencyName2 || '');
            setTelNo2(data && data.emergencyTel2 || '');
            setAddress(data && data.address || '');
        }
    } , [isReadOnly, data]);

    return (
        <Container sx={{marginY:6}}>
            <Typography variant="h6" marginBottom={2}>Emergency Information</Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    id="name1"
                    label="Name"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={name1}
                    {...(isReadOnly ? {} : {onChange: (e) => setName1(e.target.value)})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="tel-no1"
                    label="Tel No"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={telNo1}
                    {...(isReadOnly ? {} : {onChange: (e) => setTelNo1(e.target.value)})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="name2"
                    label="Name"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={name2}
                    {...(isReadOnly ? {} : {onChange: (e) => setName2(e.target.value)})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="tel-no2"
                    label="Tel No"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={telNo2}
                    {...(isReadOnly ? {} : {onChange: (e) => setTelNo2(e.target.value)})}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="address"
                    label="Address"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={address}
                    {...(isReadOnly ? {} : {onChange: (e) => setAddress(e.target.value)})}
                />
            </Grid>
        </Grid>
        </Container>
     );
}
 
export default EmergencyInfo;