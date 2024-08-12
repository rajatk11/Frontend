import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Outlet, Link } from 'react-router-dom';
import AlgoSelector from './AlgoSelector';
import Container from '@mui/material/Container';


const drawerWidth = 240;
const navItems = [
  { name: 'About', path: '/About' },
  { name: 'Contact', path: '/Contact' }
];


function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ my: 2 }}
      >
        Tidal Trader
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={item.path}>
              <ListItemText primary={item.name} />
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
      <AppBar component="nav" sx={{ backgroundColor: "#263238" }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge='end'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{flexGrow: 5, color: 'White', justifyContent : 'flex-start', display : 'flex'}}
            >
                <img src={'/icon.png'} alt={`Tidal logo`} style={{height: 30, marginRight: 8}}/>
          </Typography>
          <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                {navItems.map((item) => (
                <Button key={item.name} sx={{ color: '#fff' }} component={Link} to={item.path}>
                    {item.name}
                </Button>
                ))}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

      </nav>
      <Toolbar />
    </Box>


  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
