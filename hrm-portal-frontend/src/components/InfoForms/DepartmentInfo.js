import { EditOutlined } from "@mui/icons-material";
import { Container, IconButton, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";

const DepartmentInfo = ({data, isReadOnly, getData}) => {

    
    const departmentTypes = [
        {
            value: 'IT',
            label: 'IT'
        },
        {
            value:'Human Resources',
            label:'Human Resources'
        },
        {
            value:'Finance',
            label:'Finance'
        },
        {
            value:'Sales',
            label:'Sales'
        },
        {
            value:'Production',
            label:'Production'
        }
    ];

    const jobStatusTypes = [
        {
            value: 'Intern (fulltime)',
            label: 'Intern (fulltime)'
        },
        {
            value: 'Intern (parttime)',
            label: 'Intern (parttime)'
        },
        {
            value: 'Contract (fulltime)',
            label: 'Contract (fulltime)'
        },
        {
            value: 'Contract (parttime)',
            label: 'Contract (parttime)'
        },
        {
            value: 'Permanent',
            label: 'Permanent'
        },
        {
            value: 'Freelance',
            label: 'Freelance'
        }
    ];

    const supervisorList = [
        {
            value: 'Rajapakse',
            label: 'Rajapakse'
        },
        {
            value: 'Perera',
            label: 'Perera'
        }
    ]

    const [jobTitle, setJobTitle] = useState('');
    const [department, setDepartment] = useState('IT');
    const [status, setStatus] = useState('Permanent');
    const [payGrade, setPayGrade] = useState('Level1');
    const [supervisor, setSupervisor] = useState(supervisorList[0].value);

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
        <Container sx={{marginY:2, border:1, borderColor:'grey.400', borderRadius:2, padding:4}}>
            <Typography variant="h6" marginBottom={2}>Department Information</Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    id="job-title"
                    label="Job Title"
                    variant="standard"
                    fullWidth
                    required
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
                    required
                    select
                    SelectProps={{
                        native: true,
                    }}
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={department}
                    {...(isReadOnly ? {} : {onChange: (e) => setDepartment(e.target.value)})}
                >
                    {departmentTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    id="status"
                    label="Status"
                    variant="standard"
                    fullWidth
                    required
                    select
                    SelectProps={{
                        native: true,
                    }}
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={status}
                    {...(isReadOnly ? {} : {onChange: (e) => setStatus(e.target.value)})}
                >
                    {jobStatusTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    id="pay-grade"
                    label="Pay Grade"
                    variant="standard"
                    fullWidth
                    required
                    select
                    SelectProps={{
                        native: true,
                    }}
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={payGrade}
                    {...(isReadOnly ? {} : {onChange: (e) => setPayGrade(e.target.value)})}
                >
                    <option value={'Level1'}>Level 1</option>
                    <option value={'Level2'}>Level 2</option>
                    <option value={'Level3'}>Level 3</option>
                </TextField>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    id="supervisor"
                    label="Supervisor"
                    variant="standard"
                    fullWidth
                    required
                    select
                    SelectProps={{
                        native: true,
                    }}
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    value={[0]}
                    {...(isReadOnly ? {} : {onChange: (e) => setSupervisor(e.target.value)})}
                >
                    {supervisorList.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </Grid>
        </Grid>
        </Container>
    );
}

export default DepartmentInfo;