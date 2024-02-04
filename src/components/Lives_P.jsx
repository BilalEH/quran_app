import React, { useEffect, useRef, useState } from "react";
import "./Lives_P.css";
import { useDispatch } from 'react-redux';
import { selected } from "../store/radio";
import AOS from "aos";
import 'aos/dist/aos.css'

function Lives_P(props) {
    const dispatch=useDispatch();
    const audioEle=useRef();
    const [ifPlay,setifPlay]=useState(true);
    const [time,settime]=useState("0:0:0");
    const [volume,setvolume]=useState(70);
    const [select_cpt,setSelect_cpt]=useState(98);
    const [audioStatus,setAudioStatus]=useState(true);
    const run_stop_audio=(e)=>{
        if(e==1){
            audioEle.current.play()
            setifPlay(true)
        }else{
            audioEle.current.pause()
            setifPlay(false)
        }
    }
    useEffect(
        ()=>{
            audioEle.current.load();
            setifPlay(true)
            setAudioStatus(true)
        },[props.Audio.url]
    )
    useEffect(()=>{
        audioEle.current.volume=volume/100;
    },[volume])

    const timer=()=>{
        const h = Math.floor(audioEle.current.currentTime / 3600);
        const minutes = Math.floor((audioEle.current.currentTime%3600) / 60);
        const seconds = Math.floor(audioEle.current.currentTime % 60);
        settime(`${h}:${minutes}:${seconds}`);
    }
    useEffect(()=>{
        if(select_cpt>=0 && select_cpt<133){
            dispatch(selected({'id_selected':select_cpt}))
        }else{
            if(select_cpt>=133){
                setSelect_cpt(0)
                dispatch(selected({'id_selected':0}))
            }
            if(select_cpt<0){
                setSelect_cpt(132)
                dispatch(selected({'id_selected':132}))
            }
        }
    },[select_cpt,dispatch])
    useEffect(()=>{AOS.init({duration:'500'})},[])
    return (
        <div className="cont_live">        
            <div className="card_cont" data-aos="flip-up">
                <div className="img_zone">
                    <img src="./pngegg.png" alt="animation" width={'200px'} className={`img-animation ${ifPlay?'played_img':''} ${audioStatus&&'lading_img'}`} onClick={()=>run_stop_audio(ifPlay?0:1)}/>
                </div>
                <div className="text_info">
                    <span className="info_name">{props.Audio.name}</span>
                    <span className="info_time">{time}</span>
                </div>
                <div className="controller_zone">
                    <audio style={{display:'none'}} ref={audioEle} controls autoPlay onTimeUpdate={timer} onCanPlay={()=>setAudioStatus(false)}>
                        <source src={props.Audio.url}/>
                    </audio>
                    <div style={{transform:'scale(1.3)'}}>
                        <span className="material-symbols-outlined control-btn" onClick={()=>setSelect_cpt(select_cpt-1)} style={{transform:"none",marginRight:'5px',color:"#363062"}}>skip_previous</span>
                            {!ifPlay?(<span onClick={()=>run_stop_audio(1)} className="material-symbols-outlined control-btn" style={{color:"#363062"}}>play_circle</span>):
                            (<span onClick={()=>run_stop_audio(0)} className="material-symbols-outlined control-btn" style={{color:"#363062"}}>pause_circle</span>)}
                            <span  className="material-symbols-outlined control-btn" onClick={()=>setSelect_cpt(select_cpt+1)} style={{transform:"none",marginLeft:'5px',color:"#363062"}}>skip_next</span>
                        <span/>
                    </div>
                    <span className="vol-cont">
                        <div className="volume">
                            <label className="slider">
                                {volume==0?(<span className="material-symbols-outlined volume newS"onClick={()=>setvolume(50)}>volume_off</span>):(<span className="material-symbols-outlined volume newS"onClick={()=>setvolume(0)}>volume_up</span>)}
                                <input type="range" className="level levelV2" min={0} max={100} defaultValue={volume} onChange={(e)=>setvolume(e.target.value)}/>
                            </label>
                        </div>
                    </span>
                </div>
            </div>
        </div>

    );
}

export default Lives_P;
