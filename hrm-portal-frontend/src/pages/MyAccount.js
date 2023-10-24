import { Box, Button, IconButton } from "@mui/material";
import PersonalInfo from "../components/InfoForms/PersonalInfo";
import DepartmentInfo from "../components/InfoForms/DepartmentInfo";
import EmergencyInfo from "../components/InfoForms/EmergencyInfo";
import { useEffect, useState } from "react";
import UserCredentialsForm from "../components/userCredentialsForm";
import { CloseOutlined, EditOutlined } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import axios from "axios";

const MyAccount = () => {

    const [data, setData] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [myData, setMyData] = useState({});
    const [cookies] = useCookies(['x-ual', 'x-uData']);

    const getPersonalInfo = (e) => {
        myData.personalInfo = e;
        myData.personalInfo = {...e, employeeID: cookies['x-uData'].EmployeeID};
    };

    const getDepartmentInfo = (e) => {
        myData.departmentInfo = e;
    };

    const getEmergencyInfo = (e) => {
        myData.emergencyInfo = e;
    };

    ///////////////////////////////////////////
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        console.log(myData);
        setData(myData)
        setIsReadOnly(true);
        // axios.post("http://localhost:3000/api/users/reg",myData)
        // .then(res=>{
        //     console.log(res.data.success);
        //     if(res.data.success===1){
        //         navigate('/dashboard/home');
        //     }
        // }).catch(err => {
        //     console.log("Axios post error");
        // }).finally(() => {
        //     console.log("final");
        // });
    };
    /////////////////////////////////

    useEffect(() => {
        document.title = "My Account | HRM-Portal";
        axios.post('http://localhost:3000/api/users/myAccount',cookies['x-uData'].UserID)
        .then(res =>{
            console.log(res);
        })

        setData({
            "personalInfo": {
                "name": "John Doe",
                "employeeID":cookies['x-uData'].EmployeeID,
                "address": "No. 123, Main Street, Colombo 01",
                "country": "Sri Lanka",
                "username": "johndoe",
                "email": "johnd@mail.com",
                "userAccountType": "Level4",
                "dob": "01/01/1990",
                "maritalStatus": "Unmarried",
                "gender": "Male",
                "dependentName": "Jane Doe",
                "dependentAge": 10
            },
            "departmentInfo": {
                "jobTitle": "Software Engineer",
                "department": "Software Development",
                "status": "Permanent",
                "payGrade": "PG-1",
                "supervisor": "Rajapakse"
            },
            "emergencyInfo": {
                "name1": "Jane Doe",
                "telNo1": "0771234567",
                "name2": "Sirisena",
                "telNo2": "0777654321",
                "emergencyAddress": "No. 123, Main Street, Colombo 01"
            }
        });

    }, []);
    return ( 
            <Box maxWidth={"840px"} margin={'auto'}>
                {cookies['x-ual'] <= 2 && (
                    <Box sx={{textAlign:'right'}}>
                    {
                        !isReadOnly && (
                            <Button variant="contained" sx={{paddingX:4}} onClick={handleSubmit}>
                                Save
                            </Button>
                        )
                    }
                    <IconButton
                        sx={{marginLeft:2, boxShadow:1}}
                        onClick={() => setIsReadOnly(!isReadOnly)}
                    >
                        {isReadOnly ? <EditOutlined /> : <CloseOutlined />}
                    </IconButton>
                </Box>
                )}
                <PersonalInfo data={data} isReadOnly={isReadOnly} getData={getPersonalInfo}/>
                <DepartmentInfo data={data} isReadOnly={isReadOnly} getData={getDepartmentInfo}/>
                <EmergencyInfo data={data} isReadOnly={isReadOnly} getData={getEmergencyInfo}/>
                <UserCredentialsForm />
            </Box>
     );
}
 
export default MyAccount;