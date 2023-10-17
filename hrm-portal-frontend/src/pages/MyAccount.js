import { Box } from "@mui/material";
import PersonalInfo from "../components/InfoForms/PersonalInfo";
import DepartmentInfo from "../components/InfoForms/DepartmentInfo";
import EmergencyInfo from "../components/InfoForms/EmergencyInfo";
import { useEffect, useState } from "react";
import UserCredentialsForm from "../components/userCredentialsForm";

const MyAccount = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        document.title = "My Account | HRM-Portal";
        // fetch('http://localhost:8000/employees')
        // .then(res => {
        //     return res.json();
        // })
        // .then(data => {
        //     setData(data);
        // }).catch(err => {
        //     console.log(err);
        // })

        setData({
            name: "John Doe",
            employeeId: "EMP-001",
            address: "No. 123, Main Street, Colombo 01",
            country: "Sri Lanka",
            username: "johndoe",
            email: "johnd@mail.com",
            dob: "01/01/1990",
            maritalStatus: "Married",
            gender: "Male",
            jobTitle: "Software Engineer",
            department: "Software Development",
            jobStatus: "Permanent",
            payGrade: "PG-1",
            supervisor: "Rajapakse",
            emergencyName1: "Jane Doe",
            emergencyTel1: "0771234567",
            emergencyName2: "Sirisena",
            emergencyTel2: "0777654321",
            emergencyaddress: "No. 123, Main Street, Colombo 01"
        });

    }, []);
    return ( 
            <Box maxWidth={"840px"} margin={'auto'}>
                <PersonalInfo data={data} isReadOnly={true}/>
                <DepartmentInfo data={data} isReadOnly={true}/>
                <EmergencyInfo data={data} isReadOnly={true}/>
                <UserCredentialsForm />
            </Box>
     );
}
 
export default MyAccount;