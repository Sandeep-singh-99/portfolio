import { Button, Form, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function AdminProjectsComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  // Show Modal
  const showModal = () => setIsModalVisible(true);

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Form Submit Handler
  const handleSubmit = (values) => {
    console.log("Project Data:", values);
    handleCancel();
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Projects Section</h1>
        <Button type="primary" onClick={showModal}>
          Add Project
        </Button>
      </div>

      {/* Modal for Adding Projects */}
      <Modal
        title="Add Project"
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
              fileList={fileList}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProjectsComponent;
