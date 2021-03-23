import React, {useState} from 'react'

import {Button, Input, Modal, Form, Upload} from 'antd'
import {
  UploadOutlined
} from '@ant-design/icons';

const BookCreator = ({isVisible, onCancel, modalСhoice, initialFormData}) => {
  const [image, setImage] = useState();
  const [progress, setProgress] = useState(0);
  const [form] = Form.useForm();

  /** Отправляет форму */
  const handleOk = () => {
    form.submit();
  };

  /** Сохранение книги при отправке формы */
  const onFinish = (data) => {
    const photo = image ? image : initialFormData.photo;
    const book = {...initialFormData, ...data, photo};
    modalСhoice(book);
  };


  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
        // const image = new Image(reader.result);
        // image.src = reader.result;
        // image.onload = () => {
        //   console.log(image.naturalHeight);
        //   if (image.naturalHeight === 145 && image.naturalWidth === 205) {
        //     resolve(reader.result);
        //   } else {
        //     reject('неверный размер изображения')
        //   }
        // }
      };
      reader.onerror = error => reject(error);
  });
    
  const beforeUploadImage = async file => {
    try {
      const imageBase64 = await toBase64(file);
      setProgress(100);
      setImage(imageBase64);
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <div>
      <Modal 
        title="Добавить книгу"
        visible={isVisible} 
        onOk={handleOk} 
        onCancel={onCancel}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          form={form}
          initialValues={initialFormData}
        >
          <Form.Item
            label="Название книги"
            name="title"
            rules={[{ required: true, message: 'Введите название.' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Автор"
            name="author"
            rules={[{ required: true, message: 'Введите автора.' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Картинка">
            <Upload
              beforeUpload={beforeUploadImage}
              customRequest={() => {
                return;
              }}
              progress={{ success: { percent: progress } }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default BookCreator