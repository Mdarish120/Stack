import React from "react";
import { Container } from "@material-ui/core";
import Home from './component/Home/Home';
import { BrowserRouter ,Switch ,Route,Redirect } from "react-router-dom";
import Auth from "./component/Auth/Auth";
import PostDetails from "./component/PostDetails/PostDetails";



import Navbar from "./component/Navbar/Navbar";

const App=()=>{
     
    const user=JSON.parse(localStorage.getItem('profile'));
    
   
    return(
        <>
        <BrowserRouter>
        <Container maxwidth="lg" >
            <Navbar/>
            <Switch>
                <Route path="/" exact component={ ()=><Redirect to="/posts" />}/>
                <Route path="/posts" exact component={ ()=>(!user?<Redirect to="/auth" />:<Home/>)}/>
                <Route path="/posts/search" exact component={ ()=>(user?<Home/> :<Redirect to="/auth" />)}/>
                <Route path="/posts/:id" exact component={ PostDetails}/>
                <Route path="/auth" exact component={()=>(!user?<Auth />:<Redirect to="/posts" />)}/>
             

                </Switch>
          
       

       </Container>
        </BrowserRouter>
      
        </>
    )
}

export default App;