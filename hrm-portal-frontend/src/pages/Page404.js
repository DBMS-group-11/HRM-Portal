import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Page404 = () => {
    return ( 
        <Container sx={{textAlign:'center', my:6}}>
            <Typography variant="h2">Oops!</Typography>
            <Typography variant="h6">Page Not Found</Typography>
            <br />
            <img src="404_image.png" alt="404" width={'60%'}/>
            <br /> <br />
            <Button variant="outlined" component={Link} to="/" sx={{marginTop:2}}>
                Go Back to login
            </Button>
        </Container>
     );
}
 
export default Page404;