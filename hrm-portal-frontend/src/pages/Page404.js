import { Container } from "@mui/material";
import { Link } from "react-router-dom";

const Page404 = () => {
    return ( 
        <Container>
            <h1>404 Page Not Found</h1>
            <Link to='/'>Go Back Home</Link>
        </Container>
     );
}
 
export default Page404;