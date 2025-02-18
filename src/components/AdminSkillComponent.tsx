import { Button, Form, Upload, Modal } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

function AdminSkillComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const showModal = () => setIsModalVisible(true);

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Skills Section</h1>
        <Button type="primary" onClick={showModal}>
          Add Skill
        </Button>
      </div>

      <Modal
        title="Add Skill"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical">
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

          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminSkillComponent;
