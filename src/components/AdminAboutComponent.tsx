import { Button, Form, Input, Modal, Card, Spin } from "antd";
import React, { useEffect, useState } from "react";

interface AboutSection {
  _id: string;
  description: string;
}

function AdminAboutComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aboutData, setAboutData] = useState<AboutSection[]>([]);
  const [editingItem, setEditingItem] = useState<AboutSection | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [form] = Form.useForm();

  // Handle cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // fetch data
  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin-data/about-section");
      const data: AboutSection[] = await response.json();
      setAboutData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle submit
  const handleSubmit = async (value: {description: string}) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("description", value.description);

    const method = editingItem ? "PUT" : "POST";
    const url = editingItem
      ? `/api/admin-data/about-section/${editingItem._id}`
      : "/api/admin-data/about-section";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        setIsModalVisible(false);
        form.resetFields();
        fetchData();
      }
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/admin-data/about-section/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
    setDeleteLoading(null);
  };

  const showModal = (item: AboutSection | null = null) => {
    setEditingItem(item);
    setIsModalVisible(true);
    if (item) {
      form.setFieldsValue({ description: item.description });
    } else {
      form.resetFields();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">About Section</h1>
        <Button
          type="primary"
          onClick={() => showModal()}
          size="large"
          disabled={loading}
        >
          {loading ? <Spin size="small" /> : "Add About Section"}
        </Button>
      </div>

      <div className="w-full border-2 border-dashed p-6 bg-gray-100 rounded-lg">
        {loading ? (
          <div className="flex justify-center">
            <Spin size="large" className="text-blue-500" />
          </div>
        ) : aboutData.length > 0 ? (
          aboutData.map((item, index) => (
            <Card
              key={index}
              bordered={false}
              className="shadow-lg border-2 rounded-xl bg-white transition-all duration-300 hover:shadow-xl p-6 mb-4"
            >
              <div className="flex flex-col md:flex-row items-start md:items-start overflow-hidden space-y-4 md:space-y-0">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-700">
                    {item.description}
                  </p>
                </div>

                <div className="flex space-x-4 mt-4 md:mt-0">
                  <Button
                    type="primary"
                    onClick={() => {
                      showModal(item);
                    }}
                    className="w-full md:w-auto"
                  >
                    {loading && editingItem?._id === item._id ? (
                      <Spin size="small" />
                    ) : (
                      "Edit"
                    )}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => handleDelete(item._id)}
                    disabled={deleteLoading === item._id}
                    danger
                    className="w-full md:w-auto"
                  >
                    {deleteLoading === item._id ? (
                      <Spin size="small" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No About Sections available
          </p>
        )}
      </div>

      <Modal
        title={editingItem ? "Edit About Section" : "Add About Section"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {/* Form goes here */}
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="About Me"
            name="description"
            rules={[{ required: true, message: "Please enter About Me!" }]}
          >
            <Input.TextArea placeholder="Enter About me" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <Spin size="small" />
              ) : editingItem ? (
                "Update"
              ) : (
                "Submit"
              )}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminAboutComponent;