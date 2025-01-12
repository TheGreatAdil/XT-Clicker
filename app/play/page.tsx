"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logout from "../components/logout";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { supabase } from "@/utils/supabase/client";

export default function Play() {
  const router = useRouter();
  const [userScore, setUserScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
  } = useKindeBrowserClient();

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("./login");
        return;
      }
    }

    if (authLoading) {
      return;
    }

    const fetchScore = async () => {
      const { data, error } = await supabase
        .from("Score Board")
        .select("*")
        .eq("email", user?.email)
        .single();

      if (error) {
        console.log(user);
        const { error: insertError } = await supabase
          .from("Score Board")
          .insert([
            {
              email: user?.email,
              kinde_given_name: user?.given_name,
              kinde_id: user?.id,
              score: 0,
              profile: user?.picture,
            },
          ])
          .select()
          .single();

        if (insertError) {
          console.log(insertError);
          router.push("./login");
          return;
        }
      } else if (data) {
        setUserScore(data.score);
      }
      setIsLoading(false);
    };
    fetchScore();
  }, [isAuthenticated, authLoading, user]);

  const onClick = async () => {
    if (!user?.email) return;
    const newScore = userScore + 1;
    setUserScore(newScore);

    try {
      const { error } = await supabase
        .from("Score Board")
        .update({ score: newScore })
        .eq("email", user.email);

      if (error) {
        console.error("Error updating score:", error);
      }
    } catch (err) {
      console.error("Error in onClick:", err);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex font-extrabold items-center justify-center h-screen">
        <div className="text-9xl text-zinc-400">LOADING</div>
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
        <div className="text-center grid gap-8">
          <button
            className="button rounded-full md:w-[32rem] md:h-[32rem] w-96 h-96 hover:scale-[1.01] pt-16"
            onClick={onClick}
          ></button>
          <h1 className="font-extrabold md:text-9xl text-7xl md:p-10 text-zinc-400">
            {userScore}
          </h1>
        </div>
      </div>
      <div className="w-full flex justify-center lg:top-[93%] absolute">
        <h4 className="text-5xl text-zinc-400 font-extrabold pt-6">
          {user?.given_name}
        </h4>
      </div>
      <div className="w-full absolute top-[90%] pt-10 pr-10 pl-10 flex justify-between ">
        <Logout />
        <button
          className="button w-64 h-16 font-bold text-2xl text-zinc-400 hover:text-zinc-600 rounded-full flex justify-center"
          onClick={() => {
            router.push("/leaderboard");
          }}
        >
          <span>LEADERBOARD</span>
        </button>
      </div>
    </>
  );
}
