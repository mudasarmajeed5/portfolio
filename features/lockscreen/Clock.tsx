"use client";

import { useEffect, useState } from "react";

export default function Clock() {

    const [time,setTime] = useState("");

    useEffect(()=>{

        const update=()=>{
            setTime(
                new Intl.DateTimeFormat(
                    "en-US",
                    {
                        weekday:"short",
                        hour:"2-digit",
                        minute:"2-digit"
                    }
                ).format(new Date())
            );
        };

        update();

        const id=setInterval(update,1000);

        return ()=>clearInterval(id);

    },[]);


    return (
        <div className="text-sm">
            {time}
        </div>
    );
}