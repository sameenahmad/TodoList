import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Todos from "./Components/Todos";
import Header from "./Components/layout/Header";
import AddTodo from "./Components/AddTodo";
//import uuid from "uuid";
import About from "./Components/pages/About"
class App extends Component {
  state = {
    todos: []
  };

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then(res=> res.json())
    .then(data=> this.setState({todos :data}))
  }


  //toggle complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };
  delTodo = id => {
fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
{
  method: 'DELETE'
})
.then(res=> res.json())
.then(data=>
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    }))
  };

  addTodo = title => {
   fetch("https://jsonplaceholder.typicode.com/todos", {
   method: 'post',
   headers:{
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({title, completed:false}) ,
  })
  .then(res=>res.json())
  .then(data=>this.setState({ todos: [...this.state.todos, data ] }))
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div class="container">
            <Header />
            <Route
             exact path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
