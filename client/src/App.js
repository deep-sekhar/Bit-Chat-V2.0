
import { Navbar } from "./mycomp/Navbar";
import { SigninForm } from "./mycomp/SigninForm";
import { ShowPosts } from "./mycomp/ShowPosts";
import Termsandcon from './mycomp/Termsandcon'
import { Aboutus } from './mycomp/Aboutus'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Profile} from './mycomp/Profile'
import {ErrorPage} from './mycomp/ErrorPage'
import {Logout} from './mycomp/Logout'
import './App.css'

// IMPORT REDUCERS AND INI STATE , CONTEXT AOI 
import { createContext, useReducer } from "react";
import {initialState, reducer} from './Reducer/useReducer'
// CONTEXT API 
export const UserContext = createContext();

function App() {
 // STATE VALUES 
  const[state,dispatch] = useReducer(reducer, initialState)
  
  return (
    <UserContext.Provider value = {{state, dispatch}}>
    <Router>

      <Navbar/>

      <Switch>

        <Route exact path="/">
          <ShowPosts/>
        </Route>
        <Route path='/userSignin'>
              <SigninForm/>
        </Route>
        <Route path="/Aboutus">
          <Aboutus/>
        </Route>
        <Route path="/tandc">
          <Termsandcon/>
        </Route>
        <Route path="/myprofile">
          <Profile/>
        </Route>
        <Route path="/userSignout" component={Logout} />
        <Route component={ErrorPage}/>
      </Switch>

    </Router>
    </UserContext.Provider>
  );
}

export default App;
