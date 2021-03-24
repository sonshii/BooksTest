import React from 'react'

import BookItem from '../BookItem/BookItem'
import { Row, Col } from 'antd';

const BooksList = ({ books, deleteBook, onEditBook }) => {
  return books.length ? (
    <Row gutter={[16, 16]}>
      {books.map(book => (
        <Col xs={24} sm={12} md={8} lg={8} xl={6} key={book.id}>
          <BookItem book={book} deleteBook={deleteBook}  onEditBook={onEditBook}/>
        </Col>
      ))}
    </Row>
  ) : (
    <div>Книг нет.</div>
  );
}

export default BooksList