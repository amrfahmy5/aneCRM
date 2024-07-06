import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';
import history from '@/utils/history';

import {
  SettingOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
  UserAddOutlined,
  FileOutlined,
  DollarOutlined,
  GatewayOutlined,
  TransactionOutlined,
  MoneyCollectOutlined
} from '@ant-design/icons';

const SIDEBAR_MENU = [
  { key: '/', icon: <DashboardOutlined />, title: 'Dashboard', role: "admin" },
  // { key: '/lead', icon: <UserAddOutlined />, title: 'Lead' },
  // { key: '/offer', icon: <FileOutlined />, title: 'Offer' },
  { key: '/customer', icon: <CustomerServiceOutlined />, title: 'Customer', role: "admin,staff" },
  { key: '/invoice', icon: <FileTextOutlined />, title: 'Invoice', role: "admin" },
  { key: '/payment/invoice', icon: <CreditCardOutlined />, title: 'Payment Invoice', role: "admin" },
  { key: '/quote', icon: <FileSyncOutlined />, title: 'Quote', role: "admin,staff" },
  { key: '/supplier', icon: <CustomerServiceOutlined />, title: 'Supplier', role: "admin" },
  { key: '/supplierOrder', icon: <FileTextOutlined />, title: 'Purchases', role: "admin" },
  { key: '/payment/supplierOrder', icon: <CreditCardOutlined />, title: 'Purchases Payment', role: "admin" },


  { key: '/expense', icon: <DollarOutlined />, title: 'Expense', role: "admin" },
  { key: '/expenseCategory', icon: <GatewayOutlined />, title: 'Expense Category', role: "admin" },
  { key: '/Withdrawals', icon: <MoneyCollectOutlined />, title: 'Withdrawals', role: "admin" },
  { key: '/transferMoney', icon: <TransactionOutlined />, title: 'Transfer Money', role: "admin" },



  // { key: '/employee', icon: <UserOutlined />, title: 'Employee' },
  { key: '/admin', icon: <TeamOutlined />, title: 'Admin', role: "" },



];

const SETTINGS_SUBMENU = [
  { key: '/settings', title: 'General Settings', role: "" },

  // { key: '/email', title: 'Email templates' },

  { key: '/payment/mode', title: 'Payment Mode', role: "" },
  // { key:  '/settings/advanced', title: 'Advanced Settings' },
];

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Navigation({ loginInUserRole = "admin" }) {
  return (
    <>
      <div className="sidebar-wraper">
        <Sidebar loginInUserRole={loginInUserRole} collapsible={true} />
      </div>
      <MobileSidebar />
    </>
  );
}

function Sidebar({ collapsible, loginInUserRole }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (location) if (currentPath !== location.pathname) setCurrentPath(location.pathname);
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <>
      <Sider
        collapsible={collapsible}
        collapsed={collapsible ? isNavMenuClose : collapsible}
        onCollapse={onCollapse}
        className="navigation"
      >
        <div className="logo mb-4" onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
          <img src="/favicon.png" alt="Logo" style={{ height: '95px', width: '100px' }} />

          {!showLogoApp && (
            <span style={{ 'font-weight': 'bolder' }} >CRM</span>
          )}
        </div>
        <Menu mode="inline" style={{ 'margin-top': '50px' }} selectedKeys={[currentPath]}>
          {SIDEBAR_MENU.map((menuItem) => {
            // if (menuItem?.role.split(',').includes(loginInUserRole)||loginInUserRole=="superAdmin")
              return (
                <Menu.Item key={menuItem.key} icon={menuItem.icon}>
                  <Link to={menuItem.key} />
                  {menuItem.title}
                </Menu.Item>)
          })}

          <SubMenu key={'Settings'} icon={<SettingOutlined />} title={'Settings'}>
            {SETTINGS_SUBMENU.map((menuItem) => {
            // if (menuItem?.role.split(',').includes(loginInUserRole)||loginInUserRole=="superAdmin")
              return (
                <Menu.Item key={menuItem.key}>
                  <Link to={menuItem.key} />
                  {menuItem.title}
                </Menu.Item>
              )
            })}
          </SubMenu>
        </Menu>
      </Sider>
    </>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="text" size="large" onClick={showDrawer} className="mobile-sidebar-btn">
        <MenuOutlined />
      </Button>
      <Drawer
        width={200}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        className="mobile-sidebar-wraper"
      >
        <Sidebar collapsible={false} />
      </Drawer>
    </>
  );
}
