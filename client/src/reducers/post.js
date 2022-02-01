import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE ,FETCH_BY_SEARCH,START_LOADING,END_LOADING} from "../constant/actionTypes";

export default (state={isLoading :true ,create:[]},action)=>{
    switch(action.type) {

        case START_LOADING : 
         return {...state,isLoading:true}

         case END_LOADING : 
         return {...state,isLoading:false}
        case FETCH_ALL : 
        return {
           ...state, 
           create:action.payload.data,
           currentPage:action.payload.currentPage,
           numberOfPage:action.payload.numberOfPage
        };

        case FETCH_BY_SEARCH : 
        return {...state,create:action.payload};

        case UPDATE  : return {...state,create:state.create.map((post)=>(post._id===action.payload._id?action.payload:post))};

        case LIKE :
        return {...state,create:state.create.map((post)=>(post._id===action.payload._id?action.payload:post))};

        case DELETE  : 
        return  { ...state, create:state.create.filter((post)=>post._id===!action.payload)};
        case CREATE  :
            return{...state, create:[...state,action.payload]};

            default :
            return state;
    }
}