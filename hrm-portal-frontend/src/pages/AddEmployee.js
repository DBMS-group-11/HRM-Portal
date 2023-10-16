import { Box, Button } from "@mui/material";
import PersonalInfo from "../components/InfoForms/PersonalInfo";
import DepartmentInfo from "../components/InfoForms/DepartmentInfo";
import EmergencyInfo from "../components/InfoForms/EmergencyInfo";
import { useState } from "react";

const AddEmployee = ({children}) => {

    const [myData, setMyData] = useState({});

    const getPersonalInfo = (e) => {
        myData.personalInfo = e;
    };

    const getDepartmentInfo = (e) => {
        myData.departmentInfo = e;
    };

    const getEmergencyInfo = (e) => {
        myData.emergencyInfo = e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        console.log(myData);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        console.log('cancel');
    };

    return ( 
            <Box maxWidth={"840px"} margin={'auto'}>
                <PersonalInfo getData={getPersonalInfo}/>
                <DepartmentInfo getData={getDepartmentInfo}/>
                <EmergencyInfo getData={getEmergencyInfo}/>
                <br/>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{width:'48%'}}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{width:'48%', float:'right'}}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Box>
     );
}
 
export default AddEmployee;