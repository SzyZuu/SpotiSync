"use client"

import styles from "./Slider.module.css"
import {useEffect, useState} from "react";

const Slider = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 1 : 0));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-row w-[100%] justify-center text-[#b3b3b3]">
            <div className="mr-2 w-10 text-right">{progress}</div>
            <input type="range" min="0" max="100" step="0.1" value={progress} disabled className={`w-[50vw] ${styles.slider}`}/>
            <div className="ml-2 w-10 text-left">100</div>
        </div>
    );
};

export default Slider;