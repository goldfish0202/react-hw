import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ProductListResults from 'src/components/product/ProductListResults';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import customers from 'src/__mocks__/customers';
import Form from 'src/components/product/addProduct';

const CustomerList = () => (
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Form />
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <ProductListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default CustomerList;
