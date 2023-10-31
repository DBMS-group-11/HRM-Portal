import { Box, Button, IconButton } from "@mui/material";
import PersonalInfo from "../components/InfoForms/PersonalInfo";
import DepartmentInfo from "../components/InfoForms/DepartmentInfo";
import EmergencyInfo from "../components/InfoForms/EmergencyInfo";
import CustomAttribute from "../components/InfoForms/CustomAttribute";
import { useEffect, useState } from "react";
import UserCredentialsForm from "../components/userCredentialsForm";
import { CloseOutlined, EditOutlined } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import axios from "axios";
import dayjs from "dayjs";
import jwt from "jwt-decode";

const MyAccount = () => {

    const [data, setData] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [myData, setMyData] = useState({});
    const [customAttributes, setCustomAttributes] = useState([]);

    const [cookies] = useCookies(['x-ual', 'x-uData']);

    const [uData, setUData] = useState(jwt(cookies['x-uData']));

    const getPersonalInfo = (e) => {
        myData.personalInfo = e;
        myData.personalInfo = { ...e, employeeID: uData.EmployeeID ,UserID:uData.UserID};
    };

    const getDepartmentInfo = (e) => {
        myData.departmentInfo = e;
    };

    const getEmergencyInfo = (e) => {
        myData.emergencyInfo = e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('====submit====');
        
        setData(myData)
        setIsReadOnly(true);
        myData.CustomAttributesInfo = customAttributes;

        console.log(myData);

        axios.put("http://localhost:3000/api/users/editMyAccount",myData)
        .then(res=>{
            console.log(res.data.success);
            if(res.data.success===1){
                console.log("updated");
            }
        }).catch(err => {
            console.log("Axios post error");
        }).finally(() => {
            console.log("final");
        });
    };
    /////////////////////////////////
    useEffect(() => {
        document.title = "My Account | HRM-Portal";
        
        // console.log("---------------")
        // console.log(cookies['x-uData'])
        const data = { EmployeeID: uData?.EmployeeID ,UserID: uData?.UserID}; 
        console.log(data);
    
        axios.post('http://localhost:3000/api/users/myAccount', data)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data.success) {
                    setData({
                        "personalInfo": {
                            "name": res.data.PersonalInfo?.personalInfo?.EmployeeName || "N/A",
                            "employeeID": res.data.PersonalInfo?.personalInfo?.EmployeeID || "N/A",
                            "address": res.data.PersonalInfo?.personalInfo?.Address || "N/A",
                            "country": res.data.PersonalInfo?.personalInfo?.Country || "N/A",
                            "username": res.data.PersonalInfo?.personalInfo?.Username || "N/A",
                            "email": res.data.PersonalInfo?.personalInfo?.Email || "N/A",
                            "userAccountType":res.data.UserAccountLv?.[0]?.UserAccountLevelName || "N/A",
                            "dob": dayjs(res.data.PersonalInfo?.personalInfo?.DateOfBirth).format("YYYY/MM/DD") || "N/A",
                            "maritalStatus": res.data.PersonalInfo?.personalInfo?.MaritalStatus || "N/A",
                            "gender": res.data.PersonalInfo?.personalInfo?.Gender || "N/A",
                            "dependentName": res.data.DependentInfo?.[0]?.DependentName || null,
                            "dependentAge": res.data.DependentInfo?.[0]?.DependentAge || null
                        },
                        "departmentInfo": {
                            "jobTitle": res.data.JobTitleInfo?.[0]?.JobTitleName || "N/A",
                            "department": res.data.DepartmentInfo?.[0]?.DepartmentName || "N/A",
                            "status": res.data.EmployeeStatusInfo?.[0]?.EmploymentStatusName || "N/A",
                            "payGrade": res.data.PayGradesInfo?.[0]?.PayGradeName || "N/A",
                            "supervisor": res.data.SupervisorsInfo?.SupervisorName || "N/A"
                        },
                        "emergencyInfo": {
                            "name1": res.data.EmergencyInfo?.[0]?.PrimaryName || "N/A",
                            "telNo1": res.data.EmergencyInfo?.[0]?.PrimaryPhoneNumber || "N/A",
                            "name2": res.data.EmergencyInfo?.[0]?.SecondaryName || "N/A",
                            "telNo2": res.data.EmergencyInfo?.[0]?.SecondaryPhoneNumber || "N/A",
                            "emergencyAddress": res.data.EmergencyInfo?.[0]?.Address || "N/A"
                        },
                        "CustomAttributes": customAttributes
                    });
                }
            });
    }, []);
    
    return (
        <Box maxWidth={"840px"} margin={'auto'}>
            {cookies['x-ual'] <= 2 && (
                <Box sx={{ textAlign: 'right' }}>
                    {
                        !isReadOnly && (
                            <Button variant="contained" sx={{ paddingX: 4 }} onClick={handleSubmit}>
                                Save
                            </Button>
                        )
                    }
                    <IconButton
                        sx={{ marginLeft: 2, boxShadow: 1 }}
                        onClick={() => setIsReadOnly(!isReadOnly)}
                    >
                        {isReadOnly ? <EditOutlined /> : <CloseOutlined />}
                    </IconButton>
                </Box>
            )}
            <PersonalInfo data={data} isReadOnly={isReadOnly} getData={getPersonalInfo} />
            <DepartmentInfo data={data} isReadOnly={isReadOnly} getData={getDepartmentInfo} />
            <EmergencyInfo data={data} isReadOnly={isReadOnly} getData={getEmergencyInfo} />
            
            {/* custom attributes */}
            {customAttributes.map((customAttribute, index) => (
                <CustomAttribute key={index} getData={(e) => {
                    // myData[`customAttribute${index}`] = e;
                    // myData.noOfCustomAttributes = index+1;
                    customAttributes[index] = e;
                }}/>
            ))}
            <Button
                variant="outlined"
                color="primary"
                sx={{width:'100%'}}
                onClick={() => {
                    setCustomAttributes([...customAttributes, {}]);
                }}
            >
                Add Custom Attribute
            </Button>

            <UserCredentialsForm />
        </Box>
    );
}

export default MyAccount;