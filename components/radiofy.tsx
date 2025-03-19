"use client";

import Image from "next/image";
import Slider from "@/components/Slider";
import {signOut, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {getCurrentlyPlaying} from "@/lib/spotify";
import {redirect, useRouter} from "next/navigation";

const Radiofy = () =>{
    const {data: session} = useSession();
    const [albumImageUrl, setAlbumImageUrl] = useState<string>("https://picsum.photos/id/198/200");
    const [songName, setSongName] = useState<string>("Nothing playing");
    const [artistName, setArtistName] = useState<string>("");

    const [data, setData] = useState<any>();

    useEffect(() => {
        async function fetchCurrentSong(){
            if(session?.user?.accessToken){
                const fetchedData = await getCurrentlyPlaying(session.user.accessToken);
                setData(fetchedData);

                if(data?.item?.album?.images?.length > 0){
                    setAlbumImageUrl(data.item.album.images[0].url);
                }

                if(data?.item?.name){
                    setSongName(data.item.name);
                }

                if(data?.item?.artists?.length > 0){
                    const artistNames = data.item.artists.map(artist => artist.name).join(", ");
                    setArtistName(artistNames);
                }else{
                    console.log("error getting artist")
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

                <div className="flex flex-col items-center justify-center col-start-2 p-8 gap-1">
                    <Image
                        src={albumImageUrl}
                        width="200"
                        height="200"
                        alt="Song cover"
                        className="rounded-xl mb-8"
                    />
                    <p className="text-5xl font-bold">{songName}</p>
                    <p className="text-2xl mb-8">{artistName}</p>
                    <Slider data={data} />
                    <button onClick={() => signOut({callbackUrl: "/", redirect:true})} className="cursor-pointer">SIGN OUT</button>
                </div>
            </div>
        </div>
    )
}

export default Radiofy;