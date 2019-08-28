import React, { Component } from 'react'
import { Table ,Icon, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import axios from 'axios';
import { link } from 'fs';
import EditBook from './EditBook';
export default class ListBooks extends Component {


  constructor(props) {
    super(props);
    this.state = {books: [], search:''};
    this.filterListBook = this.filterListBook.bind(this)
  }
    


    componentDidMount(){
      axios.get('http://localhost:8080/book/findAll/')
        .then(response => {
          this.setState({ books: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }

deleteBook(id){
  const config = { headers: {'Content-Type': 'application/json'} };
  axios.post('http://localhost:8080/book/remove/',id,config)
        .then(response => {
          axios.get('http://localhost:8080/book/findAll/')
        .then(response => {
          this.setState({ books: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
        })
        .catch(function (error) {
          console.log(error);
        })
}


filterListBook(event){
  this.setState({ search: event.target.value });
}


  
    render() {

      const {  books} = this.state

      let filteredListBook = this.state.books && this.state.books.filter(book => {
        return (
          (book.name + book.author).toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
        )
      });
    
      console.log(this.state)
        return (
<div>
          <input
                            type="text"
                      
                            placeholder="Search"
                            value={this.state.search}
                            onChange={this.filterListBook}
                          />
          <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>isbn</Table.HeaderCell>
              <Table.HeaderCell>name</Table.HeaderCell>
              <Table.HeaderCell>price</Table.HeaderCell>
              <Table.HeaderCell>availability</Table.HeaderCell>
              <Table.HeaderCell>author</Table.HeaderCell>
              <Table.HeaderCell>Operation</Table.HeaderCell>
           
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
          { filteredListBook &&   filteredListBook.map(function(book, i){
          return      <Table.Row key={book.id}>
          <Table.Cell >{book.isbn}</Table.Cell>
          <Table.Cell>{book.name}</Table.Cell>
          <Table.Cell>{book.price}</Table.Cell>
          <Table.Cell> {book.availability ?    <Icon color="green" name='checkmark' /> : <Icon color="red" name='close' />} </Table.Cell>
      
          <Table.Cell>{book.author}</Table.Cell>
          <Table.Cell>
            <Button as={Link}  name="edit" to={`/EditBook/${book.id}`}  > Modify</Button>
            <Button onClick={() => this.deleteBook(book.id)}> delete</Button>
          </Table.Cell>
        </Table.Row>
        ;
      }.bind(this))
       }
          </Table.Body>
        </Table>
        </div>
        )
    }
}
