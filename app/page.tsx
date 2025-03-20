"use client"

import Image from "next/image";
import {useSession, signIn, signOut} from "next-auth/react";
import LogInButton from "@/components/LogInButton";
import Conditional from "@/components/Conditional";
import {useEffect, useState} from "react";
import {getCurrentProfile} from "@/lib/spotify";

export default function Home() {
    const session = useSession();
    const [userData, setUserData] = useState();
    const [premium, setPremium] = useState<boolean>(true);

    const authenticated = (session.status == "authenticated")
    console.log("FROM HOME FUNCTION: ")
    console.log(session);

    async function fetchUserProfile(){
        if(session?.data?.user?.accessToken){
            const userProfile = await getCurrentProfile(session.data.user.accessToken);
            setUserData(userProfile);

            if(userData?.product){
                if(userData.product == "premium"){
                    setPremium(true);
                }else{
                    setPremium(false);
                }
            }
        }
    }

    useEffect(() => {
        if(!userData){
            fetchUserProfile();
        }
    }, [session]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-work-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="font-bold text-6xl">Radiofy</h1>
          <Conditional showWhen={premium}>
              <Conditional showWhen={!authenticated}>
                  <LogInButton/>
              </Conditional>

              <Conditional showWhen={authenticated}>
                  <a className="rounded-full cursor-pointer text-black font-bold bg-[#1ED760] hover:bg-[#5fd489] hover:scale-105 py-2 px-4" href="/radiofy">
                      Start jamming!
                  </a>
              </Conditional>
          </Conditional>

          <Conditional showWhen={!premium}>
              <p className="text-white font-bold">Sorry, you need premium to use Radiofy!</p>
          </Conditional>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex flex-row items-center justify-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/SzyZuu/SpotiSync"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            className="dark:inverse my-auto"
            src="/github-mark.svg"
            alt="Github icon"
            width={25}
            height={25}
          />
          Github repo ↗
        </a>
      </footer>
    </div>
  );
}
