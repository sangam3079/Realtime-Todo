import React from 'react'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, FormControl} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { db } from '../firebase';

function Todo(props) {
    return (
        <>
          <List className="todo_list">
              <ListItem>
                <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="your todos list" />
              </ListItem>
              <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
            </List>
        </>    
    )
}

export default Todo


