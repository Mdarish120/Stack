import React,{useEffect, useState} from "react";
import {AppBar,Avatar,Toolbar,Typography,Button,} from "@material-ui/core";
import memory from "../../Images/memory.jpeg";
import useStyle from './style';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { LOGOUT } from "../../constant/actionTypes";
import { useHistory,useLocation } from "react-router-dom";
import decode from "jwt-decode";
import Stack from '@mui/material/Stack';



const Navbar=()=>{
    const classes=useStyle();

    const dispatch=useDispatch();
    
    const history=useHistory();
    const location =useLocation();
   const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));

     const logout=()=>{

        dispatch({type:LOGOUT});

        history.push('/auth');
        setUser(null);


     }

     
     useEffect(()=>{
      const token = user?.token;

      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    return(
        <>
        <AppBar className={classes.appBar} position="static" color="inherit"  >
           
           <Toolbar >
         
           <img  className={classes.img} src={memory} alt="memories" height="60" />
           <Typography  component={Link} to="/" className={classes.heading}  align="center"  >Memories</Typography>
            {
                user ?(
                    <div className={classes.profile}>
                      <Stack direction="row"  spacing={2}>
                     <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                      <Typography className={classes.userName}  variant="h6"> {user.result.name}</Typography>
                      <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}> LogOut</Button>
                      </Stack>
                        </div>
                ):(
                  <Button component={Link} to="/auth" variant="contained" color="primary" className={classes.btn} >Sigin</Button>
                    
                )
            }
           </Toolbar>
           </AppBar>
        </>
    )
}

export default Navbar;