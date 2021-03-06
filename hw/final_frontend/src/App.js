import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import Actions from 'src/Actions';
import AppContext from 'src/Context';

const App = () => {
  const routing = useRoutes(routes);
  const data = Actions();
  return (
    <AppContext.Provider value={data}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
