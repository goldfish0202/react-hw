import { useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AppContext from 'src/Context';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const SaleListResults = ({ ...rest }) => {
  const {
    sales,
    saleLength,
  } = useContext(AppContext);
  console.log(sales);

  return !saleLength ? (
    <p>{saleLength === null ? 'Please choose the range of date.' : 'Loading...'}</p>
  ) : (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell>
                  Customer ID
                </TableCell>
                <TableCell>
                  Total Amount
                </TableCell>
                <TableCell>
                  Total Profit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.custname}>
                  <TableCell>
                    {sale.custname}
                  </TableCell>
                  <TableCell>
                    {sale.CustId}
                  </TableCell>
                  <TableCell>
                    {sale.totalAmount}
                  </TableCell>
                  <TableCell>
                    {sale.totalProfit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default SaleListResults;
