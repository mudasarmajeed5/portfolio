"use client";

import Clock from "./Clock";
import StatusIcons from "./StatusIcons";

export default function TopBar() {
    return (
        <header
            className="
      h-12 px-5
      flex items-center justify-between
      bg-black/30
      backdrop-blur-xl
      border-b border-white/10
      "
        >
            <div className="text-sm font-medium">
                Activities
            </div>


            <Clock />


            <StatusIcons />
        </header>
    );
}