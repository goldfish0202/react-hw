import { useContext, useEffect } from 'react';
import AppContext from 'src/Context';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  Package as PackageIcon,
  Archive as ArchiveIcon,
  Clipboard as ClipboardIcon,
} from 'react-feather';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/products',
    icon: PackageIcon,
    title: 'Product'
  },
  {
    href: '/app/orders',
    icon: ClipboardIcon,
    title: 'Order'
  },
  {
    href: '/app/sales',
    icon: ArchiveIcon,
    title: 'Sales Report'
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const { userInf } = useContext(AppContext);
  console.log(userInf);
  const location = useLocation();
  const user = {
    avatar: `/static/images/avatars/avatar_${userInf.EmpId}.png`,
    jobTitle: '職稱 部門',
    name: '名字'
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name = `${userInf.EmpId}-${userInf.EmpName}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.JobTitle = `${userInf.JobTitle}-${userInf.DeptName}`}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
