import { Box, Button, ButtonGroup, Container, Grid, Skeleton, Tab, TextField, Typography } from "@mui/material";
import axios from "axios";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


const Reports = () => {

    const [report1Data, setReport1Data] = useState([]);
    const [report2Data, setReport2Data] = useState([]);
    const [fromDateForR2, setFromDateForR2] = useState(dayjs('2022-10-29'));
    const [toDateForR2, setToDateForR2] = useState(dayjs('2023-11-30'));
    const [btnAvailableForR2, setBtnAvailableForR2] = useState(true);
    const [report3Data, setReport3Data] = useState([]);
    const [report4Data, setReport4Data] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState('1');

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    
    const handleReport1 = () => {
        console.log('Report 1');
        axios.post('http://localhost:3000/api/users/reports',{
            "reportNO":1
        })
        .then((response) => {
            console.log(response.data.data);
            setReport1Data(response.data.data);
            console.log(report1Data);
        })
        .finally(() => {
            setIsLoading(false);
        })
    };

    const handleReport2 = () => {
        console.log('Report 2');
        setBtnAvailableForR2(false);

        if(dayjs(fromDateForR2).isAfter(toDateForR2)){
            alert('From date should be less than To date');
            setBtnAvailableForR2(true);
            return;
        }

        axios.post('http://localhost:3000/api/users/reports',{
            "reportNO":2,
            "From": dayjs(fromDateForR2).format('YYYY-MM-DD'),
            "To": dayjs(toDateForR2).format('YYYY-MM-DD')
        })
        .then((response) => {
            console.log(response.data.data);
            setReport2Data(response.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setBtnAvailableForR2(true);
        })
    };

    const handleReport3 = () => {
        console.log('Report 3');
        axios.post('http://localhost:3000/api/users/reports',{
            "reportNO":3
        })
        .then((response) => {
            console.log(response.data.data1);
            setReport3Data(response.data);
            console.log(report3Data);
        })
    };

    useEffect(() => {
        handleReport1();
        // handleReport2();
    }, []);

    return ( 
        <Container>

            {/* <ButtonGroup variant="text">
                <Button onClick={handleReport1}>Report 1</Button>
                <Button onClick={handleReport2}>Report 2</Button>
                <Button onClick={handleReport3}>Report 3</Button>
                <Button onClick={()=>{handleReport(4)}}>Report 4</Button>
            </ButtonGroup> */}

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Number of Employees by department" value="1" />
                    <Tab label="Total leaves in the given period" value="2" />
                    <Tab label="Report 3" value="3" />
                    <Tab label="Report 4" value="4" />
                </TabList>
                </Box>
                <TabPanel value="1">
                    {report1Data.length > 0 && (
                        <>
                            <Typography variant="h6" marginTop={2}>
                                Number of Employees by department
                            </Typography>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: report1Data.map((item)=>{return item.DepartmentName}) }]}
                                series={[{ type: 'bar', data: report1Data.map((item)=>{return item.EmployeeCount}) }]}
                                width={960}
                                height={500}
                            />
                        </>
                    )}
                </TabPanel>
                {/* ################################################################################################### */}
                <TabPanel value="2">
                    <Typography variant="h6" marginTop={2} gutterBottom>
                        Total leaves in the period
                    </Typography>
                    <br />
                    <Box sx={{paddingX:6, display:'flex'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="From"
                                value={fromDateForR2}
                                onChange={(newValue) => {
                                    setFromDateForR2(newValue);
                                }}
                            />
                            <DatePicker
                                label="To"
                                value={toDateForR2}
                                onChange={(newValue) => {
                                    setToDateForR2(newValue);
                                }}
                                sx={{mx:2}}
                            />
                            <Button variant="outlined" onClick={handleReport2} sx={{paddingX:6}} disabled={!btnAvailableForR2}>Generate</Button>
                        </LocalizationProvider>
                    </Box>
                    {report2Data.length > 0 ? (
                        <>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: report2Data.map((item)=>{return item.DepartmentName}) }]}
                                series={[{ type: 'bar', data: report2Data.map((item)=>{return item.LeaveCount}) }]}
                                width={960}
                                height={480}
                            />
                        </>
                    ):(
                        <Typography variant="body">
                            <br />No leave data to show!
                        </Typography>
                    )}
                </TabPanel>
                {/* ################################################################################################### */}
                <TabPanel value="3">
                    <>
                        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Skeleton variant="circular" width={250} height={250} sx={{m:'auto'}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Skeleton variant="rectangular" width={'100%'} height={250} />
                            </Grid>
                            <Grid item xs={6}>
                                <Skeleton variant="rectangular" width={'100%'} height={160} />
                            </Grid>
                            <Grid item xs={6}>
                                <Skeleton variant="rectangular" width={'100%'} height={160} />
                            </Grid>
                            <Grid item xs={8}>
                                <Skeleton variant="rectangular" width={'100%'} height={160} />
                            </Grid>
                            <Grid item xs={4}>
                                <Skeleton variant="rectangular" width={'100%'} height={160} />
                            </Grid>
                        </Grid>
                    </>
                </TabPanel>
                {/* ################################################################################################### */}
                <TabPanel value="4">
                    <>
                        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Skeleton variant="circular" width={250} height={250} sx={{m:'auto'}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Skeleton variant="rectangular" width={'100%'} height={250} />
                            </Grid>
                            <Grid item xs={6}>
                                <Skeleton variant="rectangular" width={'100%'} height={160} />
                            </Grid>
                            <Grid item xs={6}>
                                <Skeleton variant="rectangular" width={'100%'} height={160} />
                            </Grid>
                            <Grid item xs={8}>
                                <Skeleton variant="rectangular" width={'100%'} height={160} />
                            </Grid>
                            <Grid item xs={4}>
                                <Skeleton variant="rectangular" width={'100%'} height={160} />
                            </Grid>
                        </Grid>
                    </>
                </TabPanel>
            </TabContext>



            {isLoading && (
                <>
                    <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Skeleton variant="circular" width={250} height={250} sx={{m:'auto'}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Skeleton variant="rectangular" width={'100%'} height={250} />
                        </Grid>
                        <Grid item xs={6}>
                            <Skeleton variant="rectangular" width={'100%'} height={160} />
                        </Grid>
                        <Grid item xs={6}>
                            <Skeleton variant="rectangular" width={'100%'} height={160} />
                        </Grid>
                        <Grid item xs={8}>
                            <Skeleton variant="rectangular" width={'100%'} height={160} />
                        </Grid>
                        <Grid item xs={4}>
                            <Skeleton variant="rectangular" width={'100%'} height={160} />
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
     );
}
 
export default Reports;