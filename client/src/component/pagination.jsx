import React ,{useEffect} from 'react';
import {Pagination,PaginationItem} from "@material-ui/lab";
import useStyles from "./style";
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {getPost} from "../actions/post";

const Pagin = ({page}) => {
    const {numberOfPage}=useSelector((state)=>state.create);

    const classess=useStyles();
    const dispatch=useDispatch();


    useEffect(()=>{
       dispatch(getPost(page));
    },[page])
    return (
        <div>
            <Pagination 
             className={{ul:classess.ul}}
             count={numberOfPage}
             page={Number(page) || 1}
             variant="outlined"
             color="primary"
             renderItem={(item)=>(
                <PaginationItem  {...item} component={Link} to={`/posts?page=${item.page}`} />
             )}
            />
        </div>
    )
}

export default Pagin;
