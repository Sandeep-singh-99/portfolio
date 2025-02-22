import {
  Button,
  Form,
  Upload,
  Modal,
  Spin,
  Card,
  message,
  UploadFile,
} from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import { RcFile } from "antd/es/upload";

interface SkillImage {
  skillImage: string;
}

interface Skill {
  _id: string;
  skillName: string;
  skillImages: SkillImage[];
}

function AdminSkillComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [form] = Form.useForm();

  // Show modal with or without editing
  const showModal = (item: Skill | null = null) => {
    setIsModalVisible(true);
    if (item) {
      form.setFieldsValue({ images: item.skillImages });
    } else {
      form.resetFields();
    }
  };

  // Fetch skills data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin-data/skill-section");
      const data = await response.json();
      setSkillsData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleSubmit = async (values: { images?: { fileList?: File[] } }) => {
  //   setLoading(true);
  //   const formData = new FormData();

  //   if (values.images?.fileList) {
  //     values.images?.fileList.forEach((file: UploadFile<RcFile>) => {
  //       formData.append("images", file.originFileObj);
  //     });
  //   }

  //   const method = "POST";
  //   const url =  "/api/admin-data/skill-section";

  //   try {
  //     const response = await fetch(url, { method, body: formData });

  //     if (response.ok) {
  //       setIsModalVisible(false);
  //       form.resetFields();
  //       fetchData();
  //       message.success("Skill section updated successfully!");
  //     } else {
  //       console.error("Failed to submit data:", response.statusText);
  //       message.error("Failed to submit data!");
  //     }
  //   } catch (error) {
  //     console.error("Failed to submit data:", error);
  //     message.error("An error occurred!");
  //   }
  //   setLoading(false);
  // };

  const handleSubmit = async (values: {
    images?: { fileList?: UploadFile<RcFile>[] };
  }) => {
    setLoading(true);
    const formData = new FormData();

    if (values.images?.fileList) {
      values.images.fileList.forEach((file: UploadFile<RcFile>) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });
    }

    const method = "POST";
    const url = "/api/admin-data/skill-section";

    try {
      const response = await fetch(url, { method, body: formData });

      if (response.ok) {
        setIsModalVisible(false);
        form.resetFields();
        fetchData();
        message.success("Skill section updated successfully!");
      } else {
        console.error("Failed to submit data:", response.statusText);
        message.error("Failed to submit data!");
      }
    } catch (error) {
      console.error("Failed to submit data:", error);
      message.error("An error occurred!");
    }
    setLoading(false);
  };

  const handleDeleteImage = async (skillId: string, imageUrl: string) => {
    setDeleteLoading(imageUrl);
    try {
      const response = await fetch(`/api/admin-data/skill-section/${skillId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (response.ok) {
        const updatedSkillsData = skillsData
          .map((skill) => {
            if (skill._id === skillId) {
              const updatedImages = skill.skillImages.filter(
                (image: SkillImage) => image.skillImage !== imageUrl
              );
              return { ...skill, skillImages: updatedImages };
            }
            return skill;
          })
          .filter((skill) => skill.skillImages.length > 0);

        setSkillsData(updatedSkillsData);
        message.success("Image deleted successfully!");
      } else {
        message.error("Failed to delete image!");
      }
    } catch (error: unknown) {
      console.error("An error occurred while deleting the image:", error);
      message.error("An error occurred while deleting the image.");
    }

    setDeleteLoading(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Skills Section</h1>
        <Button
          type="primary"
          onClick={() => showModal()}
          size="large"
          disabled={loading}
        >
          {loading ? <Spin size="small" /> : "Add Skill"}
        </Button>
      </div>

      <div className="w-full border-2 border-dashed p-8 bg-gray-100 rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spin size="large" className="text-blue-500" />
          </div>
        ) : skillsData.length > 0 ? (
          skillsData.map((item: Skill, index: number) => (
            <Card
              key={index}
              bordered={false}
              className="shadow-lg border-2 rounded-xl bg-white transition-all duration-300 hover:shadow-xl p-6 mb-6"
            >
              <div className="flex items-center space-x-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {item.skillImages.map((image: SkillImage, idx: number) => (
                    <div key={idx} className="relative">
                      <Image
                        src={image.skillImage}
                        width={128}
                        height={128}
                        alt="Skill"
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm hover:opacity-80 transition-all"
                      />
                      <Button
                        type="default"
                        danger
                        onClick={() =>
                          handleDeleteImage(item._id, image.skillImage)
                        }
                        size="small"
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        {deleteLoading === image.skillImage ? (
                          <Spin size="small" />
                        ) : (
                          "X"
                        )}
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black">
                    {item.skillName}
                  </h3>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center text-gray-500 font-semibold p-4 bg-white rounded-lg shadow-md">
            No skills found.
            <span className="text-blue-500 cursor-pointer hover:underline">
              Add a new skill!
            </span>
          </div>
        )}
      </div>

      <Modal
        title={"Add Skill"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item
            label="Upload Images"
            name="images"
            rules={[
              { required: true, message: "Please upload at least one image!" },
            ]}
          >
            <Upload
              beforeUpload={beforeUpload}
              listType="picture-card"
              multiple
              showUploadList={{
                showRemoveIcon: true,
                showPreviewIcon: true,
              }}
              accept="image/*"
              className="w-full flex justify-center items-center border-2 border-dashed border-blue-500 rounded-lg p-10 space-y-2 hover:bg-blue-50"
            >
              <div className="flex flex-col items-center space-y-2">
                <UploadOutlined className="text-blue-500 text-4xl" />
                <span className="text-blue-500 text-sm">Click to Upload</span>
              </div>
            </Upload>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : "Submit"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminSkillComponent;
