import React ,{useEffect,useState} from "react";
import useStyle from './style';
import { Container,Grow,Grid,Paper,AppBar,TextField,Button } from "@material-ui/core";
import  Form from "../Form/Form";
import  Posts from "../Posts/Posts";
import Pagin from "../pagination";
import { useHistory,useLocation } from "react-router";
import ChipInput from "material-ui-chip-input";

import {useDispatch} from "react-redux";
import { getPostsBySearch } from  '../../actions/post';

 function useQuery(){
     return new URLSearchParams(useLocation().search);
 }
 


const Home=()=>{
   
   
    const classes=useStyle();
    const [currentId,setCurrentId]=useState(null);
    const dispatch=useDispatch();
    const query=useQuery();
    const history=useHistory();
    const page=query.get('page') || 1;
    const searchQuery=query.get("searchQuery");
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);

    const handleKeyPress=(e)=>{

        if(e.keyCode===13){
           searchPost();
        }

    }

    const handleAdd=(tag)=>setTags([...tags,tag])

    

    const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=>tag!==tagToDelete));
   
    const searchPost=()=>{
        if(search.trim()|| tags){
           dispatch(getPostsBySearch({search,tags:tags.join(',')}));
           history.push(`/posts/search?searchQuery=${search|| 'none'}&tags=${tags.join(',')}`);
        }else{
            history.push('/');
        }
    }
    


   

    return(
        <>
         <Grow in >
               <Container maxWidth="lg">
                   <Grid  className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                       <Grid item xs={12} sm={6} md={8} >
                            <Posts setCurrentId={setCurrentId}/>  
                           </Grid>

                           <Grid item xs={12} sm={6} md={4} >
                               <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                  <TextField
                                   name="search"
                                   variant="outlined"
                                   label="Search Memories"
                                   onKeyPress={handleKeyPress}
                                   fullWidth
                                   value={search}
                                   onChange={(e)=>{setSearch(e.target.value)}}
                                   />
                                   <ChipInput
                                   style={{margin:"10px 0"}}
                                   value={tags}
                                   onAdd={handleAdd}
                                   onDelete={handleDelete}
                                   label="Search Tags"
                                   variant="outlined"
                                   />
                                   <Button onClick={searchPost} className={classes.searchButton}variant="contained" color="primary"> Search</Button>
                                   </AppBar>
                           <Form currentId={currentId} setCurrentId={setCurrentId} />
                           <Paper elevation={6} className={classes.pagination}>
                               <Pagin page={page} />

                           </Paper>
                           </Grid>

                   </Grid>
               </Container>
           </Grow>
        </>
    );
}

export default Home;