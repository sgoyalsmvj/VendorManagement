import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  CustomerServiceOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

const permissions = JSON.parse(localStorage.getItem('auth')).permissions;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          zIndex: 10,
        }}
      >
        <h2 style={{
          fontSize: 30,
          padding: 10,
          color: 'white',
          marginTop: 8,
          textAlign: 'center'

        }}>AKORITA</h2>

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/" />
            Dashboard
          </Menu.Item>

          {
            (permissions == 'superadmin' || [...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('vendor')) && (<Menu.Item key="2" icon={<CustomerServiceOutlined />}>
              <Link to="/vendor">Vendor</Link>
            </Menu.Item>)
          }

          {(permissions == 'superadmin' || [...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('job')) && (<Menu.Item key="21" icon={<TeamOutlined />}>
            <Link to={'/lead'} />
            Jobs
          </Menu.Item>)}

          {(permissions == 'superadmin' || [...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('service')) && (<Menu.Item key="3" icon={<FileSyncOutlined />}>
            <Link to="/product" />
            Services
          </Menu.Item>)}

          {(
            permissions == 'superadmin' ||
            ([...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('admin') ||
              [...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('role'))
          ) && (<SubMenu key={'admin'} title={'Admin Management'} icon={<TeamOutlined />}>
            {(permissions == 'superadmin' || [...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('admin')) && (<Menu.Item key={'adminrole'} >
              <Link to={'/admin'} />
              Admin
            </Menu.Item>)}

            {(permissions == 'superadmin' || [...permissions['view'], ...permissions['update'], ...permissions['delete'], ...permissions['create']].includes('role')) && (<Menu.Item key={'role'} >
              <Link to={'/Role'} />
              Roles & Permissions
            </Menu.Item>)}

            {permissions == 'superadmin' && (
              <Menu.Item key={'report'}>
                <Link to={'/report'} />
                Report
              </Menu.Item>
            )}
          </SubMenu>)}
        </Menu>
      </Sider>
    </>
  );
}
export default Navigation;
