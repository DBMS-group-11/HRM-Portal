import { Container, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

const EmergencyInfo = () => {
    return (
        <Container sx={{marginY:6}}>
            <Typography variant="h6" marginBottom={2}>Emergency Information</Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField id="filled-basic" label="Name" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <TextField id="filled-basic" label="Tel No" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <TextField id="filled-basic" label="Name" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <TextField id="filled-basic" label="Tel No" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="filled-basic" label="Address" variant="standard" fullWidth/>
            </Grid>
        </Grid>
        </Container>
    );
}
export default EmergencyInfo;