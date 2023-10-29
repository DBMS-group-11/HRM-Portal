import { Container, Grid, Skeleton } from "@mui/material";

const Reports = () => {
    return ( 
        <Container>
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
        </Container>
     );
}
 
export default Reports;