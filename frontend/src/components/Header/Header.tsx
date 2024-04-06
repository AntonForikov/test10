import {AppBar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position='static'>
      <Typography variant='h6' padding={2} component={Link} to='/' sx={{color: 'white', textDecoration: 'none'}}>
        News
      </Typography>
    </AppBar>
  );
};

export default Header;