"use client";


import {
    Wifi,
    BatteryFull
} from "lucide-react";

import VolumeControl from "./VolumeControl";


export default function StatusIcons(){

    return (

        <div
            className="
flex items-center gap-4
"
        >

            <Wifi size={18}/>

            <VolumeControl/>

            <BatteryFull size={19}/>

        </div>

    )

}