import React from 'react';

import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {  Header,Divider, Form, Grid, Segment, Container , Button, GridRow } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ListBooks from './Component/ListBooks';
import AddBook from './Component/AddBook';
import EditBook from './Component/EditBook';


function App() {
  return (

  <Router>
    <Grid columns='equal'>
      <Grid.Row  centered> 

        <Header as='h2'  content=' Welcome to Books Managment' />
      </Grid.Row>

      <Grid.Row>
    <Grid.Column>
      
    </Grid.Column>
    <Grid.Column width={5}>
      <Segment>
      <Button as={ Link } name='ListBooks' to='/ListBooks'>View List of Books -></Button>

        
      <Button as={ Link } name='AddBook' to='/AddBook'>add a book  -></Button>
      </Segment>
    </Grid.Column>
    <Grid.Column>
   
    </Grid.Column>

    </Grid.Row>
  </Grid>

  <Switch>

              <Route exact path='/ListBooks' component={ ListBooks } />
              <Route exact path='/AddBook' component={ AddBook } />
              <Route exact path='/EditBook/:id' component={ EditBook } />
         
          </Switch>
  </Router>
  );
}

export default App;
