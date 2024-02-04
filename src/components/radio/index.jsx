import React, { useEffect } from "react";
import { RadioFetch } from "../../store/radio";
import { useDispatch,useSelector } from 'react-redux';
import Lives_P from '../Lives_P';
import AOS from "aos";
import 'aos/dist/aos.css'


function Radio_Home() {
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(RadioFetch())
    },[dispatch])
    const RadioData=useSelector(state=>state.radio.selected_ele);
    return (
        <>
            <Lives_P Audio={RadioData}/>
        </>
    );
}

export default Radio_Home;