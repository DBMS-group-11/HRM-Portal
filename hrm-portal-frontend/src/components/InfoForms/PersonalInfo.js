import { Container, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

const PersonalInfo = () => {
    return (
        <Container sx={{marginY:6}}>
            <Typography variant="h6" marginBottom={2}>Personal Information</Typography>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <TextField id="filled-basic" label="Name" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <TextField id="filled-basic" label="Employee ID" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <TextField id="filled-basic" label="Date of Birth" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <TextField id="filled-basic" label="Marital Status" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <TextField id="filled-basic" label="Gender" variant="standard" fullWidth/>
            </Grid>
        </Grid>
        </Container>
     );
}
 
export default PersonalInfo;