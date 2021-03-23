import React from 'react'

import BookItem from '../BookItem/BookItem'
import { Row, Col } from 'antd';

const BooksList = ({ books, deleteBook, onEditBook }) => {
  return books.length ? (
    <Row className="card-wrapper" gutter={[16, 16]}>
      {books.map(book => (
        <Col xs={24} sm={12} md={8} lg={8} xl={6} key={book.id}>
          <BookItem book={book} deleteBook={deleteBook}  onEditBook={onEditBook}/>
        </Col>
      ))}
    </Row>
  ) : (
    <div className="empty">Нет книг.</div>
  );
}

export default BooksList