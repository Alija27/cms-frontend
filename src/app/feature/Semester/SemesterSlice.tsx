import { createSlice } from "@reduxjs/toolkit";
import { getAllSemesters,createSemester,deleteSemester,updateSemester} from "./SemesterApi";

export const SemesterSlice=createSlice({
    name:"Semester",
    initialState:{
        semesters:[],
        loading:false,
        error:false,
        success:false,
        message:null,
        semseter:{},
        

    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllSemesters.pending,(state)=>{
            state.loading=true;
            state.error=false;
            state.success=false;
            state.message=null;
        });
        builder.addCase(getAllSemesters.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=false;
            state.success=true;
            state.message=null,
            state.semesters=action.payload.data;
        });
        builder.addCase(getAllSemesters.rejected,(state,action)=>{
            state.loading=false;
            state.error=true;
            state.success=false;
            state.message=null;
        });

        builder.addCase(createSemester.pending,(state)=>{
            state.loading=true;
            state.error=false;
            state.success=false;
            state.message=null;
        }
        );
        builder.addCase(createSemester.fulfilled,(state:any,action)=>{
            state.loading=false;
            state.error=false;
            state.success=true;
            state.message=action.payload.message;
            state.semesters.push(action.payload.data);
        }
        );
        builder.addCase(createSemester.rejected,(state)=>{
            state.loading=false;
            state.error=true;
            state.success=false;
            state.message=null;
        }
        );

        builder.addCase(deleteSemester.pending,(state)=>{
            state.loading=true;
            state.error=false;
            state.success=false;
            state.message=null;
        }
        );
        builder.addCase(deleteSemester.fulfilled,(state:any,action)=>{
            state.loading=false;
            state.error=false;
            state.success=true;
            state.message=action.payload.message;
            state.semesters=state.semesters.filter((semester:any)=>semester.id!==action.payload.data.id);
            state.semseter=action.payload.data;
        }
        );
        builder.addCase(deleteSemester.rejected,(state)=>{
            state.loading=false;
            state.error=true;
            state.success=false;
            state.message=null;
        }
        );

        builder.addCase(updateSemester.pending,(state)=>{
            state.loading=true;
            state.error=false;
            state.success=false;
            state.message=null;
        }
        );
        builder.addCase(updateSemester.fulfilled,(state:any,action)=>{
            state.loading=false;
            state.error=false;
            state.success=true;
            state.message=action.payload.message;
            state.semesters=state.semesters.map((semester:any)=>semester.id===action.payload.data.id?action.payload.data:semester);
            
        }
        );
        builder.addCase(updateSemester.rejected,(state)=>{
            state.loading=false;
            state.error=true;
            state.success=false;
            state.message=null;
        }
        );
        

        
        
    }

})

export default SemesterSlice.reducer;