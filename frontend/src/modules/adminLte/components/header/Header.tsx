import './_header.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


export const Header = () => {

  const { user, logOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header>
      <div className="user-info">

        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Avatar src={user?.avatar} alt="Photo user" className="photo-user" />
          <FontAwesomeIcon icon={faCaretDown} className="icon" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={logOut}>Cerrar sesión </MenuItem>
        </Menu>

        <div className="info">
          <p className="name">{user?.displayName.toLowerCase()}</p>
          <p className="role">{user?.rol}</p>
        </div>
      </div>
    </header>
  )
}
