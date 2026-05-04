"use client"
import { Component } from "react"; 
import Calender from "./Calendar";
import style from "./date.module.css";
import Footer from "./Footer/footer";
export default function Date(){
    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className= {style.User}>
                    <div className ={style.userImg}>
                    </div>
                    <p>jajauu</p>
                </div>
                <img src="/icon/Hamburger_Icon.svg" alt="user"></img>
            </div>
            <Calender/>
            <div className={style.upcomingBody}>
                <p>Upcoming events</p>
                <div className ={style.upcoming}></div>
            </div>
            <div className={style.todayBody}>
                <p>Today events</p>
                <div className={style.today}></div>
            </div>
            <Footer/>
        </div>
    )
}