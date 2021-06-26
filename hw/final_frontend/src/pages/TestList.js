import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TestListResults from 'src/components/test/TestListResults';
/* import OrderListToolbar from 'src/components/order/OrderListToolbar'; */
import customers from 'src/__mocks__/customers';
import Form from 'src/components/test/addTest';

const OrderList = () => (
  <>
    <Helmet>
      <title>Orders | Material Kit</title>
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
          <TestListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default OrderList;
