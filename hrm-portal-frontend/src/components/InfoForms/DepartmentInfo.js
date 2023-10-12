import { Container, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

const DepartmentInfo = () => {
    return (
        <Container sx={{marginY:6}}>
            <Typography variant="h6" marginBottom={2}>Department Information</Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField id="filled-basic" label="Job Title" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <TextField id="filled-basic" label="Department" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <TextField id="filled-basic" label="Status" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <TextField id="filled-basic" label="Pay Grade" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <TextField id="filled-basic" label="Supervisor" variant="standard" fullWidth/>
            </Grid>
        </Grid>
        </Container>
     );
}
 
export default DepartmentInfo;