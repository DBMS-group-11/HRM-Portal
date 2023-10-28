import { Container, TextField, Typography,Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { CheckCircleOutline, DoNotDisturb } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const LeaveApproval = () => {

    // const [name, setName] = useState('');
    // const [jobTitle, setJobTitle] = useState('');
    // const [department, setDepartment] = useState('');
    // const [reason, setReason] = useState('');
    // const [leaveType, setLeaveType] = useState('');
    // const [fromDate, setFromDate] = useState('');
    // const [toDate, setToDate] = useState('');
    // const [noOfDays, setNoOfDays] = useState('');
    const [leaveData, setLeaveData] = useState({});
    const [cookies] = useCookies(['x-uData']);

    const location = useLocation();
    useEffect(() => {
        console.log(location.state);
        document.title = 'Leave Approval | HRM-Portal';

        // fetch data with leaveId = location.state.id
        const data = {
            name: 'Sajitha',
            jobTitle: 'Software Engineer',
            department: 'IT',
            payGrade: 'Level 1',
            totalLeaves: 50,
            leavesTaken: 4,
            leavesLeft: 46,
            reason: location.state.Reason,
            leaveType: location.state.LeaveType,
            fromDate: dayjs(location.state.FirstAbsentDate).format('YYYY-MM-DD'),
            toDate: dayjs(location.state.LastAbsentDate).format('YYYY-MM-DD'),
            noOfDays: location.state.LeaveDayCount,
        }

        setLeaveData(data);

    },[]);

    const handleApprove = () => {
        axios.post('http://localhost:3000/api/users/approveLeaves',{
            "leaveID": location.state.LeaveID,
            "EmployeeID": leaveData.EmployeeID,
            "ApprovedByID":cookies['x-uData'].EmployeeID,
            "ApprovedDateTime":dayjs().format('YYYY-MM-DD HH:mm:ss'),
        })
        .then(res => {
            console.log('Approved');
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
        
        console.log('Approved');
    }


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
                        id="name"
                        InputProps={{readOnly: true}}
                        label="Name"
                        variant="standard"
                        fullWidth
                        value={leaveData.name}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="job-title"
                        InputProps={{readOnly: true}}
                        label="Job Title"
                        variant="standard"
                        fullWidth
                        value={leaveData.jobTitle}
                    />
                </Grid>                    
                <Grid item xs={4}>
                    <TextField
                        id="department"
                        InputProps={{readOnly: true}}
                        label="Department"
                        variant="standard"
                        fullWidth
                        value={leaveData.department}
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
                            <Typography variant="h4">{leaveData.payGrade}</Typography>
                            <Typography variant="caption">Pay Grade</Typography>
                        </Grid>
                        <Grid item xs={3} textAlign={'center'}>
                            <Typography variant="h4">{leaveData.totalLeaves}</Typography>
                            <Typography variant="caption">Total Leaves</Typography>
                        </Grid>
                        <Grid item xs={3} textAlign={'center'}>
                            <Typography variant="h4">{leaveData.leavesTaken}</Typography>
                            <Typography variant="caption">Leaves Taken</Typography>
                        </Grid>
                        <Grid item xs={3} textAlign={'center'}>
                            <Typography variant="h4">{leaveData.leavesLeft}</Typography>
                            <Typography variant="caption">Leaves Left</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="reason"
                        InputProps={{readOnly: true}}
                        label="Reason"
                        variant="standard"
                        fullWidth
                        multiline
                        rows={2}
                        value={leaveData.reason}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id=";ease-type"
                        InputProps={{readOnly: true}}
                        label="Leave Type"
                        variant="standard"
                        fullWidth
                        value={leaveData.leaveType}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="no-of-days"
                        InputProps={{readOnly: true}}
                        label="No. of Days"
                        variant="standard"
                        fullWidth
                        value={leaveData.noOfDays}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="from-date"
                        InputProps={{readOnly: true}}
                        label="From"
                        variant="standard"
                        fullWidth
                        value={leaveData.fromDate}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="end-date"
                        InputProps={{readOnly: true}}
                        label="To"
                        variant="standard"
                        fullWidth
                        value={leaveData.toDate}
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