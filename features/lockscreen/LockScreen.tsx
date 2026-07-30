"use client";

import { useRouter } from "next/navigation";
import TopBar from "./TopBar";
import Profile from "./Profile";
import { useUnlockGesture } from "@/features/hooks/useUnlockGesture";

export default function LockScreen() {
    const router = useRouter();

    const unlock = () => {
        router.push("/portfolio");
    };

    useUnlockGesture(unlock);

    return (
        <main
            className="
      h-screen w-screen overflow-hidden
      bg-[#0b0b0d]
      text-white
      flex flex-col
      "
        >
            <TopBar />

            <section
                onClick={unlock}
                className="
        flex-1
        flex items-center justify-center
        cursor-pointer
        "
            >
                <Profile />
            </section>
        </main>
    );
}