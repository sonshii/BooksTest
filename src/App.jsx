import React, {
  useState,
  useEffect
} from 'react'
import BookCreator from './Components/InputBooks/BookCreator'
import BooksList from './Components/BooksList/BooksList'
import {
  BOOKS_STORE
} from './const';

import './App.css';
import 'antd/dist/antd.css';

import { Row, Col, Button } from 'antd';

function App() {
  const [books, setBooks] = useState([]); // список книг
  const [isModalVisible, setIsModalVisible] = useState(false); // состояние модального окна (открыто/закрыто)
  const [editableBook, setEditableBook] = useState(); // отредактированная книга
  
  /** Открытие модального окна */
  const showModal = () => {
    setIsModalVisible(true);
  };

   /** Закрытие модального окна */
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditableBook();
  };

  /** Сохранение в LocalStorage */
  const saveBookInLocalStorage = (currentBooks) => {
    localStorage.setItem(BOOKS_STORE, JSON.stringify(currentBooks));
  }

  /** Созранение в books и LocalStorage */
  const saveBooks = (books) => {
    setBooks(books);
    saveBookInLocalStorage(books);
  }

  /** Удаление книги по ID и сохранение в books и LocalStorage */
  const deleteBook = (bookID) =>{
    const newBooksList = books.filter((book) => book.id !== bookID)
    setBooks(newBooksList);
    saveBookInLocalStorage(newBooksList);
  }

  /** Присвоение id книге и сохранение */
  const addBook = (book) => {
    const newBook = {
      id: `${new Date().getTime()}`,
      ...book
    }
    const currentBooks = [...books, newBook];
    saveBooks(currentBooks);
  }

  /** Обновление книги  */
  const updateBooks = (book) => {
    const updatedBooks = books.map(b => b.id === book.id ? book : b);
    saveBooks(updatedBooks);
  }

  /** Устаавливает данные book при нажатии на иконку редактирования */
  const onEditBook = (book) => {
    setEditableBook(book);
    setIsModalVisible(true);
  }

  /** Проверяет наличие id при закрытии модального окна (если id есть то обновляет данные, если нет, то создает новую книгу) */
  const modalСhoice = (book) => {
    if (book.id) {
      updateBooks(book);
    } else {
      addBook(book);
    }
    setEditableBook();
    setIsModalVisible(false);
  }

  useEffect(() => {
    const data = localStorage.getItem(BOOKS_STORE);
    if (data) {
      setBooks(JSON.parse(data));
    }
  }, []);
  return ( 
    <Row className="App">
      <Col span={12} offset = {6}>
        <Button type="primary" onClick={showModal} className="button">
          Добавить книгу
        </Button>
      </Col>
      <Col span={20} offset = {2}>
        <BooksList books={books} deleteBook={deleteBook} onEditBook={onEditBook}  />
      </Col>
      {isModalVisible && (
        <BookCreator
          isVisible={isModalVisible}
          onCancel={handleCancel}
          modalСhoice={modalСhoice}
          initialFormData={editableBook}
        /> 
      )}
    </Row>
  );
}

export default App;