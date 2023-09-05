import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Box,
  IconButton,
  Typography,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  InputBase,
} from '@mui/material';
import { ShoppingBagOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { setIsCartOpen, setLogout } from '../state';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.cart.user);
  const theme = useTheme();
  const pink = theme.palette.pink.main;
  const token = useSelector((state) => state.cart.token);
  const isAuth = Boolean(useSelector((state) => state.cart.token));

  const userName = user?.firstName;
  console.log(token);
  return (
    <Box
      display="flex"
      backgroundColor={pink}
      alignItems="center"
      width="100%"
      height="80px"
      color="black"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="90%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate('/')}
          sx={{ '&:hover': { cursor: 'pointer' }, margin: 1 }}
        >
          <Typography variant="h2" fontWeight="bold">
            {' '}
            Tara Cake
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: '0 4px',
                height: '14px',
                minWidth: '13px',
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen())}
              sx={{ color: 'black' }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          {isAuth ? (
            <FormControl variant="standard" value={userName}>
              <Select
                value={userName}
                sx={{
                  backgroundColor: pink,
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: pink,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={userName}>
                  <Typography>Welcome {userName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          ) : (
            <IconButton onClick={() => navigate('/login')}>
              <LoginOutlinedIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
