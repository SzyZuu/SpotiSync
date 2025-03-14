import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-work-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="font-bold text-6xl">Radiofy</h1>
        <a className="rounded-full text-black font-bold bg-[#1ED760] hover:bg-[#5fd489] hover:scale-105 py-2 px-4"
           href="/"
           target="_blank"
           rel="noopener noreferrer"
        >
          Log in with Spotify
        </a>
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
