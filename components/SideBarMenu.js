import {
  Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function SideBarMenu() {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const { user } = useAuth();

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <Box className="last:mt-auto">
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              alt="User Profile Picture"
              srcSet={user.photoURL}
              className="w-14 h-14 mb-4 mx-auto"
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchor}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
