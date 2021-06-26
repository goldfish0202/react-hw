import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import { Search } from 'react-feather';
import OContext from 'src/OContext';
import ActionsO from 'src/ActionsO';
import { useState } from 'react';
import Form from 'src/components/order/addOrder';
import OrderSearch from 'src/components/order/OrderSearch';
import OrderList from 'src/components/order/OrderList';

const Order = () => {
  const data = ActionsO();
  const [newData, setNewData] = useState({});

  const search = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const submitOrder = (e) => {
    e.preventDefault();
    data.pressSet(true);
    data.searchOrder(newData);
    e.target.reset();
  };

  return (
    <OContext.Provider value={data}>
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
          <Form />
          <div className="Order" style={{ margin: '25px' }}>
            <Card>
              <CardContent>
                <Box sx={{ maxWidth: 960 }}>
                  <form className="SearchForm" onSubmit={submitOrder}>
                    <TextField
                      fullWidth
                      style={{ margin: 15, width: 500, color: 'yellow !important' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon
                              fontSize="small"
                              color="action"
                            >
                              <Search />
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      id="Search"
                      name="Search"
                      type="text"
                      placeholder="Search Order"
                      variant="outlined"
                      onChange={(e) => search(e, 'OrderId')}
                    />
                    <TextField
                      style={{ margin: 15 }}
                      type="submit"
                      value="Search"
                    />
                  </form>
                </Box>
              </CardContent>
            </Card>
            <br />
            <div className="Order">
              {(data.press === true ? (
                <OrderSearch />
              ) : (
                <OrderList />
              )
              )}
            </div>
          </div>
        </Box>
      </>
    </OContext.Provider>
  );
};

export default Order;
