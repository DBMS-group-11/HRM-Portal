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
                    <Typography variant="body1">
                        {time.toLocaleTimeString()}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
     );
}
 
export default Home;