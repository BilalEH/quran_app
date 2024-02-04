import React, { useEffect, useState } from "react";
import AudioPlayer from './../player';
import SuwarList from './../suwar-list';
import { useDispatch,useSelector } from 'react-redux';
import { suwarfetch } from './../../store/suwar';
import { ReadsFetch, readerChange } from "../../store/API";
import BarLoader from "../BarLoader";
import './style/index.css';
import AOS from "aos";
import 'aos/dist/aos.css'
import { serverChange, suwarPaginate } from "../../store/reciters";
function Sowar_Home() {
    useEffect(() => {
        AOS.init({duration:'1000'})
    }, [])


    const dispatch=useDispatch()
    useEffect(
        ()=>{
            dispatch(ReadsFetch())
            dispatch(suwarfetch())
        },[dispatch]
    );
    const suwar_data=useSelector(state=>state.suwar)
    const audioObject=useSelector(state=>state.reciters.audioSelected) 
    const sowraPhotos=useSelector(state=>state.photo.Photos);
    const [readeSelected,setReadeSelected]=useState(1);
    const [audio_run,setAudio_run]=useState(audioObject);
    const [audio_info,setAudio_info]=useState({end_page:1,id:1,makkia:1,name:"الفاتحة",start_page:1,type: 0});
    const [PhotoIndex,setPhotoIndex]=useState(0);

        const PhotoPaginationAlgo=(action)=>{
            const len=sowraPhotos.length;
            if(action===1){
                if(PhotoIndex<len-1){
                    setPhotoIndex(PhotoIndex+1)
                }else{
                    setPhotoIndex(PhotoIndex)
                }
            }else{
                if(PhotoIndex>0){
                    setPhotoIndex(PhotoIndex-1)
                }else{
                    setPhotoIndex(PhotoIndex)
                }
            }
        }

    useEffect(
        ()=>{
            dispatch(readerChange({'readerId':readeSelected}))
        },[readeSelected,dispatch]
    );
    const readesApi=useSelector(state=>state.globalApi);
    const quranServer=readesApi.reader.folder_url;
    useEffect(()=>{
        dispatch(serverChange({'server':quranServer}))
        dispatch(suwarPaginate({'idSoura':audio_run.id}))
    },[quranServer,dispatch])

    useEffect(()=>{
        setAudio_run(audioObject)
        setPhotoIndex(0)
    },[audioObject,dispatch])

    useEffect(()=>{
        if(suwar_data.status==='succeeded'){
            setAudio_info(suwar_data.suwarData.filter(e=>e.id==audio_run.id)[0])
        }
    },[audio_run])
    return (
        <div style={{ width: "100%", height: "100vh", overflow: 'hidden' ,display:"flex"}}>
            <SuwarList ruer={audio_run.id} suwar_data={suwar_data}/>
            <div style={{width:"calc(100% - 350px)",position:'relative'}}>
                <AudioPlayer audioData={audio_run} audio_info={audio_info}>
                    <div>
                        {readesApi.status=='succeeded'?(<select defaultValue={readesApi.reader.id} className="form-select form-select-sm w-75 text-center" onChange={(e)=>setReadeSelected(e.target.value)}>{readesApi.ReadsData.map((e)=><option key={e.id} value={e.id}>{e.name}</option>)}</select>):(<div style={{overflow:'hidden',width:"100px",transform:'scale(0.5)'}}><BarLoader/></div>)}
                    </div>
                </AudioPlayer>
                <div className="" style={{overflow:'hidden',height:"calc(100% - 100px)",position:'absolute',top:'0',left:'0',width:"100%",display:'flex',alignItems:"center",justifyContent:'center'}}>
                    <div className="pages" data-aos="fade-up">
                        page: {PhotoIndex+sowraPhotos[0].start}
                    </div>
                    <button data-aos="zoom-in" onClick={()=>PhotoPaginationAlgo(0)} className="Photopagination btn material-symbols-outlined" style={{left:'50px'}}>keyboard_double_arrow_left</button>
                    <img data-aos="fade-up" data-aos-duration="1500" src={`${sowraPhotos[PhotoIndex]?(sowraPhotos[PhotoIndex].page):(sowraPhotos[0].page)}`} alt="" style={{maxHeight:'100%'}} />
                    <button data-aos="zoom-in"  onClick={()=>PhotoPaginationAlgo(1)} className="Photopagination material-symbols-outlined btn" style={{right:'50px'}}>double_arrow</button>
                </div>
            </div>
        </div>
    );
}


export default Sowar_Home;