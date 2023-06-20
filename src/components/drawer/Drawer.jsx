import * as React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer as MUIDrawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material'

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';


const drawerWidth = 240;


function Drawer(props) {
    const { window, elements } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [drawerIndex, setDrawerIndex] = React.useState(0);
    

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClick = (index) => {
        setDrawerIndex(index);
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {elements.map((elem, index) => (
                    <ListItem key={elem.title} disablePadding>
                        <ListItemButton onClick={() => handleClick(index)}>
                            <ListItemIcon>
                                {elem.icon}
                            </ListItemIcon>
                            <ListItemText primary={elem.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* mobile only */}
                <MUIDrawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </MUIDrawer>

                {/* desktop only */}
                <MUIDrawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </MUIDrawer>
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {elements[drawerIndex].component}
            </Box>
        </Box>
    );
}

Drawer.propTypes = {
    elements: PropTypes.any,
    window: PropTypes.func,
};

export default Drawer;