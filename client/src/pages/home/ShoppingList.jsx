import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Tab, Tabs } from '@mui/material';
import Item from '../../components/Item';
import axios from 'axios';
import { shades } from '../../theme';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('All');
  const [items, setItems] = useState([]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getItems = async (res, req) => {
      const getItems = await axios.get(
        'https://cakeshopmernstack.onrender.com/product'
      );
      setItems(getItems.data);
    };
    getItems();
  }, [dispatch]);

  const popularItems = items.filter((item) => item.category === 'Popular');
  const allItems = items;
  const seasonalItems = items.filter((item) => item.category === 'Seasonal');

  return (
    <Box
      width="80%"
      margin="80px auto"
      fontSize="20px"
      textAlign="center"
      color={shades.lotus[500]}
      fontWeight="bold"
    >
      Do you want the best cake in Melbounre for your sweeter Life?
      <Box display="flex" flexDirection="column" alignItems="center" m="2rem">
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleChange}
          p="10px 0"
        >
          <Tab label="All" value="All" />
          <Tab label="Popular" value="Popular" />
          <Tab label="Seasonal" value="Seasonal" />
        </Tabs>
      </Box>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        alignItems="center"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === 'All' &&
          allItems.map((item) => <Item item={item} key={item._id} />)}
        {value === 'Popular' &&
          popularItems.map((item) => <Item item={item} key={item._id} />)}
        {value === 'Seasonal' &&
          seasonalItems.map((item) => <Item item={item} key={item._id} />)}
      </Box>
    </Box>
  );
};

export default ShoppingList;
