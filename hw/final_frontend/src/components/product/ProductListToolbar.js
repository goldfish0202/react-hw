import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useState, useContext } from 'react';
import AppContext from 'src/Context';

const ProductListToolbar = (props) => {
  const [newData, setNewData] = useState({});
  const { searchProduct, allProduct } = useContext(AppContext);
  const updateSearch = (e) => {
    setNewData({ ProdID: e.target.value });
  };
  const dataSearch = (id) => {
    if (newData.ProdID === '' || JSON.stringify(newData) === '{}') {
      allProduct();
    } else {
      searchProduct(id);
    }
  };

  return (
    <Box {...props}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 960 }}>
              <TextField
                style={{ width: 500 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search product"
                onChange={(e) => updateSearch(e)}
                variant="outlined"
              />
              <span>&ensp;&ensp;&ensp;</span>
              <input
                type="submit"
                value="Search"
                style={{
                  width: '80px',
                  height: '55px',
                  fontSize: '16px',
                  border: 'solid 1px gray',
                  backgroundColor: 'white'
                }}
                onClick={() => dataSearch(newData)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductListToolbar;
