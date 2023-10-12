import { Box } from "@mui/material";
import PersonalInfo from "../components/InfoForms/PersonalInfo";
import DepartmentInfo from "../components/InfoForms/DepartmentInfo";
import EmergencyInfo from "../components/InfoForms/EmergencyInfo";

const AddEmployee = () => {
    return ( 
            <Box maxWidth={"840px"} margin={'auto'}>
                <PersonalInfo />
                <DepartmentInfo />
                <EmergencyInfo />
            </Box>
     );
}
 
export default AddEmployee;