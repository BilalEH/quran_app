import React, { useState } from "react";
import {Link} from "react-router-dom";
import "./Header.css";
function Header() {

    const [headerActive,setHeaderActive]=useState(false);

    return (
        <div className="header_cont">
            <button onClick={()=>setHeaderActive(!headerActive)} className="btn_active btn">
                <div className="hamburger">
                    <input className="checkbox" type="checkbox" />
                    <svg fill="none" viewBox="0 0 50 50" height="30" width="30">
                        <path strokeLinecap="round" strokeWidth="4" stroke="black" d="M6 11L44 11" className="lineTop line"></path>
                        <path strokeLinecap="round" strokeWidth="4" stroke="black" d="M6 24H43" className="lineMid line" ></path>
                        <path strokeLinecap="round" strokeWidth="4" stroke="black" d="M6 37H43" className="lineBottom line" ></path>
                    </svg>
                </div>
            </button>
            <center className="links_cont" style={{transform:!headerActive ? ('translate(-50%,-50px)'):('translate(-50%,10px)')}}>
                <Link className="header_link ms-4 me-4" to={'/'}>mushaf reciters</Link>
                <Link className="header_link ms-4 me-4" to={'/Radio'}>Radio</Link>
                <Link className="header_link ms-4 me-4" to={'/Live'}>Live video broadcast</Link>
            </center>
        </div>
    );
}

export default Header;