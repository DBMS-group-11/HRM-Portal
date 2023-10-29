import { Container, Typography } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const columns = [
    { field: 'emp_id', headerName: 'ID', width: 130 },
    { field: 'name', headerName: 'Name', width: 230 },
    { field: 'gender', headerName: 'Gender', width: 230 },
    { field: 'job-title', headerName: 'Job Title', width: 230 },
    { field: 'department', headerName: 'Department', width: 230 }
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


const Supervisees = () => {

  const [rows, setRows] = useState([]);
  const [cookies] = useCookies(['x-ual', 'x-uData']);
  console.log(cookies['x-uData'].EmployeeID)

  useEffect(() => {
    document.title = 'My Supervisees | HRM-Portal';

    axios.post('http://localhost:3000/api/users/supervisees',{EmployeeID:cookies['x-uData'].EmployeeID})
    .then(res => {
      // console.log(res.data.supervisees);
      
      let data = [];
      for (let i = 0; i < res.data.supervisees.length; i++) {
        data.push({
          id: i+1,
          emp_id: res.data.supervisees[i].EmployeeID,
          name: res.data.supervisees[i].EmployeeName,
          gender: res.data.supervisees[i].Gender,
          'job-title': res.data.supervisees[i].JobTitleID,
          department: res.data.supervisees[i].DepartmentID
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
    navigate('/dashboard/supervisees/edit-employee', {state: {EmployeeID: row.row.emp_id}});
  }

  return ( 
      <Container>
          <br />
          <Typography variant="h6">
              Supervisees
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
 
export default Supervisees;