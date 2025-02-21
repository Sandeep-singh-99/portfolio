import { Button, Form, Input, Modal, Upload, Spin, Card } from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { set } from "mongoose";

function AdminContactComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [contact, setContact] = useState<any>([]);
  const [contactImage, setContactImage] = useState<any>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [form] = Form.useForm();

  const showModal = (item: any = null) => {
    setEditing(item);
    setIsModalVisible(true);
    if (item) {
      form.setFieldsValue({ url: item.url, image: item.image });
      setContactImage([]);
    } else {
      form.resetFields();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin-data/contact-section");
      const data = await response.json();
      setContact(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (value: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("url", value.url);
    if (contactImage.length) formData.append("image", contactImage[0]);

    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `/api/admin-data/contact-section/${editing._id}`
      : "/api/admin-data/contact-section";

    try {
      const response = await fetch(url, { method, body: formData });

      if (response.ok) {
        setIsModalVisible(false);
        form.resetFields();
        setContactImage([]);
        await fetchData()
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/admin-data/contact-section/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setDeleteLoading(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleContactImage = (info: any) => {
    setContactImage(info.fileList.map((file: any) => file.originFileObj));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Contact Section</h1>
        <Button
          type="primary"
          onClick={() => showModal()}
          size="large"
          disabled={loading}
        >
          {loading ? <Spin size="small" /> : "Add Contact"}
        </Button>
      </div>

      {/* <div className="w-full border-2 border-dotted p-4">
        { loading ? (<Spin size="large" className="flex justify-center"/>)
          : contact.length > 0 ? (
            contact.map((item: any, index: number) => (
              <Card
                key={index}
                hoverable
                className="mb-4"
                cover={<img alt="example" src={item.image} />}
                actions={[
                  <Button type="primary" onClick={() => showModal(item)}>Edit</Button>,
                  <Button type="primary" danger>Delete</Button>
                ]}
              >
                <Card.Meta title={item.url} />
              </Card>
            ))
          ) :(<p className="text-center">No contact found</p>)
        }
      </div> */}

      <div className="w-full border-2 border-dotted p-4 rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spin size="large" />
          </div>
        ) : contact.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contact.map((item: any, index: number) => (
              <Card
                key={index}
                hoverable
                className="shadow-lg rounded-lg"
                cover={
                  <img
                    alt="example"
                    src={item.image}
                    className="h-48 object-cover rounded-t-lg"
                  />
                }
                actions={[
                  <Button
                    type="primary"
                    disabled={loading}
                    onClick={() => showModal(item)}
                  >
                    {loading ? <Spin size="small" /> : "Edit"}
                  </Button>,
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(item._id)}
                    disabled={deleteLoading === item._id}
                  >
                    {deleteLoading === item._id ? (
                      <Spin size="small" />
                    ) : (
                      "Delete"
                    )}
                  </Button>,
                ]}
              >
                <Card.Meta title={item.url} className="truncate text-center" />
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 font-medium">
            No contacts found
          </p>
        )}
      </div>

      <Modal
        title={editing ? "Edit Contact" : "Add Contact"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Add URL"
            name="url"
            rules={[{ required: true, message: "Please enter a URL" }]}
          >
            <Input placeholder="Enter URL" />
          </Form.Item>

          <Form.Item label="Upload Profile Image">
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              onChange={handleContactImage}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <Spin size="small" />
            ) : editing ? (
              "Update Contact"
            ) : (
              "Add Contact"
            )}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminContactComponent;
