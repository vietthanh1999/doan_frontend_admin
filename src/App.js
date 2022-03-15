import './App.css';
import { 
  BrowserRouter, 
  Route, 
  Routes,
  Router,
  useNavigate
} from "react-router-dom";
import React, { useState } from 'react'
import User from './components/User/User';
import 'antd/dist/antd.css';
import './index.css';
import cookie from 'react-cookies'
import { Layout, Menu, Breadcrumb } from 'antd'
import {
  UserOutlined, LaptopOutlined, NotificationOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  BarChartOutlined,
  TransactionOutlined,
  SwapOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Dropdown, Button, message, Space, Tooltip } from 'antd';
import TypeHouse from './components/TypeHouse/TypeHouse';
import Blog from './components/Blog/Blog';
import {Link} from 'react-router-dom'
import Login from './components/Login/Login';
import CreateUser from './components/User/CreateUser';
import CreateTypeHouse from './components/TypeHouse/CreateTypeHouse';
import CreateBlog from './components/Blog/CreateBlog';
import Profile from './components/Profile/Profile';
import ChangePass from './components/Profile/ChangePass';
import Transaction from './components/Transaction/Transaction';
import EditUser from './components/User/EditUser';
import EditTypeHouse from './components/TypeHouse/EditTypeHouse';
import EditBlog from './components/Blog/EditBlog';
import DropdownUser from './components/Template/DropdownUser';
import { useDispatch, useSelector } from "react-redux";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const user = useSelector((state) => state.user.user);

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  };

  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  
  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  return (
    <BrowserRouter>
    <div className="app">
        <Layout>
          <Header className="header">
            <div className="logo" />
            <DropdownUser/>
          </Header>
          <Layout style={{ minHeight: '91vh' }}>
            {(user !== null && user !== undefined) ?            
            <Sider width={200} className="site-layout-background">
              <Menu theme="dark" mode="inline">
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                  <Menu.Item key="3"><Link to='user'>Danh sách user</Link></Menu.Item>
                  <Menu.Item key="4"><Link to='create-user'>Thêm user</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Loại Nhà">
                  <Menu.Item key="6"><Link to='type-house'>Danh sách loại nhà</Link></Menu.Item>
                  <Menu.Item key="8"><Link to='create-type-house'>Thêm loại nhà</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<TeamOutlined />} title="Blog">
                  <Menu.Item key="10"><Link to='blog'>Danh sách blog</Link></Menu.Item>
                  <Menu.Item key="11"><Link to='create-blog'>Thêm blog</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<TransactionOutlined />} title="Giao dịch">
                  <Menu.Item key="12"><Link to='transaction'>Danh sách giao dịch</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider> : <></>}

            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item> */}
              </Breadcrumb>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
              <Routes> 
                <Route path="/" element={<User/>} /> 
                <Route path="/user" element={<User/>} /> 
                <Route path="/create-user" element={<CreateUser/>} /> 
                <Route path="/edit-user/:id" element={<EditUser/>} /> 
                <Route path="/type-house" element={<TypeHouse/>} /> 
                <Route path="/create-type-house" element={<CreateTypeHouse/>} /> 
                <Route path="/edit-type-house/:id" element={<EditTypeHouse/>} /> 
                <Route exact path="/blog" element={<Blog/>} /> 
                <Route exact path="/create-blog" element={<CreateBlog/>} /> 
                <Route exact path="/edit-blog/:id" element={<EditBlog/>} /> 
                <Route exact path="/login" element={<Login/>} /> 
                <Route exact path="/profile" element={<Profile/>} /> 
                <Route exact path="/change-pass" element={<ChangePass/>} /> 
                <Route exact path="/login" element={<Login/>} /> 
                <Route exact path="/transaction" element={<Transaction/>} /> 
              </Routes>
              </Content>
            </Layout>
          </Layout>
        </Layout>
    </div>
  </BrowserRouter>
  );
}

export default App;
