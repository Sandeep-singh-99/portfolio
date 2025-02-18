import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

function AdminContactComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Contact Section</h1>
        <Button type="primary" onClick={showModal}>
          Add Contact Section
        </Button>
      </div>

      <Modal
        title="Add Contact Section"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item
            label="Add URL"
            name="url"
            rules={[{ required: true, message: "Please enter a URL" }]}
          >
            <Input placeholder="Enter URL" />
          </Form.Item>

          <Form.Item
            label="Add Icon"
            name="icon"
            rules={[{ required: true, message: "Please enter an icon" }]}
          >
            <Input placeholder="Enter Icon Name or URL" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminContactComponent;
