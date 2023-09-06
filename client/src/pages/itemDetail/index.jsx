import { Box, Button, IconButton, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../../theme';
import { addToCart } from '../../state';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      const getItem = await axios.get(
        `https://cakeshopmernstack.onrender.com/product/${itemId}`
      );
      setItem(getItem.data);
    };
    getItem();
  }, [itemId]);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box width="80%" m="40px auto" flex="1">
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          <Box flex="1 1 40%" mb="40px">
            <img
              src={
                `https://cakeshopmernstack.onrender.com/images/${item?.picturePath}` ||
                item?.picturePath
              }
              alt={item?.productName}
              width="100%"
              height="350px"
              style={{ objectFit: 'fill' }}
            />
          </Box>

          <Box flex="1 1 50%" mb="20px">
            <Box m="65px 0 25px 0" textAlign="center">
              <Typography variant="h2" sx={{ mb: 1 }}>
                {item?.productName}
              </Typography>
              <Typography
                sx={{ pl: 0.5, fontWeight: 'bold', color: shades.lotus[500] }}
              >
                ${item?.price}
              </Typography>
              <Typography sx={{ mt: '20px' }}>{item?.description}</Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="50px"
            >
              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.purple[400]}`}
                mr="20px"
                p="2px 5px"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: '0 5px' }}>{count}</Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>

              <Button
                sx={{
                  backgroundColor: '#222222',
                  color: 'white',
                  borderRadius: 0,
                  minWidth: '150px',
                  padding: '10px 40px',
                }}
                onClick={() =>
                  dispatch(addToCart({ item: { ...item, count } }))
                }
              >
                Add To Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer style={{ position: 'sticky', bottom: 0 }} />
    </Box>
  );
};

export default ItemDetail;
