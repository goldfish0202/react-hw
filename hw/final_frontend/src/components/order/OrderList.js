import { useContext, useState } from 'react';
import OContext from 'src/OContext';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import OrderSearch from 'src/components/order/OrderSearch';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';

const OrderList = () => {
  const {
    orders,
    press,
    searchOrder,
    updateOrder,
    deleteOrder,
    editMode,
    cancelEdit,
  } = useContext(OContext);
  const [newData, setNewData] = useState({});
  console.log(orders);
  const search = (OrderId, field) => {
    searchOrder({ [field]: OrderId });
  };

  const saveBtn = () => {
    console.log(newData);
    updateOrder(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (OrderId,
    EmpId,
    CustId,
    OrderDate,
    Descript) => {
    setNewData({
      OrderId,
      EmpId,
      CustId,
      OrderDate,
      Descript
    });
    editMode(OrderId);
  };

  const deleteConfirm = (OrderId) => {
    if (window.confirm('確認要刪除?明細會一併刪除!')) {
      deleteOrder(OrderId);
    }
  };

  return (press === true) ? (<OrderSearch />
  ) : (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ maxWidth: 960 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>seq</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Descript</TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(({
                seq,
                OrderId,
                EmpId,
                CustId,
                OrderDate,
                Descript,
                isEditing,
              }) => (
                isEditing === true ? (
                  <TableRow
                    hover
                    key={OrderId}
                  >
                    <TableCell>{seq}</TableCell>
                    <TableCell>{OrderId}</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={EmpId}
                        onChange={(e) => updateNewData(e, 'EmpId')}
                        style={{
                          width: '80px'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={CustId}
                        onChange={(e) => updateNewData(e, 'CustId')}
                        style={{
                          width: '80px'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="date"
                        defaultValue={OrderDate}
                        onChange={(e) => updateNewData(e, 'OrderDate')}
                        style={{
                          width: '130px'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={Descript}
                        onChange={(e) => updateNewData(e, 'Descript')}
                        style={{
                          width: '130px'
                        }}
                      />
                    </TableCell>
                    <TableCell />
                    <TableCell>
                      <Button className="btn green-btn" onClick={() => saveBtn()}>
                        Save
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button className="btn default-btn" onClick={() => cancelEdit(OrderId)}>
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow
                    hover
                    key={OrderId}
                  >
                    <TableCell>{seq}</TableCell>
                    <TableCell>{OrderId}</TableCell>
                    <TableCell>{EmpId}</TableCell>
                    <TableCell>{CustId}</TableCell>
                    <TableCell>{OrderDate}</TableCell>
                    <TableCell>{Descript}</TableCell>
                    <TableCell>
                      <IconButton className="btn green-btn" onClick={() => search(OrderId, 'OrderId')}>
                        <ListIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton className="btn default-btn" onClick={() => enableEdit(OrderId, EmpId, CustId, OrderDate, Descript)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton disald className="btn red-btn" onClick={() => deleteConfirm(OrderId)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default OrderList;
