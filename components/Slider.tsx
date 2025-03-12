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
        <input type="range" min="0" max="100" step="0.1" value={progress} disabled className={`w-[75%] ${styles.slider}`}/>
    );
};

export default Slider;