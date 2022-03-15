import {
  Form,
  Input,
  Button,
  Checkbox,
  Dropdown,
  message,
  Space,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  SwapOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import API, { endpoints } from "../Config/Api";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoutUser from '../../ActionCreators/UserCreators';

export default function DropdownUser() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    cookie.remove("access_token");
    cookie.remove("user");
    dispatch(logoutUser())
    navigate("/login");
  };

  function handleMenuClick(e) {
    // message.info("Click on menu item.");
    console.log("click", e);
  }
  let menu = <></>;

  if (user !== null && user !== undefined)
    menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="profile">Tài khoản</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SwapOutlined />}>
          <Link to="change-pass">Đổi mật khẩu</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<LogoutOutlined />}>
          <Link to="" onClick={logout}>
            Đăng xuất
          </Link>
        </Menu.Item>
      </Menu>
    );

  return (
    <Dropdown.Button
      overlay={menu}
      placement="bottomCenter"
      icon={<UserOutlined />}
      style={{ position: "absolute", right: "20px", top: "16px" }}
    >
      {user && (user.first_name + " " + user.last_name)}
    </Dropdown.Button>
  );
}
