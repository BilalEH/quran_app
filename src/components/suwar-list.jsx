import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SuwarList.css"
import BarLoader from './BarLoader';
import { suwarPaginate } from "../store/reciters";
import { Page_selected } from "../store/quranPhoto";
import AOS from "aos";
import 'aos/dist/aos.css'
function SuwarList(props) {
    const dispatch = useDispatch();
    const select_sowra = (e) => {
        dispatch(Page_selected({ pageId: e.id, start: e.start_page, end: e.end_page }))
        dispatch(suwarPaginate({ 'idSoura': e.id }))
    }
    return (
        <div className="cont" data-aos="fade-right">
            {
                props.suwar_data.status== 'succeeded' ?
                    (
                        props.suwar_data.suwarData.map(e => {
                            return (
                                <div className={props.ruer != e.id ? "sura" : 'ruer sura'} key={e.id} onClick={() => select_sowra(e)}>
                                    <div className="local_div">
                                        <span className="suworaId">{e.id}</span>
                                        <span className="Pages">{e.start_page}-{e.end_page}</span>
                                        <span className="name">{e.name}</span>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="lading">
                            <BarLoader />
                        </div>
                    )
            }
        </div>
    );
}

export default SuwarList;