"use client";

import Image from "next/image";
import Slider from "@/components/Slider";
import {signOut, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {getCurrentlyPlaying} from "@/lib/spotify";
import {redirect, useRouter} from "next/navigation";

const Radiofy = () =>{
    const {data: session} = useSession();
    const [albumImageUrl, setAlbumImageUrl] = useState<string>("https://picsum.photos/200");

    useEffect(() => {
        async function fetchCurrentSong(){
            if(session?.user?.accessToken){
                const data = await getCurrentlyPlaying(session.user.accessToken);
                console.log("Token: " + session.user.accessToken);
                if(data?.item?.album?.images?.length > 0){
                    setAlbumImageUrl(data.item.album.images[0].url);
                }
            }
        }

        fetchCurrentSong();
    }, [session]);

    return(
        <div className="grid grid-rows-[5vh_1fr] min-h-screen p-8 gap-8 font-[family-name:var(--font-work-sans)]">
            <div className="flex flex-row row-start-1 items-center">
                <h1 className="font-bold text-6xl">Radiofy</h1>
            </div>

            <div className="grid grid-cols-[minmax(300px,20vw)_1fr] row-start-2 gap-8">
                <div className="col-start-1 bg-[#121212] rounded-xl p-8">

                </div>

                <div className="flex flex-col items-center justify-center col-start-2 p-8 gap-8">
                    <Image
                        src={albumImageUrl}
                        width="200"
                        height="200"
                        alt="Song cover"
                        className="rounded-xl"
                    />
                    <Slider />
                    <button onClick={() => signOut({callbackUrl: "/", redirect:true})} className="cursor-pointer">SIGN OUT</button>
                </div>
            </div>
        </div>
    )
}

export default Radiofy;