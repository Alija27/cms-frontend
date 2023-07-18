import { createSlice } from "@reduxjs/toolkit";
import { getAllSubjects,createSubject,updateSubject,deleteSubject} from "./SubjectApi";

export const SubjectSlice =  createSlice({
    name:"Subject",
    initialState:{
        subjects:[],
        loading:false,
        error:false,
        success:false,
        message:null,
        subject:{},
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllSubjects.pending,(state)=>{
            state.loading=true;
            state.error=false;
            state.success=false;
            state.message=null;
        });
        builder.addCase(getAllSubjects.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=false;
            state.success=true;
            state.message=null;
            state.subjects=action.payload.data;
        });
        builder.addCase(getAllSubjects.rejected,(state,action)=>{
            state.loading=false;
            state.error=true;
            state.success=false;
            state.message=null;
        });
        
        builder.addCase(createSubject.pending,(state)=>{
            state.loading=true;
            state.error=false;
            state.success=false;
            state.message=null;    
        }
        );
        builder.addCase(createSubject.fulfilled,(state:any,action)=>{
            state.loading=false;
            state.error=false;
            state.success=true;
            state.message=action.payload.message;
            state.subjects.push(action.payload.data);
        }
        );
        builder.addCase(createSubject.rejected,(state)=>{
            state.loading=false;
            state.error=true;
            state.success=false;
            state.message=null;
        }
        );

        builder.addCase(updateSubject.pending,(state)=>{
            state.loading=true;
            state.error=false;
            state.success=false;
            state.message=null;    
        }
        );
        builder.addCase(updateSubject.fulfilled,(state:any,action)=>{
            state.loading=false;
            state.error=false;
            state.success=true;
            state.message=action.payload.message;
            state.subjects=state.subjects.map((subject:any)=>{
                if(subject.id===action.payload.data.id){
                    return action.payload.data;
                }
                return subject;
            });
        }
        );
        builder.addCase(updateSubject.rejected,(state)=>{
            state.loading=false;
            state.error=true;
            state.success=false;
            state.message=null;
        }
        );

        builder.addCase(deleteSubject.pending,(state)=>{
            state.loading=true;
            state.error=false;
            state.success=false;
            state.message=null;    
        }
        );
        builder.addCase(deleteSubject.fulfilled,(state:any,action)=>{
            state.loading=false;
            state.error=false;
            state.success=true;
            state.message=action.payload.message;
            state.subjects=state.subjects.filter((subject:any)=>subject.id!==action.payload.data.id);
        }
        );
        builder.addCase(deleteSubject.rejected,(state)=>{
            state.loading=false;
            state.error=true;
            state.success=false;
            state.message=null;
        }
        );
    }

    
})
export default SubjectSlice.reducer;