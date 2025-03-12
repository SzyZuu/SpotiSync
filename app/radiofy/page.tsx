import Image from "next/image";
import Slider from "@/components/Slider";

export default async function Page(){
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
                        src="https://picsum.photos/200"
                        width="200"
                        height="200"
                        alt="Song cover"
                        className="rounded-xl"
                    />
                    <Slider />
                </div>
            </div>
        </div>
    )
}