import { useContext, useState, Fragment } from 'react';
import OContext from 'src/OContext';
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  IconButton,
  Typography,
  Paper,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const OrderSearch = () => {
  const {
    sorder,
    orderdetail,
    orderdetailLength,
    pressSet,
    updateOrderdetail,
    deleteOrderdetail,
    editMode1,
    cancelEdit1,
  } = useContext(OContext);

  const [open, setOpen] = useState(true);
  const [newData, setNewData] = useState({});
  console.log(orderdetail);
  const saveBtn = () => {
    updateOrderdetail(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit1 = (seq,
    ProdId,
    Qty,
    Discount) => {
    setNewData({
      seq,
      ProdId,
      Qty,
      Discount
    });
    editMode1(seq);
  };

  const deleteConfirm = (seq) => {
    if (window.confirm('確定要刪除嗎?')) {
      deleteOrderdetail(seq);
    }
  };

  return !orderdetailLength ? (
    <p>{orderdetailLength === null ? 'Loading...' : '查無此訂單'}</p>
  ) : (
    <TableContainer component={Paper}>
      <Button
        style={{
          border: 'solid 1.5px #DDDDDD',
          color: 'black',
          margin: '5px'
        }}
        edgeEnd
        className="btn default-btn"
        onClick={() => pressSet(false)}
      >
        Back
      </Button>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>seq</TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Employee ID</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Descript</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorder.map(({
            OrderId,
            EmpId,
            CustId,
            OrderDate,
            Descript
          }) => (
            <Fragment key={OrderId}>
              <TableRow key={OrderId}>
                <TableCell>
                  <Button aria-label="expand row" size="small" onClick={() => setOpen(!open)} />
                </TableCell>
                <TableCell>{sorder[0].seq}</TableCell>
                <TableCell>{OrderId}</TableCell>
                <TableCell>{EmpId}</TableCell>
                <TableCell>{CustId}</TableCell>
                <TableCell>{OrderDate}</TableCell>
                <TableCell>{Descript}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                        Detail
                      </Typography>
                      <Table aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell>seq</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Product ID</TableCell>
                            <TableCell>qty</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell />
                            <TableCell />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderdetail.map(({
                            seq,
                            ProdId,
                            Qty,
                            Discount,
                            isEditings
                          }) => (
                            isEditings === true ? (
                              <TableRow key={seq}>
                                <TableCell style={{ width: 100 }} />
                                <TableCell>{seq}</TableCell>
                                <TableCell>{OrderId}</TableCell>
                                <TableCell>
                                  <input
                                    type="text"
                                    defaultValue={ProdId}
                                    onChange={(e) => updateNewData(e, 'ProdId')}
                                    style={{
                                      width: '120px'
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <input
                                    type="text"
                                    defaultValue={Qty}
                                    onChange={(e) => updateNewData(e, 'Qty')}
                                    style={{
                                      width: '50px'
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <input
                                    type="text"
                                    defaultValue={Discount}
                                    onChange={(e) => updateNewData(e, 'Discount')}
                                    style={{
                                      width: '50px'
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
                                  <Button className="btn default-btn" onClick={() => cancelEdit1(seq)}>
                                    Cancle
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ) : (
                              <TableRow key={seq}>
                                <TableCell style={{ width: 100 }} />
                                <TableCell>{seq}</TableCell>
                                <TableCell>{OrderId}</TableCell>
                                <TableCell>{ProdId}</TableCell>
                                <TableCell>{Qty}</TableCell>
                                <TableCell>{Discount}</TableCell>
                                <TableCell>
                                  <IconButton className="btn default-btn" onClick={() => enableEdit1(seq, ProdId, Qty, Discount)}>
                                    <EditIcon />
                                  </IconButton>
                                </TableCell>
                                <TableCell>
                                  <IconButton disald className="btn red-btn" onClick={() => deleteConfirm(seq)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            )))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderSearch;
