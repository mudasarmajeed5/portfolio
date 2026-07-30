"use client";

import {useState} from "react";


export function useBackgroundMusic(){

    const [muted,setMuted]=useState(false);


    function toggleMute(){

        setMuted(v=>!v);


// future:
// audioRef.current.volume = muted ? 1 : 0

    }


    return {
        muted,
        toggleMute
    };

}