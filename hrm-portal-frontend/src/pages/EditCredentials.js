import { Container } from "@mui/material";
import UserCredentialsForm from "../components/userCredentialsForm";

const EditCredentials = () => {
    return ( 
        <Container maxWidth={720}>
            {/* <h1>Edit Credentials</h1> */}
            <UserCredentialsForm />
        </Container>
     );
}
 
export default EditCredentials;