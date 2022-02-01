import React from "react";
import useStyle from './style';
import { Card,CardActions,CardContent,CardMedia,Button,Typography,ButtonBase } from "@material-ui/core";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";
import {useDispatch} from "react-redux";
import { deletePost,likePost } from "../../../actions/post";
import { useHistory } from "react-router-dom";



const Post=({create ,setCurrentId})=>{
    
  const history=useHistory();
    const user=JSON.parse(localStorage.getItem('profile'));
    const Likes = () => {
        if (create.likes.length > 0) {
          return create.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{create.likes.length > 2 ? `You and ${create.likes.length - 1} others` : `${create.likes.length} like${create.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{create.likes.length} {create.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
    const dispatch=useDispatch();
    const classes=useStyle();

    const openPost=()=>{
        
      history.push(`/posts/${create._id}`);
       
    }

    return(
       
       
        <Card className={classes.card} raised elevation={3}>
          <ButtonBase 
           className={classes.cardActions}
           onClick={openPost}
          >
            <CardMedia className={classes.media}  image={create.selectedFile} title={create.title}/>
            <div className={classes.overlay}>
            
                <Typography variant="h6">{create.name}</Typography>
                <Typography variant="body2">{moment(create.createdAt).fromNow()}</Typography> 

            </div>

            {(user?.result?.googleId===create?.creator || user?.result?._id===create?.creator) && (
            <div className={classes.overlay2}>
                <Button style={{color:"white"}} size="small" onClick={()=>setCurrentId(create._id)}> <MoreHorizIcon fontSize="default" /> </Button>

            </div>
            )}
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" gutterBottom>{create.tags.map((tag)=> ` #${tag} `)}</Typography>
            </div>

            <CardContent>

            <Typography  className={classes.title} variant="h5" gutterBottom>{create.title}</Typography>
            <Typography   variant="body2"  color="textSecondary" component="p">{create.message}</Typography>
             </CardContent>
             </ButtonBase>
             <CardActions className={classes.cardActions}>
                 <Button size="small"  color="primary" disabled={!user?.result} onClick={()=>dispatch(likePost(create._id))} > 
                      <Likes/>
                 </Button>

                 {(user?.result?.googleId===create?.creator || user?.result?._id===create?.creator) && (
                            <Button size="small"  color="primary" onClick={()=>dispatch(deletePost(create._id))} > <DeleteIcon  fontSize="small"/> 
                            Delete
                          
                            </Button>
                 )}
                

             </CardActions>
        </Card>
         
          
    )
}

export default Post;