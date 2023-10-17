import { Container, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

const Home = () => {
    const [time, setTime] = useState(new Date());

    return ( 
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="h6">
                        Hello There!
                    </Typography>
                    <Typography variant="body1">
                        Today is a good day to start working on your project.
                    </Typography>
                </Grid>
                <Grid item xs={4} textAlign={'right'}>
                    <Typography variant="body1">
                        {dayjs().format("dddd, MMMM D, YYYY")}
                    </Typography>
                </Grid>
                <Grid item xs={6} textAlign={'center'}>
                    <Typography variant="h6">
                        My Details
                    </Typography>
                    <img src="/company.jpg" width="80%" alt="company logo" style={{margin:6}}/>
                    <Typography variant="body1">
                        John Doe
                    </Typography>
                    <Typography variant="body1">
                        EM-001
                    </Typography>
                    <Typography variant="body1">
                        Software Engineer | IT Department
                    </Typography>
                </Grid>
                <Grid item xs={6} textAlign={'center'}>
                    <Typography variant="h6">
                        Our Company
                    </Typography>
                    <img src="/company.jpg" width="80%" alt="company logo" style={{margin:6}}/>
                    <Typography variant="body1">
                        ABC Pvt Ltd.
                    </Typography>
                    <Typography variant="body1">
                        Colombo Branch
                    </Typography>
                    <Typography variant="body1">
                        Sri Lanka
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={2}
                        justifyContent={'center'}
                        marginTop={1}
                        sx={{border:1, borderColor:'grey.400', borderRadius:2, padding:2}}
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
            </Grid>
        </Container>
     );
}
 
export default Home;