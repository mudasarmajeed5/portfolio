"use client";

import {
    Volume2,
    VolumeX
} from "lucide-react";

import {useBackgroundMusic}
    from "@/features/hooks/useBackgroundMusic";


export default function VolumeControl(){

    const {
        muted,
        toggleMute
    }=useBackgroundMusic();


    return (

        <button
            onClick={toggleMute}
            className="
hover:bg-white/10
rounded-md
p-1
transition
"
        >

            {
                muted
                    ?
                    <VolumeX size={18}/>
                    :
                    <Volume2 size={18}/>
            }

        </button>

    )

}