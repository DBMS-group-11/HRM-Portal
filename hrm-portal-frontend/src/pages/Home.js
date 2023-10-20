import { Avatar, Box, Card, CardContent, CardMedia, Container, Grid, Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import jwt from 'jwt-decode';

const Home = () => {

    const [cookies] = useCookies(['u-token']);

    const [noOfLeaves, setNoOfLeaves] = useState({
        Annual: 0,
        Casual: 0,
        Maternity: 0,
        NoPay: 0
    });
    const [empDetails, setEmpDetails] = useState({});
    const [totalLeavesTaken, setTotalLeavesTaken] = useState(0);

    useEffect(() => {
        document.title = 'Home | HRM-Portal';
        //fetch data
        const leavesData = {
            Annual: 10,
            Casual: 15,
            Maternity: 8,
            NoPay: 3
        }; 
        setNoOfLeaves(leavesData);
        
        const decoded = jwt(cookies['u-token']);
        // console.log(decoded.result[0].EmployeeID);

        setEmpDetails({
            name: decoded.result[0].Username,
            employeeId: decoded.result[0].EmployeeID,
            status: 'Permanent',
            payGrade: 'Lv1',
            company: 'Jupiter Apparels (Pvt) Ltd',
            branch: 'Colombo Branch',
            country: 'Sri Lanka'
        });

        setTotalLeavesTaken(leavesData.Annual + leavesData.Casual + leavesData.Maternity + leavesData.NoPay);
        },[]);

    return ( 
        <Container>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Hello There!
                    </Typography>
                    <Typography variant="body2" component="div">
                        It's a good day to work!
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" component="div">
                        {empDetails.name}
                    </Typography>
                    <Typography variant="body2" component="div" textAlign={'right'}>
                        {empDetails.employeeId}
                    </Typography>
                </Box>
                <Avatar alt="John Doe" src="/company.jpg" sx={{ width: 72, height: 72, ml:3 }} />

            </Toolbar>
            <Grid container spacing={2} marginTop={2}>
                <Grid item md={12} lg={6} paddingX={4}>
                    <PieChart
                        //shades of blue
                        colors={['#2196f3', '#1976d2', '#0d47a1', '#82b1ff', '#e3f2fd']}
                        series={[
                            {
                            data: [
                                //enum('Annual','Casual','Maternity','No-Pay')
                                { id: 0, value: noOfLeaves.Annual, label: 'Annual' },
                                { id: 1, value: noOfLeaves.Casual, label: 'Casual' },
                                { id: 2, value: noOfLeaves.Maternity, label: 'Maternity' },
                                { id: 3, value: noOfLeaves.NoPay, label: 'No-Pay' },
                                { id: 4, value: 50-totalLeavesTaken, label: 'Leaves Left'}
                            ],
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
                        fullWidth
                        height={400}
                    />
                </Grid>
                <Grid item md={12} lg={6}>
                    <Grid container spacing={2} alignItems={'center'} height={'100%'}>
                        <Grid item xs={12}>
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
                                    <Typography variant="h4">{totalLeavesTaken}</Typography>
                                    <Typography variant="caption">Leaves Taken</Typography>
                                </Grid>
                                <Grid item xs={4} textAlign={'center'}>
                                    <Typography variant="h4">{50-totalLeavesTaken}</Typography>
                                    <Typography variant="caption">Leaves Left</Typography>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid
                            container
                            spacing={2}
                            justifyContent={'center'}
                            sx={{border:1, borderColor:'grey.400', borderRadius:2, padding:2}}
                            >
                                <Grid item xs={8} textAlign={'center'}>
                                    <Typography variant="h4">{empDetails.status}</Typography>
                                    <Typography variant="caption">Employee Status</Typography>
                                </Grid>
                                <Grid item xs={4} textAlign={'center'}>
                                    <Typography variant="h4">{empDetails.payGrade}</Typography>
                                    <Typography variant="caption">Pay Grade</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={12} lg={6}>
                    <Card elevation={0}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {empDetails.company}
                            </Typography>
                            <Typography variant="body2">
                                {empDetails.branch}
                            </Typography>
                            <Typography variant="body2">
                                {empDetails.country}
                            </Typography>
                            <Typography variant="body2">
                                {empDetails.company} is a leading apparel manufacturer in Sri Lanka.
                                Here we are using HRM-Portal to manage our employees. This is a demo application.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={12} lg={6}>
                    <Card elevation={0}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/company.jpg"
                            alt="Jupiter Apparels (Pvt) Ltd"
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
     );
}
 
export default Home;