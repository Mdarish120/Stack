import { makeStyles } from "@material-ui/core";

export default  makeStyles((theme)=>({
    appBar:{
        borderRadius:15,
        margin:"30px 0",
        display:"flex",
        flexDirection:'row',
       
        alignItems:"center",
        paddind:"10px 50px"
    },

    heading:{
        color :'rgba(0,183,255,1)',
        fontSize:"3rem",
      
      
      
       
    },

 
    img:{
        marginLeft: "2em",
        display:"flex",
       
     

    },
    brandContainer:{
        marginLeft:"7em",
        dispaly:"flex",
       alignItems:"center"
    },

    profile:{
         marginLeft:theme.spacing(67)

    },

    btn:{

        marginLeft:theme.spacing(94)
    }


   

}));

