import { useContext, useState } from 'react';
import AppContext from 'src/Context';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const TestListResults = () => {
  const {
    orders,
  } = useContext(AppContext);
  console.log(orders);

  const [open, setOpen] = useState(false);

  return (
    <fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {orders.slice(0).map(({
          OrderId,
          CustId,
          OrderDate,
          Descript
        }) => (
          <TableRow>
            <TableCell>
              {OrderId}
            </TableCell>
            <TableCell>
              {CustId}
            </TableCell>
            <TableCell>
              {OrderDate}
            </TableCell>
            <TableCell>
              {Descript}
            </TableCell>
          </TableRow>,
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    Detail
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>ProductId</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell align="right">Discount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key={123}>
                        <TableCell>123</TableCell>
                        <TableCell>456</TableCell>
                        <TableCell>123</TableCell>
                        <TableCell>456</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        ))}
      </TableRow>
      
    </fragment>
  );
};

export default TestListResults;
