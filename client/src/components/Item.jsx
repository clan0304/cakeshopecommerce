import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../theme';
import { addToCart } from '../state';
import { useNavigate } from 'react-router-dom';

const Item = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box width="100%">
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={item.productName}
          src={`https://cakeshopmernstack.onrender.com/images/${item.picturePath}`}
          width="300px"
          height="400px"
          onClick={() => navigate(`/item/${item._id}`)}
          style={{ cursor: 'pointer' }}
        />
        <Box
          display={isHovered ? 'block' : 'none'}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.purple[200]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ backgroundColor: shades.primary[300], color: 'white' }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="10px">
        <Typography variant="h2" color={shades.neutral[800]}>
          {item.productName}
        </Typography>
        <Typography fontWeight="bold">${item.price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
