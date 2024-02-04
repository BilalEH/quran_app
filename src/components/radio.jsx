import React, { useEffect } from "react";
import "./radio.css";
import AudioPlayer from './player';
import { useDispatch , useSelector} from 'react-redux';
import { RadioFetch } from "../store/radio";

function Radio() {
    // const dispatch=useDispatch();
    // const LiveData=useSelector(state=>state.reciters)

    // useEffect(()=>{
    //     dispatch(ReciterFetch())
    // },[dispatch])
    
    
    // console.log(LiveData.status)

    
    const dispatch=useDispatch();
    const LiveData=useSelector(state=>state.radio)

    useEffect(()=>{
        dispatch(RadioFetch())
    },[dispatch])
    
    
    console.log(LiveData)

    return (
        <div>
            <AudioPlayer/>
        </div>
    );
}

export default Radio;