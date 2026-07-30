"use client";


import {
    LockKeyhole
} from "lucide-react";


export default function Profile(){

    return (

        <div
            className="
flex flex-col
items-center
gap-6
select-none
"
        >


            <div
                className="
w-32 h-32
rounded-full
bg-gradient-to-br
from-zinc-700
to-zinc-900

flex items-center justify-center

shadow-2xl
border
border-white/10
"
            >

                <LockKeyhole
                    size={55}
                    className="text-zinc-300"
                />


            </div>



            <h1
                className="
text-3xl
font-semibold
"
            >
                Mudassar
            </h1>


            <p
                className="
text-zinc-400
animate-pulse
"
            >
                Press Enter or Swipe Up to View Portfolio
            </p>


        </div>

    )

}