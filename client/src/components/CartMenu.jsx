import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from '../state';

import FlexBetween from './FlexBetween';
import PayButton from './PayButton';

const CartMenu = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const token = useSelector((state) => state.cart.token);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  return (
    <Box
      display={isCartOpen ? 'block' : 'none'}
      backgroundColor="rgba(0,0,0,0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          <FlexBetween mb="15px">
            <Typography variant="h2">Shopping Bag ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBetween>

          <Box>
            {cart.map((item) => (
              <Box key={`${item._id}`}>
                <FlexBetween p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item.productName}
                      width="100px"
                      height="300px"
                      src={`https://cakeshopmernstack.onrender.com/images/${item.picturePath}`}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBetween mb="5px">
                      <Typography fontWeight="bold">
                        {item.productName}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item._id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBetween>
                    <Typography>{item.description}</Typography>
                    <FlexBetween m="15px 0">
                      <Box display="flex" alignItems="center">
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item._id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item._id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>

                      <Typography fontWeight="bold">{item.price}</Typography>
                    </FlexBetween>
                  </Box>
                </FlexBetween>
                <Divider />
              </Box>
            ))}
          </Box>
          <Box m="20px 0">
            <FlexBetween m="20px 0">
              <Typography fontWeight="bold">TOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBetween>
            <PayButton cart={cart} token={token} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
