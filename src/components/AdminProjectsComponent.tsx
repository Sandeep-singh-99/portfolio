import { Button, Card, Form, Input, Modal, Select, Spin, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

function AdminProjectsComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [projectsData, setProjectsData] = useState<any>([]);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin-data/project-section")
      const data = await response.json()
      setProjectsData(data.projects)
    } catch (error) {
      console.error("Failed to fetch projects data:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  // Show Modal
  const showModal = (item: any = null) => {
    setEditingItem(item);
    setIsModalVisible(true);
    if (item) {
      form.setFieldsValue({
        projectName: item.projectName,
        technologyUsed: item.technologyUsed,
        projectDescription: item.projectDescription,
        projectUrl: item.projectUrl,
      });
      setImageFile([]);
    } else {
      form.resetFields();
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    console.log("Deleting project with id:", id);
    

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/admin-data/project-section/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchData();
      } else {
        console.error("Failed to delete project:", await response.json());
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
    setDeleteLoading(null);
  }

  const handleImageChange = (info: any) => {
    const fileList = info.fileList.map((file: any) => file.originFileObj);
    setImageFile(fileList);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Form Submit Handler
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("projectName", values.projectName);
    formData.append("technologyUsed",  values.technologyUsed);
    formData.append("projectDescription", values.projectDescription);
    formData.append("projectUrl", values.projectUrl);
  
    if (imageFile && imageFile.length > 0) {
      formData.append("projectImage", imageFile[0]);
    }
  
    const method = editingItem ? "PUT" : "POST";
    const url = editingItem
      ? `/api/admin-data/project-section/${editingItem._id}`
      : "/api/admin-data/project-section";
  
    try {
      const response = await fetch(url, { method, body: formData });
  
      if (response.ok) {
        setIsModalVisible(false);
        form.resetFields();
        setImageFile([]); // FIX: Reset image file after submission
        fetchData(); // Refresh project list
      } else {
        console.error("Failed to add/update project:", await response.json());
      }
    } catch (error) {
      console.error("Failed to add project:", error);
    }
    setLoading(false);
  };
  

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Projects Section</h1>
        <Button type="primary" onClick={() => showModal()} disabled={loading}>
          {loading ? <Spin size="small"/> : "Add Project"}
        </Button>
      </div>

      <div className="w-full border-2 border-dotted p-4">
        {
          loading ? (
            <Spin size="large" className="flex justify-center"/>
          ) : projectsData.length > 0 ? (
            projectsData.map((item: any, index: number) => (
              <Card key={index}>
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{item.projectName}</h2>
                  <div className="flex gap-10">
                    <Button type="primary" onClick={() => showModal(item)} disabled={loading}>
                      {loading ? <Spin size="small"/> : "Edit"}
                    </Button>
                    <Button onClick={() => handleDelete(item._id)}  disabled={deleteLoading === item._id}>
                      {deleteLoading === item._id ? <Spin size="small"/> : "Delete"}
                    </Button>
                  </div>
                </div>
                <p className="text-gray-500">{item.projectDescription}</p>
                <p className="text-gray-500">{item.technologyUsed?.join(", ")}</p>
                <p className="text-gray-500">{item.projectUrl}</p>
                <img src={item.projectImage} alt={item.projectName} className="w-32 h-32 object-cover"/>
              </Card>
            )) 
          ) : (
            <p>No porject section available</p>
          )
        }
      </div>

      {/* Modal for Adding Projects */}
      <Modal
        title= {editingItem ? "Edit Project" : "Add Project" }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* Project Name */}
          <Form.Item
            label="Project Name"
            name="projectName"
            rules={[{ required: true, message: "Please enter project name!" }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>

          {/* Project Tech Stack */}
          <Form.Item
            label="Tech Stack"
            name="technologyUsed"
            rules={[{ required: true }]}
          >
            <Select
              mode="tags"
              placeholder="Enter Tech Stack"
              tokenSeparators={[","]}
            />
          </Form.Item>
          {/* Project Description */}
          <Form.Item
            label="Project Description"
            name="projectDescription"
            rules={[
              { required: true, message: "Please enter project description!" },
            ]}
          >
            <Input.TextArea placeholder="Enter project description" rows={4} />
          </Form.Item>

          {/* Project URL */}
          <Form.Item
            label="Project URL"
            name="projectUrl"
            rules={[
              { required: true, message: "Please enter project URL!" },
              { type: "url", message: "Please enter a valid URL!" },
            ]}
          >
            <Input placeholder="Enter project URL" />
          </Form.Item>

          {/* Project Image Upload */}
          <Form.Item label="Upload image" name="image">

            <Upload
              beforeUpload={() => false}
              listType="picture"
              fileList={imageFile?.map((file: any) => ({
                uid: file.uid || file.name,
                name: file.name,
                status: "done",
                url: URL.createObjectURL(file),
              }))}
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" disabled={loading}>
              {
                loading ? ( <Spin size="small"/> ) : editingItem ? ( "Update" ) : ( "Submit" )
              }
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProjectsComponent;
