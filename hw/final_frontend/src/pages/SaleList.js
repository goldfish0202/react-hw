import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SaleListResults from 'src/components/sale/SaleListResults';
import customers from 'src/__mocks__/customers';
import Form from 'src/components/sale/addSale';

const SaleList = () => (
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
        <Box sx={{ pt: 3 }}>
          <SaleListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default SaleList;
