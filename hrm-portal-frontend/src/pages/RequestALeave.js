import SendIcon from '@mui/icons-material/Send';
import { Container, TextField, Typography,Button } from "@mui/material";
import Grid from '@mui/material/Grid';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const RequestALeave = () => {
    return ( 
        <Container sx={{marginY:2}} maxWidth={'md'}>
            <Typography variant="h5">Request A Leave</Typography>
            <Typography variant="caption" marginBottom={2}>Your request will be confirmed on approval of the supervisor</Typography>
        <Grid container spacing={2} justifyContent={'center'}>
            <Grid item xs={12}>
                <TextField id="filled-basic" label="Reason" variant="standard" fullWidth multiline rows={4}/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="filled-basic" label="Leave Type" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={4}>
                {/* <DatePicker /> */}
            </Grid>
            <Grid item xs={4}>
                <TextField id="filled-basic" label="End Date" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <TextField id="filled-basic" label="No. of Days" variant="standard" fullWidth/>
            </Grid>
            <Grid item xs={6} marginTop={4}>
                <Button variant="contained" fullWidth endIcon={<SendIcon/>}>
                    Submit
                </Button>
            </Grid>
        </Grid>
        </Container>
     );
}
 
export default RequestALeave;