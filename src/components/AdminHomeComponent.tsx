import { Button, Form, Input, Upload, Modal, Select, Card, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import { UploadFile } from "antd/es/upload/interface";

interface HomeData {
  _id: string;
  name: string;
  techStack: string[];
  description: string;
  profileImage: string;
  resumeFile: string;
}

function AdminHomeComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<HomeData | null>(null);
  const [profileImage, setProfileImage] = useState<File[]>([]);
  const [resumeFile, setResumeFile] = useState<File[]>([]);
  const [homeData, setHomeData] = useState<HomeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [form] = Form.useForm();

  // Fetch home section data
  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin-data/home-section");
      const data: HomeData[] = await response.json();
      setHomeData(data);
    } catch (error) {
      console.error("Failed to fetch home data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  // Show modal (for add/update)
  const showModal = (item: HomeData | null = null) => {
    setEditingItem(item);
    setIsModalVisible(true);
    if (item) {
      form.setFieldsValue({
        name: item.name,
        techStack: item.techStack,
        description: item.description,
      });
      setProfileImage([]);
      setResumeFile([]);
    } else {
      form.resetFields();
    }
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle form submission (Add/Update)
  const handleSubmit = async (values: {
    name: string;
    techStack: string[];
    description: string;
  }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    // formData.append("techStack", values.techStack);
    formData.append("techStack", values.techStack.join(",")); 
    formData.append("description", values.description);
    if (resumeFile.length) formData.append("resumeFile", resumeFile[0]);
    if (profileImage.length) formData.append("image", profileImage[0]);

    const method = editingItem ? "PUT" : "POST";
    const url = editingItem
      ? `/api/admin-data/home-section/${editingItem._id}`
      : "/api/admin-data/home-section";

    try {
      const response = await fetch(url, { method, body: formData });

      if (response.ok) {
        setIsModalVisible(false);
        form.resetFields();
        setProfileImage([]);
        setResumeFile([]);
        fetchHomeData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  // Handle delete action
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/admin-data/home-section/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchHomeData();
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
    setDeleteLoading(null);
  };

 
  const handleProfileChange = (info: { fileList: UploadFile[] }) => {
    setProfileImage(info.fileList.map((f) => f.originFileObj as File));
  };

  const handleResumeChange = (info: { fileList: UploadFile[] }) => {
    const file = info.fileList[0]?.originFileObj as File; 

    if (file && file.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      return;
    }

    setResumeFile(info.fileList.map((f) => f.originFileObj as File));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Home Section</h1>
        <Button
          type="primary"
          onClick={() => showModal()}
          size="large"
          disabled={loading}
        >
          {loading ? <Spin size="small" /> : "Add Home Section"}
        </Button>
      </div>

      {/* Displaying Home Sections */}
      <div className="w-full border-2 border-dotted p-4">
        {loading ? (
          <Spin size="large" className="flex justify-center" />
        ) : homeData.length > 0 ? (
          homeData.map((item: HomeData, index: number) => (
            <Card
              key={index}
              bordered={false}
              className="shadow-md border-2 rounded-xl bg-white transition-all duration-300 hover:shadow-xl p-6"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
                <div className="flex-shrink-0 w-full md:w-40 h-40 rounded-xl overflow-hidden border-4 border-gray-200">
                  <Image
                    src={item.profileImage || "/fallback-image.jpg"}
                    alt="Profile"
                    width={160}
                    height={160}
                    className="rounded-xl object-cover"
                  />
                </div>
                <div className="flex-1 w-full">
                  <h2 className="font-semibold text-2xl text-gray-900">
                    {item.name}
                  </h2>
                  <p className="text-gray-700 my-2 text-sm">
                    <strong className="text-gray-800">Tech Stack:</strong>
                    {item.techStack?.join(", ")}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                  <a
                    href={item.resumeFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Resume
                  </a>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <Button
                    type="default"
                    className="bg-gray-100 hover:bg-gray-200"
                    onClick={() => showModal(item)}
                    disabled={loading}
                  >
                    {loading && editingItem?._id === item._id ? (
                      <Spin size="small" />
                    ) : (
                      "Edit"
                    )}
                  </Button>
                  <Button
                    danger
                    onClick={() => handleDelete(item._id)}
                    disabled={deleteLoading === item._id}
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
          <p className="text-center text-gray-500">
            No home sections available
          </p>
        )}
      </div>

      {/* Modal for Add/Update */}
      <Modal
        title={editingItem ? "Edit Home Section" : "Add Home Section"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Tech Stack"
            name="techStack"
            rules={[{ required: true }]}
          >
            <Select
              mode="tags"
              placeholder="Enter Tech Stack"
              tokenSeparators={[","]}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>
          <Form.Item label="Upload Resume">
            <Upload
              beforeUpload={() => false}
              onChange={handleResumeChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload PDF</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Upload Profile Image">
            <Upload
              beforeUpload={() => false}
              onChange={handleProfileChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 text-lg"
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

export default AdminHomeComponent;
