import React,{useState} from "react";
import {useHistory} from "react-router-dom";
import {Avatar,Typography,Paper,Grid,Container,Button,Box} from "@material-ui/core";
import  LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./style";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constant/actionTypes";

import {GoogleLogin} from "react-google-login";

import Icon from "./Icon";

import { signup , signin} from "../../actions/auth";

const Auth=()=>{
     const initState={firstName:'',lastName:'',password:'',confirmPassword:'',email:''};
    const history=useHistory();
    const dispatch=useDispatch();
  const classes=useStyles();
    const [formData,setFormData]=useState(initState);
  const [mode,setMode]=useState(null);

   const [showPassword,setShowPassword]=useState(false);

   const handleShowPassword=()=> setShowPassword((prop)=>!prop);
    

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(mode){
            dispatch(signup(formData,history));
        }else{
            dispatch(signin(formData,history));
        }
          
        
    }

    const handleChange=(e)=>{

        setFormData({...formData,[e.target.name]:e.target.value})
        
    }

    const switchMode=()=>{
        setMode((p)=>!p);
    }

    const googleSuccess=async (res)=>{

        const result=res?.profileObj;
        const token=res?.tokenId;
        try{

            dispatch({type:AUTH,data:{result,token}});
             history.push("/posts");

        }catch(e){
            console.log(e)
        }
       
        

    }
    const googleFail=(e)=>{
        console.log(e)
        console.log("fail to log")
    }


  
    return(
        <>
       <Container maxWidth="xs">
           <Paper  elevation={3} className={classes.paper}>
               <Avatar  className={classes.avatar}>
                   <LockOutlinedIcon/>
               </Avatar>

               <Typography variant="h6" >{mode ? "Sign Up" : "Sign In"}</Typography>

               <form  onSubmit={handleSubmit}>

                   <Grid container spacing={2}>
                       {
                           mode && (
                               <>
                               <Input name="firstName"   label="FirstName" handleChange={handleChange} onFocus half />
                               <Input name="lastName"   label="LastName" handleChange={handleChange}  half />
                               
                             </>

                           ) }
                     <Input name="email" label="Email Address"  handleChange={handleChange} type="email"/>
                     <Input name="password"  label="Password" handleChange={handleChange} type={showPassword ? "text" :"password"} handleShowPassword={handleShowPassword} />

                       {mode &&  <Input name="confirmPassword" label="Repeate Password" handleChange={handleChange}  type="password"  />}
                      
                   </Grid>

                   <Button type="submit"  fullWidth variant="contained"  color="primary" className={classes.sub}>
                       {mode ?'Sign Up' :  "Sign In"}
                   </Button>
                   
                   <GoogleLogin
            clientId="316651532771-a1d4ib0g355dogg58nhlp7t3a41gcqhn.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFail}
            cookiePolicy="single_host_origin"
          />
                   <Grid container justify="flex-end">
                       <Grid item>
                   <Button onClick={switchMode}>
                    {mode ? 'Already have an account ? Sign In' : "Don't have an account ? Sign Up"}
                   </Button>
                   </Grid>
                    </Grid>
               </form>

           </Paper>

       </Container>
       
        </>
    );
}

export default Auth;
