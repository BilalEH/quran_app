import {createSlice} from "@reduxjs/toolkit";


export const PhotoSlice=createSlice(
    {
        name:"photos",
        initialState:{
            server:'https://www.mp3quran.net/api/quran_pages_svg/',
            Photos:[
                {
                    id:1,
                    page: "https://www.mp3quran.net/api/quran_pages_svg/001.svg",
                    start:1,
                    end:1,
                },
            ]
        },
        reducers:{
            Page_selected:(state,action)=>{
                state.Photos=[];
                const pages=action.payload;
                while(pages.start<=pages.end){
                    let url;
                    if(pages.start<=604 && pages.start>0){
                        if(pages.start<10){
                            url=`${state.server}00${pages.start}.svg`;
                        }else{
                            if(pages.start<100 & pages.start>=10){
                            url=`${state.server}0${pages.start}.svg`;
                            }else{
                                url=`${state.server}${pages.start}.svg`;
                            }
                        }
                        state.Photos=[...state.Photos,
                            {
                                id:pages.pageId,
                                page:url,
                                start:pages.start,
                                end:pages.end,
                            }
                        ]
                    }
                    pages.start=pages.start+1
                }
            }
        },
    }
)

export default PhotoSlice.reducer;
export const {Page_selected}= PhotoSlice.actions; 
