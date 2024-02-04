import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";



export const RadioFetch=createAsyncThunk(
        "RadioFetch",
        async()=>{
            const res=await fetch('https://www.mp3quran.net/api/v3/radios?language=ar');
            const data= await res.json();
            return data;
        }
);



export const RadioSlice=createSlice(
    {
        name:"radio",
        initialState:{
            status:'',
            radioData:[],
            selected_ele:{
                id:98,
                name:" إذاعة معيض الحارثي",
                url:"https://backup.qurango.net/radio/moeedh_alharthi",
                recent_date:"2020-04-25 13:04:05",
            },
            Like_list:[]
        },
        extraReducers:(builder)=>{
            builder
            .addCase(RadioFetch.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(RadioFetch.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.radioData = action.payload.radios;
            })
            .addCase(RadioFetch.rejected, (state) => {
            state.status = 'failed';
            })
        },
        reducers:{
            selected:(state,action)=>{
                if(state.status=='succeeded'){
                    const id_select=action.payload.id_selected;
                    const ele=state.radioData.filter((e,index)=>index==id_select)[0];
                    state.selected_ele={
                        id:ele.id,
                        name:ele.name,
                        url:ele.url,
                        recent_date:ele.recent_date,
                    }
                }
            }
        }
    }
)

export default RadioSlice.reducer;
export const {selected}= RadioSlice.actions; 