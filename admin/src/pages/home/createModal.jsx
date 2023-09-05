import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Modal,
  Button,
  Box,
  Typography,
  useMediaQuery,
  TextField,
  MenuItem,
} from '@mui/material';
import Dropzone from 'react-dropzone';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const initialValues = {
  productName: '',
  price: 0,
  description: '',
  category: '',
  picture: '',
};

const validationSchema = yup.object().shape({
  productName: yup.string().required('required'),
  price: yup.number().required('required'),
  description: yup.string().required('required'),
  category: yup.string().required('required'),
  picture: yup.string().required('required'),
});

const CreateModal = ({ isOpen, onClose, onSubmit }) => {
  const isNonMobile = useMediaQuery('(min-width:800px)');
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        position="fixed"
        backgroundColor="white"
        width="80%"
        height="80%"
        left="0"
        top="0"
        overflow="auto"
        zIndex={10}
        p="2rem 5%"
      >
        <Typography
          sx={{
            mb: 2,
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Add Product
        </Typography>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="15px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                }}
              >
                <TextField
                  label="Product Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.productName}
                  name="productName"
                  error={
                    Boolean(touched.productName) && Boolean(errors.productName)
                  }
                  helperText={touched.productName && errors.productName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: 'span 2' }}
                />

                <TextField
                  label="Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  name="price"
                  error={Boolean(touched.price) && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  select
                  label="Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={Boolean(touched.category) && Boolean(errors.category)}
                  helperText={touched.category && errors.category}
                  sx={{ gridColumn: 'span 2' }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Popular">Popular</MenuItem>
                  <MenuItem value="Seasonal">Seasonal</MenuItem>
                </TextField>
                <Box
                  gridColumn="span 4"
                  borderRadius="5px"
                  p="1rem"
                  border="1px solid"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue('picture', acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border="2px"
                        p="1rem"
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <Box>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <Box>
                  <Button type="submit" variant="contained">
                    Create
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default CreateModal;
