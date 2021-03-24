import React, {useState} from 'react'

import {Button, Input, Modal, Form, Upload, Alert} from 'antd'
import {
  UploadOutlined
} from '@ant-design/icons';

const BookCreator = ({ isVisible, onCancel, modalСhoice, initialFormData }) => {
  const [image, setImage] = useState();
  const [progress, setProgress] = useState(0);
  const [form] = Form.useForm();
  const [sizeImage, setSizeImage] = useState(null)
  const [fileList, setfileList] = useState();
  
  /** Отправляет форму */
  const handleOk = () => {
    form.submit();
  };

  /** Сохранение книги при отправке формы */
  const onFinish = (data) => {
    if (sizeImage || sizeImage === null){
      const photo = image ? image : initialFormData.photo;
      const book = {...initialFormData, ...data, photo};
      modalСhoice(book);
    } else {
      console.log('error')
    }
  };
  

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          if ( image.naturalWidth === 145  && image.naturalHeight === 205 ) {
            resolve(reader.result);
            setSizeImage(true)
          } else {
            reject('неверный размер изображения')
            setSizeImage(false)
          }
        }
      };
      reader.onerror = error => reject(error);
  });
  
  
  const beforeUploadImage = async file => {
    try {
      setProgress(0);
      const imageBase64 = await toBase64(file);
      setProgress(100);
      setImage(imageBase64);
    } catch (error) {
      console.log(error);
    }
  };

  /* Закрытие всплывающего окна, если изображение соответсвует размерам */
  const handleClose = () => {
    setSizeImage(true);
  };

  /* Загрузка только одного изображения */
  const handleChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setfileList([...fileList]);
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
              accept="image/png, image/jpeg"
              beforeUpload={beforeUploadImage}
              customRequest={() => {
                return {};
              }}
              progress={{ success: { percent: progress } }}
              onChange={handleChange}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          {sizeImage === false ? (
              <Alert message="Введите картинку размером 145x205px" type="error" afterClose={handleClose} />
            ) : null}
        </Form>
      </Modal>
    </div>
  )
}

export default BookCreator