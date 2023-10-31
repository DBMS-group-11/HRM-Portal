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
import { PieChart } from '@mui/x-charts/PieChart';


const Reports = () => {

    const [report1Data, setReport1Data] = useState([]);
    
    const [report2Data, setReport2Data] = useState([]);

    const [fromDateForR2, setFromDateForR2] = useState(dayjs('2022-10-29'));
    const [toDateForR2, setToDateForR2] = useState(dayjs('2023-11-30'));
    const [btnAvailableForR2, setBtnAvailableForR2] = useState(true);
    
    const [report3Data, setReport3Data] = useState(null);
    
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

    const handleReport4 = () => {
        console.log('Report 4');
        // axios.post('http://localhost:3000/api/users/reports',{
        //     "reportNO":4
        // })
        // .then((response) => {
        //     console.log(response.data.data1);
        //     setReport4Data(response.data);
        //     console.log(report4Data);
        // })
    };

    useEffect(() => {
        handleReport1();
        handleReport2();
        handleReport3();
    }, []);

    return ( 
        <Container>

            <ButtonGroup variant="text">
                <Button onClick={handleReport1}>Report 1</Button>
                <Button onClick={handleReport2}>Report 2</Button>
                <Button onClick={handleReport3}>Report 3</Button>
                <Button onClick={handleReport4}>Report 4</Button>
            </ButtonGroup>

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Number of Employees by department" value="1" />
                    <Tab label="Total leaves in the given period" value="2" />
                    <Tab label="Summary" value="3" />
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
                                colors={['#82b1ff']}
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
                                colors={['#82b1ff']}
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
                    {(report3Data != null && report3Data.data1.length > 0) ? (
                        <Grid container textAlign={'center'}>
                            <Grid item xs={12}>
                                <Typography variant="h6" marginY={2}>
                                    Number of Employees by department
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: report3Data.data1.map((item)=>{return item.DepartmentName}) }]}
                                    series={[{ type: 'bar', data: report3Data.data1.map((item)=>{return item.EmployeeCount}) }]}
                                    width={500}
                                    height={300}
                                    colors={['#82b1ff']}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <PieChart
                                    //shades of blue
                                    colors={['#2196f3', '#1976d2', '#0d47a1', '#82b1ff', '#e3f2fd']}
                                    series={[
                                        {
                                        data: report3Data.data1.map((item)=>{return {id: item.DepartmentName, value: item.EmployeeCount, label: item.DepartmentName}}),
                                        innerRadius: 60,
                                        outerRadius: 150,
                                        paddingAngle: 4,
                                        cornerRadius: 5,
                                        startAngle: -90,
                                        endAngle: 270,
                                        cx: 150,
                                        cy: 150
                                        },
                                    ]}
                                    fullwidth
                                    height={400}
                                />
                            </Grid>
                            
                            {/* <Grid item xs={12}>
                                <Typography variant="h6" marginTop={2}>
                                    Number of Employees by Job Title
                                </Typography>
                            </Grid> */}
                            <Grid item xs={6}>
                                <Typography variant="h6" marginTop={2}>
                                    Number of Employees by Job Title
                                </Typography>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: report3Data.data2.map((item)=>{return item.JobTitleName}) }]}
                                    series={[{ type: 'bar', data: report3Data.data2.map((item)=>{return item.EmployeeCount}) }]}
                                    width={500}
                                    height={300}
                                    colors={['#82b1ff']}
                                />
                            </Grid>
                            
                            {/* <Grid item xs={12}>
                                <Typography variant="h6" marginTop={2}>
                                    Number of Employees by Pay Grade
                                </Typography>
                            </Grid> */}
                            <Grid item xs={6}>
                                <Typography variant="h6" marginTop={2}>
                                    Number of Employees by Pay Grade
                                </Typography>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: report3Data.data3.map((item)=>{return item.PayGradeName}) }]}
                                    series={[{ type: 'bar', data: report3Data.data3.map((item)=>{return item.EmployeeCount}) }]}
                                    width={500}
                                    height={300}
                                    colors={['#82b1ff']}
                                />
                            </Grid>
                        </Grid>
                    ):(
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