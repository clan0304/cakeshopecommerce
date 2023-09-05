import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const pink = theme.palette.pink.main;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt="5rem"
      textAlign="center"
    >
      <Typography
        fontSize="10px"
        sx={{
          mb: 2,
        }}
      >
        Your order has been confirmed, and you will receive an email with order
        details.
      </Typography>
      <Typography variant="h3" fontWeight="bold">
        Thank you for choosing us!
      </Typography>
      <Button
        onClick={() => navigate('/')}
        variant="contained"
        sx={{
          backgroundColor: pink,
          mt: 2,
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default CheckoutSuccess;
