import { Button, ButtonGroup, Container, Grid, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

const Reports = () => {

    const [report1Data, setReport1Data] = useState([]);
    const [report2Data, setReport2Data] = useState([]);
    const [report3Data, setReport3Data] = useState([]);
    const [report4Data, setReport4Data] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
    };

    const handleReport3 = () => {
        console.log('Report 3');
        axios.post('http://localhost:3000/api/users/reports',{
            "reportNO":3
        })
        .then((response) => {
            console.log(response.data.data);
            setReport3Data(response.data.data);
            console.log(report3Data);
        })
    };

    useEffect(() => {
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
    }, []);

    return ( 
        <Container>
            <ButtonGroup variant="text">
                <Button onClick={handleReport1}>Report 1</Button>
                <Button onClick={()=>{console.log(report1Data)}}>Report 2</Button>
                <Button onClick={handleReport3}>Report 3</Button>
                {/* <Button onClick={()=>{handleReport(4)}}>Report 4</Button> */}
            </ButtonGroup>

            {report1Data.length > 0 && (
                <>
                    <Typography variant="h6" marginTop={2}>
                        Number of Employees by department
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: report1Data.map((item)=>{return item.DepartmentName}) }]}
                        series={[{ type: 'bar', data: report1Data.map((item)=>{return item.EmployeeCount}) }]}
                        width={600}
                        height={500}
                    />
                </>
            )}

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