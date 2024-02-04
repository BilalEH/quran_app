import React, { useEffect, useRef, useState } from "react";
import "./player.css";
import { useDispatch} from 'react-redux';
import { before, next } from "../store/reciters";

function LivePlayer(props) {
    const dispatch=useDispatch();
    const audioEle=useRef();
    const [volume,setvolume]=useState(70);
    const [time,settime]=useState('0:0:0');
    const [ifPlay,setifPlay]=useState(false);
    const [duration,setduration]=useState('0:0:0');
    const [BarTest,setBarTest]=useState(0);
    useEffect(() => {
        audioEle.current.load();
        setifPlay(true)
        // run_stop_audio(1)
    }, [props.audioData]);
    useEffect(()=>{
        audioEle.current.volume=volume/100;
    },[volume])
    
    const run_stop_audio=(e)=>{
        if(e==1){
            audioEle.current.play()
            setifPlay(true)
        }else{
            audioEle.current.pause()
            setifPlay(false)
        }
    }
    const timer=()=>{
        const h = Math.floor(audioEle.current.currentTime / 3600);
        const minutes = Math.floor((audioEle.current.currentTime%3600) / 60);
        const seconds = Math.floor(audioEle.current.currentTime % 60);
        settime(`${h}:${minutes}:${seconds}`)
        setBarTest(((audioEle.current.currentTime / audioEle.current.duration)*100).toFixed(2))
        if(!audioEle.current.duration){
            setduration('0:0:0')
        }else{
            setduration(`${Math.floor(audioEle.current.duration /3600)}:${Math.floor((audioEle.current.duration %3600)/ 60)}:${Math.floor(audioEle.current.duration % 60)}`)
        }
    }
    return (
        <div className="contGlobal">
            <div className="volume">
                <label className="slider">
                    <input type="range" className="level" min={0} max={100} defaultValue={volume} onChange={(e)=>setvolume(e.target.value)}/>
                    {volume==0?(<span className="material-symbols-outlined volume"onClick={()=>setvolume(50)}>volume_off</span>):(<span className="material-symbols-outlined volume"onClick={()=>setvolume(0)}>volume_up</span>)}
                </label>
            </div>
            <div className="controller">
                <div>
                    <span className="material-symbols-outlined control-btn" onClick={()=>dispatch(before())} style={{transform:"none",marginRight:'10px'}}>skip_previous</span>
                    {!ifPlay?(<span onClick={()=>run_stop_audio(1)} className="material-symbols-outlined control-btn">play_circle</span>):
                    (<span onClick={()=>run_stop_audio(0)} className="material-symbols-outlined control-btn">pause_circle</span>)}
                    <span  className="material-symbols-outlined control-btn" onClick={()=>dispatch(next())} style={{transform:"none",marginLeft:'10px'}}>skip_next</span>
                    <audio autoPlay={true} controls  ref={audioEle} style={{display:"none"}} onTimeUpdate={timer} onEnded={()=>dispatch(next())}  >
                        <source src={props.audioData} type="audio/mp3"/>
                    </audio>
                </div>
                <div className="timer-Bar">
                    <span className="time_d">{time}</span>
                    <label className="slider" style={{width:"100%"}}>
                        <input type="range" style={{width:"100%"}} className="level" min={0} max={100} value={BarTest} onChange={(e) => audioEle.current.currentTime=(e.target.value / 100) * audioEle.current.duration} />
                    </label>
                    <span className="time_d">{duration}</span>
                </div>
            </div>
            <div className="played">
                <div>
                    {props.children}
                </div>
                <div className="img">
                    <div className="played_name">
                        {props.name}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LivePlayer;