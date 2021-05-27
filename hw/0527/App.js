import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
//或 import {Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { ButtonGroup , FormControlLabel , Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment'; // +icon
import AccountCircle from '@material-ui/icons/AccountCircle'; // +icon
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; //自訂按鈕
import { green, orange } from '@material-ui/core/colors'; //color
import AppBar from '@material-ui/core/AppBar'; // sidebar
import Toolbar from '@material-ui/core/Toolbar'; // sidebar
import IconButton from '@material-ui/core/IconButton'; // sidebar
import MenuIcon from '@material-ui/icons/Menu'; // sidebar
import Menu from '@material-ui/core/Menu'; // menu
import MenuItem from '@material-ui/core/MenuItem'; // menu


const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[200],
    },
    secondary: {
      main: orange[900],
    },
  },
});

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #333, #999)',
    border: 0,
    borderRadius: 15,
    color: 'white',
    padding: '5px 30px',
    marginBottom: 10,
  }, // 一個樣式规则
});

function ButtonStyled() {
  const classes = useStyles();
  return (
    <Button className={classes.root}>
      我的按鈕
    </Button>
  )
}

function CheckboxExample() {
  const [checked, setChecked] = React.useState(true);
  return (
    <FormControlLabel 
      control={
        <Checkbox checked={checked}
        color="primary"
        onChange={(e)=> setChecked(e.target.checked)} //hook
        inputProps={{ 'aria-label': 'secondary checkbox' }} //按下產生變化
        />
      }
      label = "checkbox 測試" //checkbox 文字
    />
    /*<div>
      <Checkbox
        checked={checked}
        onChange={(e)=> setChecked(e.target.checked)} //hoot
        inputProps={{ 'aria-label': 'secondary checkbox' }} //按下產生變化
      />
    </div>*/
  )
}

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <AppBar position="static">
            <Toolbar>
              <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
              <Typography variant="h6">
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <Typography variant="h1" component="h2">
            標題
          </Typography>
          <ButtonStyled />
          <TextField
            label="email"
            variant="filled"
            type="email"
            placeholder="123@gmail.com" //預設文字
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <CheckboxExample />
          <ButtonGroup>
            <Button startIcon={<SaveIcon />}  href="#" size="small" onClick={() => { alert('按了一下') }} variant="contained" color="primary">
              save
            </Button>
            <Button startIcon={<SaveIcon />}  href="#" size="small" onClick={() => { alert('按了一下') }} variant="contained" color="secondary">
              save
            </Button>
          </ButtonGroup>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
