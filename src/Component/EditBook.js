import React, { Component } from 'react'

import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios';

export default class EditBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
        isbn: '',
        name:'', 
        author:'', 
        price :0, 
        availability:false
    };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      
    componentDidMount() {
        const config = { headers: {'Content-Type': 'application/json'} };
        axios.post('http://localhost:8080/book/find/' , this.props.match.params.id ,config)
        .then(response => {
            this.setState({ 
                isbn: response.data.isbn, 
                name: response.data.name,
                author: response.data.author,
                price: response.data.price,
                availability: response.data.availability,
              
             });
        })
        .catch(function (error) {
          console.log(error);
        })
      }


      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
      
      handleSubmit(event) {

        const config = { headers: {'Content-Type': 'application/json'} };
        axios.post('http://localhost:8080/book/update/'+this.props.match.params.id , this.state ,config)
        .then(response => {
            this.props.history.push('/ListBooks')
        })
        .catch(function (error) {
          console.log(error);
        })
     
      }
    render() { 
   
        return (
            <Form onSubmit={this.handleSubmit}>
            <Form.Field  >
              <label>ISBN</label>
              <input  name="isbn" value={this.state.isbn} onChange={this.handleChange} placeholder='ISBN'  />
          
            </Form.Field>
            <Form.Field>
              <label>Name of the Book </label>
              <input  name="name" value={this.state.name} onChange={this.handleChange} placeholder='Name of the Book ' />
            </Form.Field>
            <Form.Field>
              <label>Price of the Book </label>
              <input name="price" value={this.state.price} onChange={this.handleChange} type="number" placeholder='Price of the Book ' />
            </Form.Field>
            <Form.Field>
              <label>Author of the Book </label>
              <input name="author" value={this.state.author} onChange={this.handleChange}  placeholder='Author of the Book ' />
            </Form.Field>
            <Form.Field>
            <label>availability of the Book </label>
              <input type="checkbox" name="availability" checked={this.state.availability} onChange={this.handleChange} label='availability of the book ' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        )
    }
}
