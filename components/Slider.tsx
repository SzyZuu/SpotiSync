"use client"

import styles from "./Slider.module.css"
import {useEffect, useState} from "react";

const Slider = ({data}) => {
    const [duration, setDuration] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    console.log("FROM SLIDER: ")
    console.log(data);

    useEffect(() => {
        if(data){
            setDuration(data.item.duration_ms);
            setProgress(data.progress_ms);
        }
    }, [data]);

    function msToString(ms){
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor(((progress % 60000) / 60000) * 60);

        if(seconds < 10){
            return minutes + ":0" + seconds;
        }
        return minutes + ":" + seconds;
    }

    const progressDisplay = msToString(progress);
    const durationDisplay = msToString(duration);

    const progressPercentage = () => {
        if(progress){
            return progress / duration * 100;
        }else{
            return 0;
        }
    }

    console.log("PROGRESS PERCENTAGE: " + progressPercentage());

    return (
        <div className="flex flex-row w-[100%] justify-center text-[#b3b3b3]">
            <div className="mr-2 w-10 text-right">{progressDisplay}</div>
            <input type="range" min="0" max="100" step="0.1" value={progressPercentage()} disabled className={`w-[50vw] ${styles.slider}`}/>
            <div className="ml-2 w-10 text-left">{durationDisplay}</div>
        </div>
    );
};

export default Slider;