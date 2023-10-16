import { Container, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";

const DepartmentInfo = ({data, isReadOnly, getData}) => {
    const [jobTitle, setJobTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('');
    const [payGrade, setPayGrade] = useState('');
    const [supervisor, setSupervisor] = useState('');

    useEffect(() => {
        if(isReadOnly){
            setJobTitle(data && data.jobTitle || '');
            setDepartment(data && data.department || '');
            setStatus(data && data.jobStatus || '');
            setPayGrade(data && data.payGrade || '');
            setSupervisor(data && data.supervisor || '');
        }else{
            let formData = {jobTitle, department, status, payGrade, supervisor};
            getData(formData);
        }
    } , [isReadOnly, data, jobTitle, department, status, payGrade, supervisor]);

    return (
        <Container sx={{marginY:6}}>
            <Typography variant="h6" marginBottom={2}>Department Information</Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    id="job-title"
                    label="Job Title"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={jobTitle}
                    {...(isReadOnly ? {} : {onChange: (e) => setJobTitle(e.target.value)})}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="department"
                    label="Department"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={department}
                    {...(isReadOnly ? {} : {onChange: (e) => setDepartment(e.target.value)})}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    id="status"
                    label="Status"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={status}
                    {...(isReadOnly ? {} : {onChange: (e) => setStatus(e.target.value)})}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    id="pay-grade"
                    label="Pay Grade"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={payGrade}
                    {...(isReadOnly ? {} : {onChange: (e) => setPayGrade(e.target.value)})}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    id="supervisor"
                    label="Supervisor"
                    variant="standard"
                    fullWidth
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={supervisor}
                    {...(isReadOnly ? {} : {onChange: (e) => setSupervisor(e.target.value)})}
                />
            </Grid>
        </Grid>
        </Container>
     );
}
 
export default DepartmentInfo;