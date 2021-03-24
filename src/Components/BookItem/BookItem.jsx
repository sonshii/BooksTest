import React from 'react'

import { Card, Image, Typography } from 'antd';
import {
  CloseOutlined,
  EditOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const BookItem = ({ book, deleteBook, onEditBook }) =>{
  return (
    <div>
      <Card
        cover={
          <Image
            alt="image"
            src={book.photo}
          />
        }
        actions={[
          <EditOutlined onClick={()=>{onEditBook(book)}} key="edit" />,
          <CloseOutlined onClick={()=>{deleteBook(book.id)}}/>
        ]}
      >
      <Title>{book.title}</Title>
      <Text>{book.author}</Text>
    </Card>
  </div>
  )

}

export default BookItem;