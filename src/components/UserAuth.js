import React, {useState, useEffect} from 'react'
import {  auth } from '../firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import '../UserAuth.css';


function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    },
}));

function UserAuth() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] =useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in..
                console.log(authUser);
                setUser(authUser);

            } else {
                //user has logged out...
                setUser(null);
            }
        })

        return () => {
            //perform some cleanup actions
            unsubscribe();
        }
    },[user, username]);


    const signUp = (event) => {
        event.preventDefault();
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            return authUser.user.updateProfile({
                displayName:username
            })
        })
        .catch((error) => alert(error.message))

        setOpen(false);
    }

    const signIn =(event) => {
        event.preventDefault();
        auth
          .signInWithEmailAndPassword(email, password)
          .catch((error) => alert(error.message))
        
        setOpenSignIn(false);  
    }

    return (
        <div>
            <Modal
            open={open}
            onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="userauth__signup">
                        <center>
                            <h1>hey!!</h1>
                        </center>
                        <Input
                         placeholder="username"
                         type="text"
                         value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                         placeholder="Email"
                         type="text"
                         value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                         placeholder="password"
                         type="password"
                         value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={signUp}>Sign Up</Button>
                    </form>
                </div>    
            </Modal> 
             
            <Modal
            open={openSignIn}
            onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="userauth__signup">
                        <center>
                            <h1>hey!!</h1>
                        </center>
                        <Input
                         placeholder="Email"
                         type="text"
                         value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                         placeholder="password"
                         type="password"
                         value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={signIn}>Sign In</Button>
                    </form>
                </div>    
            </Modal> 
        
            {user?.displayName? (
                <>
                  <Button type="submit" onClick={() => auth.signOut()}>Log Out</Button> 
                  <h3>user:{user.displayName}</h3>
                  
                  
               </>
            ): (
                <div className='userauth__loginContainer'>
                    <h4>sorry you need to login first</h4>
                    <Button type="submit" onClick={() => setOpenSignIn(true)}>Sign In</Button>
                    <Button type="submit" onClick={() => setOpen(true)}>Sign Up</Button>
                    
                </div>    
            )} 
               
        </div>  
    )
}

export default UserAuth
