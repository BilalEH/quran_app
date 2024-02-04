import React, { useEffect, useState } from "react";
import "./style/index.css"
import AOS from "aos";
import 'aos/dist/aos.css'
function Live_Home() {
    useEffect(() => {
        AOS.init({duration:'1000'})
    }, [])
    const [id,setId]=useState(0);


    return (
        <div style={{width:"100%",height:"calc(100vh - 56px"}} className="contLive">
            <select className="channels form-select" onChange={(e)=>setId(e.target.value)} >
                <option value={0}>Quran channel</option>
                <option value={1}>Sunna channel</option>
            </select>
            <div className="globalCont" >
                <div className="eleCont">
                    <h1 className="title_s">
                        {id==0?('Quran channel'):('Sunna channel')}
                        
                    </h1>
                    <div className="ratio ratio-16x9" >
                        {
                            id==0?(
                                    <iframe width="1280" height="720" src="https://www.youtube.com/embed/moQtMet7F7w" title="بث مباشر || قناة القرآن الكريم || Makkah Live" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                ):(
                                    <iframe width="1280" height="720" src="https://www.youtube.com/embed/PQOB4MvQBdQ" title="🔴 Madinah Live Today HD 2024 | بث مباشر || قناة السنة النبوية | Madina Live Tv Online #Madinah" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                )
                            }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Live_Home;


