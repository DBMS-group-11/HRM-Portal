import { Box, Button, IconButton } from "@mui/material";
import PersonalInfo from "../components/InfoForms/PersonalInfo";
import DepartmentInfo from "../components/InfoForms/DepartmentInfo";
import EmergencyInfo from "../components/InfoForms/EmergencyInfo";
import { useEffect, useState } from "react";
import UserCredentialsForm from "../components/userCredentialsForm";
import { CloseOutlined, EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const EditEmployee = () => {

    const [data, setData] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [myData, setMyData] = useState({});

    const navigate = useNavigate();

    const getPersonalInfo = (e) => {
        myData.personalInfo = e;
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
        document.title = "Edit Employee | HRM-Portal";
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
            employeeId: "EMP-0001",
            address: "No. 123, Main Street, Colombo 01",
            country: "Sri Lanka",
            username: "johndoe",
            email: "johnd@mail.com",
            userAccountType: "Level4",
            dob: "01/01/1990",
            maritalStatus: "Unmarried",
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
            emergencyaddress: "No. 123, Main Street, Colombo 01",
            dependentName: "Jane Doe",
            dependentAge: 10
        });

    }, []);
    return ( 
            <Box maxWidth={"840px"} margin={'auto'}>
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
                        onClick={() => navigate('/dashboard/supervisees')}
                    >
                        <CloseOutlined />
                    </IconButton>
                </Box>
                <PersonalInfo data={data} isReadOnly={isReadOnly} getData={getPersonalInfo}/>
                <DepartmentInfo data={data} isReadOnly={isReadOnly} getData={getDepartmentInfo}/>
                <EmergencyInfo data={data} isReadOnly={isReadOnly} getData={getEmergencyInfo}/>
            </Box>
     );
}
 
export default EditEmployee;