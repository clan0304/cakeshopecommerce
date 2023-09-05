import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import CreateModal from './createModal';
import UpdateModal from './updateModal';

const Home = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const handleEdit = (id) => {
    const row = rows.find((row) => row._id === id);

    setSelectedRow(row);

    openUpdateModal();
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/product/${id}`);
    window.location.reload();
  };

  const handleClose = () => {
    closeUpdateModal();
    setSelectedRow(null);
  };

  const columns = [
    { field: 'productName', headerName: 'Product Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'price', headerName: 'Price', width: 300 },
    { field: 'category', headerName: 'Category', width: 300 },
    {
      field: 'picturePath',
      headerName: 'Picture',
      width: 200,
      height: 'auto',
      renderCell: (params) => (
        <img
          src={`http://localhost:8000/images/${params.row.picturePath}`}
          alt="Item"
          style={{ width: '100%', height: 'auto' }}
        />
      ),
    },

    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleEdit(params.row._id)}>Edit</Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.row._id)}>Delete</Button>
      ),
    },
  ];

  const handleCreateSubmit = async (values, onSubmitProps) => {
    if (values.picture && values.picture.name) {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append('picturePath', values.picture.name);
      await axios.post('http://localhost:8000/product', formData);
      onSubmitProps.resetForm();
      alert('Item is created!');
      window.location.reload();
      closeCreateModal();
    } else {
      console.error('Invalid picture data');
    }
  };

  const handleUpdateSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.set(value, values[value]);
    }
    formData.set('picturePath', values.picturePath);

    await axios.put(
      `http://localhost:8000/product/${selectedRow._id}`,
      formData
    );
    onSubmitProps.resetForm();
    alert('Item is updated!!');
    window.location.reload();
    handleClose();
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get('http://localhost:8000/product');
      setRows(response.data);
    };
    getProducts();
  }, []);

  return (
    <Box zIndex={1}>
      <Button
        display="flex"
        justifycontent="flex-end"
        p="1rem"
        onClick={openCreateModal}
        variant="contained"
        sx={{
          m: 2,
        }}
      >
        Add Product
      </Button>
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreateSubmit}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={2}
        sx={{ textAlign: 'center', zIndex: 3 }}
      />
      <UpdateModal
        open={isUpdateModalOpen}
        onClose={closeUpdateModal}
        initialValues={selectedRow}
        onSubmit={handleUpdateSubmit}
      />
    </Box>
  );
};

export default Home;
