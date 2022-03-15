import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button } from "antd";
import API, { endpoints } from "../Config/Api";
import { Link } from "react-router-dom";
import { openNotificationWithIcon } from "../Notification/Notification";
const { Column, ColumnGroup } = Table;

export default function TypeHouse() {
  const [typeHouse, setTypeHouse] = useState([]);
  useEffect(() => {
    const requestUrl = `type-house/`;
    API.get(requestUrl)
      .then((response) => {
        console.log(response.data.results);
        setTypeHouse(response.data.results);
      })
      .catch((error) => {});
  }, []);

  const deleteTypeHouse = (id) => {
    try {
      let formData = new FormData();
      formData.append("delete_flag", true);
      let res = API.put(`/type-house/${id}/`, formData)
        .then((response) => {
          openNotificationWithIcon(
            "success",
            "Xóa loại nhà thành công"
          );
        })
        .catch((error) => {
          openNotificationWithIcon("error", "Xóa loại nhà thất bại");
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Danh sách loại nhà</h2>
      <Table dataSource={typeHouse}>
        <Column title="id" dataIndex="id" key="id" />
        <Column title="Loại nhà" dataIndex="name" key="name" />
        <Column
          title="Hành động"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/edit-type-house/${record.id}`}>Sửa</Link>
              <Button type="link" onClick={(e) => deleteTypeHouse(record.id)}>Xóa</Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
