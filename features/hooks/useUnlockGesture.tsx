"use client";


import {
    useEffect,
    useRef
} from "react";


export function useUnlockGesture(
    callback:()=>void
){


    const startY=useRef(0);



    useEffect(()=>{


        const key=(e:KeyboardEvent)=>{

            if(e.key==="Enter"){
                callback();
            }

        };


        window.addEventListener(
            "keydown",
            key
        );



        const touchStart=(e:TouchEvent)=>{

            startY.current =
                e.touches[0].clientY;

        };



        const touchEnd=(e:TouchEvent)=>{


            const end =
                e.changedTouches[0].clientY;


            if(
                startY.current-end > 80
            ){
                callback();
            }

        };



        window.addEventListener(
            "touchstart",
            touchStart
        );


        window.addEventListener(
            "touchend",
            touchEnd
        );



        return ()=>{

            window.removeEventListener(
                "keydown",
                key
            );

            window.removeEventListener(
                "touchstart",
                touchStart
            );

            window.removeEventListener(
                "touchend",
                touchEnd
            );

        };


    },[callback]);

}