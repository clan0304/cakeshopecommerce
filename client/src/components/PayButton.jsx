import { Box, Button, useTheme } from '@mui/material';
import axios from 'axios';
import { setIsCartOpen } from '../state';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const PayButton = ({ cart, token }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckout = () => {
    axios
      .post(`https://cakeshoopecommerce.onrender.com/create-checkout-session`, {
        cart,
      })
      .then((res) => {
        if (res.data.url) {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box>
      {token !== null ? (
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleCheckout()}
        >
          Check Out
        </Button>
      ) : (
        <Box display="flex" gap="2rem">
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleCheckout()}
          >
            Check Out as a Guest
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/login');
              dispatch(setIsCartOpen({}));
            }}
            sx={{
              backgroundColor: theme.palette.pink.main,
            }}
          >
            Let's Sign in!
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PayButton;
