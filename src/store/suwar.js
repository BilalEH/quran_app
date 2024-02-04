import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const suwarfetch=createAsyncThunk(
    'suwarfetch',
    async()=>{
        const res=await fetch('https://www.mp3quran.net/api/v3/suwar?language=ar')
        const data=res.json();
        return data;
    }
)



export const SuwarSlice=createSlice(
    {
        name:'suwar',
        initialState:{
            status:'',
            suwarData:[],
        },
        extraReducers:(builder)=>{
            builder
            .addCase(suwarfetch.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(suwarfetch.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.suwarData = action.payload.suwar;
            })
            .addCase(suwarfetch.rejected, (state) => {
            state.status = 'failed';
            })
        },
    }
)

export default SuwarSlice.reducer;

