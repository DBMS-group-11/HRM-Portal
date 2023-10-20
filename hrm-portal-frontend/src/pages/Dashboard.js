import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Groups2Icon from '@mui/icons-material/Groups2';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const drawerWidth = 320;
const drawerLinks = [
    {
        label:'Home',
        icon:<HomeIcon />,
        path:'/dashboard/home',
        active:true
    },
    {
        label:'Request A Leave',
        icon:<AddCircleOutlineIcon />,
        path:'/dashboard/request-a-leave',
        active:false
    },
    {
        label:'Manage Leaves',
        icon:<AssignmentTurnedInIcon />,
        path:'/dashboard/manage-leaves',
        active:false
    },
    {
        label:'Supervisees',
        icon:<Groups2Icon />,
        path:'/dashboard',
        active:false
    },
    {
        label:'Add Employee',
        icon:<PersonAddIcon />,
        path:'/dashboard/add-employee',
        active:false
    },{
        label:'My Account',
        icon:<AccountCircleIcon />,
        path:'/dashboard/myAccount',
        active:false
    }
    // {
    //     label:'Log out',
    //     icon:<LogoutIcon />,
    //     path:'/login',
    //     active:false
    // }
];


function Dashboard(props) {
    
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['userLoggedIn']);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{height:'100%',backgroundColor:'#e5f5ff', borderTopRightRadius:'16px', borderBottomRightRadius:'16px'}}>
      <Toolbar>
        <Box
            margin={'auto'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Avatar src="/hrm-portal-logo.png" sx={{mr:1}}/>
            <Typography variant="h6" height={'fit-content'}>
                <b>HRM-Portal</b>
            </Typography>
        </Box>
      </Toolbar>
      {/* <Divider /> */}
      <List>
        {drawerLinks.map((drawerLink) => (
            <ListItem key={drawerLink.label}>
                <ListItemButton
                    selected={drawerLink.active}
                    onClick={() => {
                        drawerLink.active = true;
                        drawerLinks.forEach((link) => {
                            if(link.label !== drawerLink.label){
                                link.active = false;
                            }
                        });
                        navigate(drawerLink.path);
                    }}
                >
                    <ListItemIcon sx={{ml:3}}>{drawerLink.icon}</ListItemIcon>
                    <ListItemText>{drawerLink.label}</ListItemText>
                </ListItemButton>
            </ListItem>
        ))}
            <ListItem>
                <ListItemButton
                    onClick={() => {
                        drawerLinks.forEach((link) => {
                            link.active = false;
                        });
                        drawerLinks[0].active = true;
                        navigate('/login');
                        removeCookie('userLoggedIn', { path: '/' });
                    }}
                >
                    <ListItemIcon sx={{ml:3}}><LogoutIcon /></ListItemIcon>
                    <ListItemText>Log out</ListItemText>
                </ListItemButton>
            </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

        {/* App Drawer */}
        <Box
        component="nav"
        sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },

        }}
        aria-label="viewport-display"
        >
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border:0 }
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                
                sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth , border:0},
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
        
        {/* Display */}
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            {/* <Toolbar /> */}
            {/* <Route path={`${match.path}/myAccount`} element={<MyAccount/>}/> */}
            {/* {children} */}
            <Outlet />
        </Box>
    </Box>
  );
}

export default Dashboard;