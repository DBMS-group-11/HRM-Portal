import { Container } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

const columns = [
    { field: 'emp_id', headerName: 'ID', width: 130 },
    { field: 'name', headerName: 'Name', width: 230 },
    { field: 'job-title', headerName: 'Job Title', width: 230 },
    { field: 'department', headerName: 'Department', width: 230 },
    { field: 'no-of-days', headerName: 'No of Days', width: 130 }
  ];
  
  const rows = [
    { id: 1, emp_id: 'EMP001', name: 'John Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
    { id: 2, emp_id: 'EMP002', name: 'Jane Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
    { id: 3, emp_id: 'EMP003', name: 'John Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
    { id: 4, emp_id: 'EMP004', name: 'Jane Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
    { id: 5, emp_id: 'EMP005', name: 'John Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
    { id: 6, emp_id: 'EMP006', name: 'Jane Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
    { id: 7, emp_id: 'EMP007', name: 'John Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 },
    { id: 8, emp_id: 'EMP008', name: 'Jane Doe', 'job-title': 'Software Engineer', department: 'IT', 'no-of-days': 2 }
  ];


const ManageLeave = () => {

  const navigate = useNavigate();

  const handleRowClick = (row) => {
    console.log(row);
    navigate('/dashboard/manage-leaves/leave-approval');
  }

  return ( 
      <Container>
          <div style={{ height: 400, width: '100%' }}>
          <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
              pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
              },
              }}
              pageSizeOptions={[5, 10]}
              onRowClick={(row) => handleRowClick(row)}
              
          />
          </div>
      </Container>
    );
}
 
export default ManageLeave;