import { makeStyles } from "@material-ui/core";

export default  makeStyles((theme)=>({
  
    appBarSearch:{
        borderRadius:4,
        marginBottom:4,
        display:"flex",
        padding:"16px"

    },

    pagination:{
      borderRadius:4,
      maginBottom:"1rem",
      display:"flex",
      padding:"16px",
    },
    mainContainer:{
        [theme.breakpoints.down('sm')] :{
            mainContainer:{
             flexDirection:"column-reverse"
            }
        }

    }
  
   

}));

