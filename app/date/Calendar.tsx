"use client";
import { useState } from "react"
import style from "./calendar.module.css"
export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayofMonth = new Date(year, month , 1);
    const startDay = new Date(firstDayofMonth);
    startDay.setDate(1 - firstDayofMonth.getDay());
    
    const lastDayofMonth = new Date(year,month +1 , 0);
    const endDay  = new Date(lastDayofMonth);
    endDay.setDate(lastDayofMonth.getDate() + (6 - lastDayofMonth.getDay()));

    //startDay, endDay까지 날짜를 주단위로 배열 작성
    const groupDatesByWeek = (startDay : Date, endDay : Date) => {
        const weeks:Date[][] =[] ;
        let currentWeek :Date[] = [] ;
        let current = new Date(startDay) ;
        while (current.getTime() <= endDay.getTime()) {
            currentWeek.push(new Date( current)) ;
            if ( currentWeek.length === 7 ) {
                weeks.push( currentWeek) ;
                currentWeek = [] //초기화
            }
            current.setDate(current.getDate()+ 1 );
        }
        // 막주 처리
        if (currentWeek.length > 0 ) {
            weeks.push(currentWeek);
        }
        return weeks ;
    };
    //weeks 처리
    const weeks = groupDatesByWeek(startDay, endDay);
    //handling
    const handlePrevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() -1, 1)
        );
    };
    const handleNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(),currentDate.getMonth()+1 ,1 )
        );
    };
    //오늘자로
    const isCurrentMonth = (date: Date) =>{
        return date.getMonth() === month;
    }
    const isToday = (date: Date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }
    //날짜선택
    const [selectedStart , setSelectedStart] = useState<Date|null>(null);
    const [selectedEnd , setSelectedEnd] = useState<Date|null>(null);
    const isSame = (d1:Date , d2:Date) => {
        return d1.toDateString() === d2.toDateString();
    }
    const isInRange = (date : Date) => {
        if ( !selectedStart || !selectedEnd) return false;
        return date > selectedStart && date < selectedEnd;
    }
    const handleDateClick = (date: Date) => {
    // 아무것도 없거나, 이미 range 끝난 상태 → 새 시작
        if (!selectedStart || selectedEnd) {
            setSelectedStart(date);
            setSelectedEnd(null);
            return;
        }

        // start만 있는 상태 → end 설정
        if (date < selectedStart) {
            setSelectedEnd(selectedStart);
            setSelectedStart(date);
        } else {
            setSelectedEnd(date);
        }
    };
    
    return (
        <div className={style.container} >
            <div className = {style.header}>
                <button onClick={handlePrevMonth}>
                    <img src="/icon/keyboard_arrow_left.svg" alt="perv"/>
                </button>
                <span>{year}.{String(month + 1).padStart(2, "0")}</span>
                <button onClick={handleNextMonth}>
                    <img src="/icon/keyboard_arrow_right.svg" alt="next"/>
                </button>
            </div>
            <div className={style.days}>
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <span key = {day}>{day}</span>
                ))}
            </div>
           <div className={style.body}>
                {weeks.flat().map((date, idx) => {
                    const isCurrent = isCurrentMonth(date);
                    const today = isToday(date);
                    const isStart = selectedStart && isSame(date, selectedStart);
                    const isEnd = selectedEnd && isSame(date, selectedEnd);
                    const inRange = isInRange(date);
                    return (
                        <div key={idx} className={style.cell} onClick={()=>{handleDateClick(date)}}>
                            <div
                                className={`
                                    ${style.date}
                                    ${isCurrent ? style.current : style.other}
                                    ${isStart ? style.start : ""}
                                    ${isEnd ? style.end : ""}
                                    ${inRange ? style.range : ""}
                                    ${today ? style.today : ""}
                                `}
                            >
                                {date.getDate()}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}