import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import MyTodos from './pages/MyTodos';
import UserAuth from './components/UserAuth';
import './App.css';



function App () {
    return(
        <Router>
            <div className="app">
                
                <nav className="app__navbar">
                    <Link to ="/">Home</Link>
                    <Link to ="/mytodos">MyTodos</Link>
                    <Link to='/login'>Login</Link>
                </nav>
                
                <Switch>
                    <Route path="/mytodos" component={MyTodos}/>
                    <Route path="/login" component={UserAuth}/>
                    <Route path="/" component={Home}/>
                </Switch>

            </div>
            
            
            

        </Router>
        
    );
}

export default App;