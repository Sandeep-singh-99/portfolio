import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

function AdminAboutComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">About Section</h1>
        <Button type="primary" onClick={showModal}>
          Add About Section
        </Button>
      </div>

      <Modal
        title="Add About Section"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {/* Form goes here */}
        <Form layout="vertical">
          <Form.Item
            label="About Me"
            name="about"
            rules={[{ required: true, message: "Please enter About Me!" }]}
          >
            <Input.TextArea placeholder="Enter About me" rows={4} />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminAboutComponent;
