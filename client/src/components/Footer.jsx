import { Box, Typography } from '@mui/material';
import { shades } from '../theme';

const Footer = () => {
  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: shades.lotus[700],
      }}
    >
      <Box
        height="auto"
        marginLeft="4rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        columnGap="clamp(20px,30px,40px)"
        p="10px 0"
      >
        <Box color="white">
          <Typography variant="h2" fontWeight="bold" mb="10px">
            TaraCake Dockland
          </Typography>
          <Typography mb="10px">800 Love Street</Typography>
          <Typography mb="10px">Dockland VIC 3008</Typography>
          <Typography mb="10px">T:03 1234 5678</Typography>
          <Typography mb="10px">F: dockland@taracake.com.au</Typography>
        </Box>

        <Box marginRight="2rem">
          <Typography color="white" fontSize="20px">
            TaraCake ©2022
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
