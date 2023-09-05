import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';
import Navbar from '../../components/Navbar';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 800px)');
  return (
    <Box>
      <Navbar />

      <Box
        width={isNonMobileScreens ? '60%' : '70%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor="white"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          color={theme.palette.pink.dark}
          variant="h5"
          sx={{ mb: '1.5rem' }}
        >
          Do you want the best cake in Melbounre for your sweeter Life?
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
