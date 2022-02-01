import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import useStyle from './style';
import { Grid,CircularProgress } from "@material-ui/core";



const Posts=({setCurrentId})=>{

    const { create,isLoading} =useSelector((state)=>state.create)
      
    const classes=useStyle();

    if(!create.length && !isLoading) return 'No Posts';
    

    return(
    
         isLoading ? <CircularProgress/> :(
             <Grid className={classes.container} container alignItems="stretch" spacing ={3}>
                 {
                     create.map((create)=>(
                         <Grid key={create._id} item xs={12}  sm={12} md={6} lg={3}>
                             <Post create={create} setCurrentId={setCurrentId} />

                             </Grid>

                     ))
                 }

             </Grid>
         )
        
    )
}

export default Posts;