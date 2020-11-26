import React, {useState, useEffect} from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import '../Todo.css';
import { db } from '../firebase';
import firebase from 'firebase';

function AddTodo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

     //when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this code here.. fires when the app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      //console.log(snapshot.docs.map(doc => doc.data()));
      //get data from database
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);


  const addTodo = (event) => {
    //this will fire off when click to the button
    event.preventDefault(); //stop the refresh
    
    //now add data to databse from browser
    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      
      
    })

    setInput(''); //clear up the input after click button addtodo
  }

  return (
    <div className="Addtodo">
      
      <h1>your Todos</h1>   
      

      <form>
        <FormControl>
          <InputLabel>write a todo</InputLabel>
          <Input  value={input} onChange = {event => setInput(event.target.value)} />
        </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
        {/* <input  value={input} onChange = {event => setInput(event.target.value)} /> */}
        {/* <button type="submit" onClick={addTodo}> Add Todo</button> */}
      </form>
      
      
    

      

      <ul>
        {todos.map((todo) => (
          <Todo  todo={todo} />
          // <li>{todo}</li>
        ))}
      </ul>
      
    </div>
  );
}

export default AddTodo;
