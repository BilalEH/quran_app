import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

export const ReadsFetch=createAsyncThunk(
        "ReadsFetch",
        async()=>{
            const res=await fetch('https://mp3quran.net/api/v3/ayat_timing/reads');
            const data= await res.json();
            return data;
        }
);

export const ReadsSlice=createSlice(
    {
        name:"Reads",
        initialState:{
            status:'',
            ReadsData:[],
            reader:{
                id: 1,
                name: "إبراهيم الأخضر",
                rewaya: "حفص عن عاصم",
                folder_url: "https://server6.mp3quran.net/akdr/",
                soar_count: 114,
                soar_link: "https://www.mp3quran.net/api/v3/ayat_timing/soar?read=1"
            }
        },
        reducers:{
            readerChange:(state,action)=>{
                if(state.status=='succeeded'){
                    const readerId=action.payload.readerId;
                    const eleSelected=state.ReadsData.filter(e=>e.id==readerId)[0];
                    state.reader=eleSelected
                }
            },
        },
        extraReducers:(builder)=>{
            builder
            .addCase(ReadsFetch.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(ReadsFetch.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.ReadsData = action.payload;
            })
            .addCase(ReadsFetch.rejected, (state) => {
            state.status = 'failed';
            })
        }
    }
)
export const {readerChange} =ReadsSlice.actions;
export default ReadsSlice.reducer;