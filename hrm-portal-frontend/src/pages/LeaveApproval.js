import { Container, TextField, Typography,Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { CheckCircleOutline, DoNotDisturb } from '@mui/icons-material';
import dayjs from 'dayjs';

const LeaveApproval = () => {

    const [reason, setReason] = useState('');
    const [leaveType, setLeaveType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [noOfDays, setNoOfDays] = useState('');

    return ( 
        <Container sx={{marginY:2}} maxWidth={'md'}>
            <Grid
                container
                spacing={2}
                justifyContent={'center'}
                sx={{border:1, borderColor:'grey.500', borderRadius:2, padding:2}}
            >
                <Grid item xs={12}>
                    <Typography variant="h5">Approve/Deny</Typography>
                    <Typography variant="caption" marginBottom={2}>You can approve or deny a request</Typography>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="filled-basic"
                        InputProps={{readOnly: true}}
                        value={"Sajitha"}
                        label="Name"
                        variant="standard"
                        fullWidth
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="filled-basic"
                        InputProps={{readOnly: true}}
                        label="Job Title"
                        variant="standard"
                        fullWidth
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Grid>                    
                <Grid item xs={4}>
                    <TextField
                        id="filled-basic"
                        InputProps={{readOnly: true}}
                        label="Department"
                        variant="standard"
                        fullWidth
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={2}
                        justifyContent={'center'}
                        marginTop={1}
                    >
                        <Grid item xs={3} textAlign={'center'}>
                            <Typography variant="h4">Lv 1</Typography>
                            <Typography variant="caption">Pay Grade</Typography>
                        </Grid>
                        <Grid item xs={3} textAlign={'center'}>
                            <Typography variant="h4">50</Typography>
                            <Typography variant="caption">Total Leaves</Typography>
                        </Grid>
                        <Grid item xs={3} textAlign={'center'}>
                            <Typography variant="h4">4</Typography>
                            <Typography variant="caption">Leaves Taken</Typography>
                        </Grid>
                        <Grid item xs={3} textAlign={'center'}>
                            <Typography variant="h4">46</Typography>
                            <Typography variant="caption">Leaves Left</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="filled-basic"
                        InputProps={{readOnly: true}}
                        label="Reason"
                        variant="standard"
                        fullWidth
                        multiline
                        rows={2}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="filled-basic"
                        InputProps={{readOnly: true}}
                        label="Leave Type"
                        variant="standard"
                        fullWidth
                        SelectProps={{
                            native: true,
                        }}
                        onChange={(e) => setLeaveType(e.target.value)}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="filled-basic"
                        InputProps={{readOnly: true}}
                        label="No. of Days"
                        variant="standard"
                        fullWidth
                        value={noOfDays}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="start-date"
                        InputProps={{readOnly: true}}
                        label="From"
                        variant="standard"
                        fullWidth
                        value={fromDate}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="end-date"
                        InputProps={{readOnly: true}}
                        label="To"
                        variant="standard"
                        fullWidth
                        value={toDate}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Current Date: {dayjs().toString()}</Typography>
                </Grid>
                <Grid item xs={6} marginTop={4}>
                    <Button
                        variant="outlined"
                        fullWidth
                        color='error'
                        endIcon={<DoNotDisturb/>}
                    >
                        Deny
                    </Button>
                </Grid>
                <Grid item xs={6} marginTop={4}>
                    <Button
                        variant="contained"
                        fullWidth
                        endIcon={<CheckCircleOutline/>}
                    >
                        Approve
                    </Button>
                </Grid>
            </Grid>
        </Container>
     );
}
 
export default LeaveApproval;