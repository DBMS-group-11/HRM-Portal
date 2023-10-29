import { Container, Typography } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const columns = [
    { field: 'emp_id', headerName: 'ID', width: 130 },
    { field: 'name', headerName: 'Name', width: 230 },
    { field: 'job-title', headerName: 'Job Title', width: 230 },
    { field: 'department', headerName: 'Department', width: 230 },
    { field: 'no-of-days', headerName: 'No of Days', width: 130 }
  ];
  
  // const rows = [
  //   { id: 1, emp_id: 'EMP001', name: 'John Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
  //   { id: 2, emp_id: 'EMP002', name: 'Jane Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
  //   { id: 3, emp_id: 'EMP003', name: 'John Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
  //   { id: 4, emp_id: 'EMP004', name: 'Jane Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
  //   { id: 5, emp_id: 'EMP005', name: 'John Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
  //   { id: 6, emp_id: 'EMP006', name: 'Jane Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
  //   { id: 7, emp_id: 'EMP007', name: 'John Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
  //   { id: 8, emp_id: 'EMP008', name: 'Jane Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 }
  // ];


const ManageLeave = () => {

  const [rows, setRows] = useState([]);
  const [manageLeavesData, setManageLeavesData] = useState({});

  useEffect(() => {
    document.title = 'Manage Leave | HRM-Portal';

    axios.get('http://localhost:3000/api/users/getNotApprovedLeaves')
    .then(res => {
      console.log(res.data.result);

      setManageLeavesData(res.data.result);

      let data = [];
      for (let i = 0; i < res.data.result.length; i++) {
        data.push({
          id: i+1,
          emp_id: res.data.result[i].EmployeeID,
          name: res.data.result[i].EmployeeName,
          'job-title': res.data.result[i].JobTitleName,
          department: res.data.result[i].DepartmentName,
          'no-of-days': res.data.result[i].LeaveDayCount
        });
      }
      // console.log(data);
      setRows(data);

    })
    .catch(err => {
      console.log(err);
    });

  },[]);

  const navigate = useNavigate();

  const handleRowClick = (row) => {
    // sending id as state to the next page
    const leaveData = manageLeavesData.filter((leave) => leave.EmployeeID === row.row.emp_id)[0];
    // console.log(leaveData);
    navigate('/dashboard/manage-leaves/leave-approval', {state: leaveData});
  }

  return ( 
      <Container>
          <br />
          <Typography variant="h6">
              Manage Leaves
          </Typography>
          <br />
          <div style={{ height: '80%', width: '100%' }}>
          <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
              pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
              },
              }}
              pageSizeOptions={[10, 15]}
              onRowClick={(row) => handleRowClick(row)}
              
          />
          </div>
      </Container>
    );
}
 
export default ManageLeave;