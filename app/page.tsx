"use client";
import Image from "next/image";
import { useEffect } from "react";
import anime from "animejs";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const animation = anime
      .timeline()
      .add({
        targets: ".anime-stone",
        translateY: -20,
        duration: 1000,
        opacity: 1,
        delay: 500,
      })
      .add({
        targets: ".anime",
        translateY: -15,
        delay: anime.stagger(150),
        opacity: 1,
      });
  });

  return (
    <main className="block md:flex min-h-screen">
      <div className="flex-1 bg-gray-100">
        <div className="flex justify-center items-center h-full">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert anime-stone opacity-0"
            src="/lunastone2.png"
            alt="image"
            priority
            width={600}
            height={37}
          />
        </div>
      </div>
      <div className="flex-1 bg-gray-100">
        <div className="flex flex-wrap h-full justify-center items-center">
          <div>
            <div className="font-bold text-8xl uppercase anime opacity-0 text-orange-400">Artemis </div>
            <div className="font-bold text-8xl uppercase anime opacity-0">Design</div>
            <small className="w-full font-bold text-2xl anime opacity-0">Register System</small>
            <br />
            <Button asChild className=" anime opacity-0 mt-10">
              <Link href={"/api/auth/signin"}>Log in</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
