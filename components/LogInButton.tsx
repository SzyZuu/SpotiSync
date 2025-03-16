"use client";

import {signIn, useSession} from "next-auth/react";

const LogInButton = () => {
    const session = useSession()

    return(
        <button className="rounded-full cursor-pointer text-black font-bold bg-[#1ED760] hover:bg-[#5fd489] hover:scale-105 py-2 px-4"
                onClick={() => signIn('spotify')}
                disabled={session.status === 'loading'}
        >
            Log in with Spotify
        </button>
    )
}

export default LogInButton;