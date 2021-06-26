import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
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
  Button,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const ProductListResults = ({ customers, ...rest }) => {
  const {
    users,
    userLength,
    editMode,
    cancelEdit,
    updateProduct,
    deleteProduct,
  } = useContext(AppContext);
  const [newData, setNewData] = useState({});
  console.log(users);

  const deleteConfirm = (id) => {
    console.log(id);
    if (window.confirm('Are you sure?')) {
      deleteProduct(id);
    }
  };

  const saveBtn = () => {
    updateProduct(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (ProdID, ProdName, UnitPrice, Cost) => {
    setNewData({
      ProdID,
      ProdName,
      UnitPrice,
      Cost
    });
    editMode(ProdID);
  };

  return !userLength ? (
    <p>{userLength === null ? 'Loading...' : 'Please insert some products.'}</p>
  ) : (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 962 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ProdID
                </TableCell>
                <TableCell>
                  ProdName
                </TableCell>
                <TableCell>
                  UnitPrice
                </TableCell>
                <TableCell>
                  Cost
                </TableCell>
                <TableCell>
                  {' '}
                </TableCell>
                <TableCell>
                  {' '}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0).map(({
                ProdID,
                ProdName,
                UnitPrice,
                Cost,
                isEditing
              }) => (
                isEditing === true ? (
                  <TableRow
                    hover
                    key={ProdID}
                  >
                    <TableCell>
                      {ProdID}
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        onChange={(e) => updateNewData(e, 'ProdName')}
                        defaultValue={ProdName}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        onChange={(e) => updateNewData(e, 'UnitPrice')}
                        defaultValue={UnitPrice}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        onChange={(e) => updateNewData(e, 'Cost')}
                        defaultValue={Cost}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => saveBtn()}>
                        save
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => cancelEdit(ProdID)}>
                        cancle
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow
                    hover
                    key={ProdID}
                  >
                    <TableCell>
                      {ProdID}
                    </TableCell>
                    <TableCell>
                      {ProdName}
                    </TableCell>
                    <TableCell>
                      {UnitPrice}
                    </TableCell>
                    <TableCell>
                      {Cost}
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" onClick={() => enableEdit(ProdID, ProdName, UnitPrice, Cost)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" onClick={() => deleteConfirm(ProdID)}>
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

ProductListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default ProductListResults;
