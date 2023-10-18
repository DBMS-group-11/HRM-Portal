import SendIcon from '@mui/icons-material/Send';
import { Container, TextField, Typography,Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';


const RequestALeave = () => {

    const [reason, setReason] = useState('');
    const [leaveType, setLeaveType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [noOfDays, setNoOfDays] = useState('');

    const leaveTypes = [
        {
            value: 'Casual Leave',
            label: 'Casual Leave'
        },
        {
            value: 'Sick Leave',
            label: 'Sick Leave'
        },
        {
            value: 'Maternity Leave',
            label: 'Maternity Leave'
        },
        {
            value: 'Comp Off',
            label: 'Comp Off'
        },
        {
            value: 'Other',
            label: 'Other'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const leaveData = {reason, leaveType, fromDate, toDate, noOfDays};

        console.log(leaveData);
    }

    return ( 
        <Container sx={{marginY:2}} maxWidth={'md'}>
            <br />
            <Grid
                container
                spacing={2}
                justifyContent={'center'}
                sx={{border:1, borderColor:'grey.400', borderRadius:2, padding:2}}
            >
                <Grid item xs={4} textAlign={'center'}>
                    <Typography variant="h4">50</Typography>
                    <Typography variant="caption">Total Leaves</Typography>
                </Grid>
                <Grid item xs={4} textAlign={'center'}>
                    <Typography variant="h4">4</Typography>
                    <Typography variant="caption">Leaves Taken</Typography>
                </Grid>
                <Grid item xs={4} textAlign={'center'}>
                    <Typography variant="h4">46</Typography>
                    <Typography variant="caption">Leaves Left</Typography>
                </Grid>
            </Grid>
            
            <br />
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid
                container
                spacing={2}
                justifyContent={'center'}
                sx={{border:1, borderColor:'grey.500', borderRadius:2, padding:2}}
            >
                <Grid item xs={12}>
                    <Typography variant="h5">Request A Leave</Typography>
                    <Typography variant="caption" marginBottom={2}>Your request will be confirmed on approval of the supervisor</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="filled-basic"
                        label="Reason"
                        variant="standard"
                        fullWidth
                        required
                        multiline
                        rows={2}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="filled-basic"
                        label="Leave Type"
                        variant="standard"
                        select
                        required
                        fullWidth
                        SelectProps={{
                            native: true,
                        }}
                        onChange={(e) => setLeaveType(e.target.value)}
                    >
                        {leaveTypes.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={4}>
                    <DatePicker
                        label="From *"
                        onChange={(newValue) => {
                            setFromDate(newValue);
                            if(toDate){
                                const diffTime = Math.abs(toDate - newValue);
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                setNoOfDays(diffDays);
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <DatePicker
                        label="To *"
                        onChange={(newValue) => {
                            setToDate(newValue)
                            if(fromDate){
                                const diffTime = Math.abs(newValue - fromDate);
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                setNoOfDays(diffDays);
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="filled-basic"
                        label="No. of Days"
                        variant="standard"
                        fullWidth
                        required
                        value={noOfDays}
                        onChange={(e) => setNoOfDays(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Note: You can only request for a leave 7 days prior to the leave date</Typography>
                </Grid>
                <Grid item xs={6} marginTop={4}>
                    <Button
                        variant="outlined"
                        fullWidth
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={6} marginTop={4}>
                    <Button
                        variant="contained"
                        fullWidth
                        endIcon={<SendIcon/>}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
            </LocalizationProvider>
        </Container>
     );
}
 
export default RequestALeave;