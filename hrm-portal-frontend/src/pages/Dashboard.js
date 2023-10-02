import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
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
import { useNavigate } from "react-router-dom";


const drawerWidth = 320;
const drawerLinks = [
    {
        label:'Home',
        icon:<HomeIcon />,
        path:'/dashboard'
    },
    {
        label:'Request A Leave',
        icon:<AddCircleOutlineIcon />,
        path:'/dashboard'
    },
    {
        label:'Manage Leaves',
        icon:<AssignmentTurnedInIcon />,
        path:'/dashboard'
    },
    {
        label:'Supervisees',
        icon:<Groups2Icon />,
        path:'/dashboard'
    },
    {
        label:'Add Employee',
        icon:<PersonAddIcon />,
        path:'/dashboard'
    },{
        label:'My Account',
        icon:<AccountCircleIcon />,
        path:'/dashboard'
    },
    {
        label:'Log out',
        icon:<LogoutIcon />,
        path:'/'
    }
];


function Dashboard(props) {
    
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();

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
                <ListItemButton onClick={() => navigate(drawerLink.path)}>
                    <ListItemIcon sx={{ml:3}}>{drawerLink.icon}</ListItemIcon>
                    <ListItemText>{drawerLink.label}</ListItemText>
                </ListItemButton>
            </ListItem>
        ))}
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
            <Toolbar />
            <Typography gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non semper dui. Mauris in dignissim metus, quis viverra nunc. Maecenas tincidunt lorem a vestibulum maximus. Duis ac ex eget lacus auctor suscipit nec ut diam. Sed rhoncus sagittis ex non consequat. Donec consectetur velit quis odio consectetur ornare. Nullam sed ultricies arcu, at porta tortor. Pellentesque semper a dolor quis dignissim. Aenean tincidunt ligula ut blandit egestas. Nam rutrum ipsum eget lorem accumsan interdum. Sed tristique nibh vitae sapien scelerisque, sit amet imperdiet elit faucibus. Donec sollicitudin, lorem at vestibulum consequat, magna ipsum lacinia turpis, in aliquet velit nulla vel dui. Fusce blandit ante vitae orci ullamcorper viverra. Fusce vitae mauris consequat, maximus velit vel, rutrum sapien.
            </Typography>
            <Typography>
            Maecenas ut erat vel velit fermentum pharetra in id diam. Curabitur consectetur lectus eu accumsan hendrerit. Aliquam at risus eget arcu dapibus fringilla. Nam bibendum, sem et molestie blandit, nibh urna feugiat quam, a vehicula elit quam eget mauris. Nullam velit arcu, lobortis sit amet purus sed, luctus porta velit. Sed metus elit, tincidunt aliquam erat quis, commodo pellentesque turpis. Nam dapibus rutrum velit non interdum. Nullam elementum at nunc sed lobortis. Cras et eros sit amet felis gravida sagittis a id diam. Curabitur tincidunt neque at blandit pharetra. Morbi vehicula et justo ut vulputate. Pellentesque vitae nisl id lacus sagittis rutrum. Fusce eget dignissim ex, ut aliquam orci. Ut nulla velit, consequat ultrices elementum ut, tempus et nisl.
            </Typography>            
        </Box>
    </Box>
  );
}

export default Dashboard;