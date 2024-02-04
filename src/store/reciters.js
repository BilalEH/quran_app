import {createSlice} from "@reduxjs/toolkit";


export const ReciterSlice=createSlice(
    {
        name:"reciter",
        initialState:{
            server:'https://server6.mp3quran.net/akdr/',
            audioSelected:{
                id:1,
                url:'https://server6.mp3quran.net/akdr/001.mp3',
            },
        },
        reducers:{
            serverChange:(state,action)=>{
                state.server=action.payload.server;
            },
            suwarPaginate:(state,action)=>{
                const IdSoura=action.payload.idSoura;
                let url;
                if(IdSoura>114){
                    state.audioSelected={
                        id:1,
                        url:'https://server6.mp3quran.net/akdr/001.mp3',
                    }
                }
                if(IdSoura<=0){
                    state.audioSelected={
                        id:114,
                        url:'https://server6.mp3quran.net/akdr/114.mp3',
                    }
                }
                if(IdSoura<=114 && IdSoura>0){
                    if(IdSoura<10){
                        url=`${state.server}00${IdSoura}.mp3`;
                    }else{
                        if(IdSoura<100 & IdSoura>=10){
                        url=`${state.server}0${IdSoura}.mp3`;
                        }else{
                            url=`${state.server}${IdSoura}.mp3`;
                        }
                    }
                    state.audioSelected={
                        id:IdSoura,
                        url:url
                    }
                }
            },
        }
    }
)
export const {serverChange,suwarPaginate} =ReciterSlice.actions;
export default ReciterSlice.reducer;