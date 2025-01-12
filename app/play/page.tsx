"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logout from "../components/logout";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
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
        <div className="md:text-9xl text-4xl text-zinc-400">LOADING</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center w-full truncate p-6">
        <h3 className="font-extrabold text-zinc-400 md:text-7xl text-4xl p-3 md:p-6">
          {user?.given_name}
        </h3>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="button rounded-full w-[20rem] h-[20rem] md:w-[28rem] md:h-[28rem] mt-24 md:mt-0"
          onClick={onClick}
        />
      </div>

      <div className="flex justify-center">
        <h3 className="font-extrabold text-zinc-400 md:text-7xl text-4xl p-3 md:p-6">
          {userScore}
        </h3>
      </div>

      <div className="fixed bottom-0 w-full flex justify-between p-3 md:p-6">
        <LogoutLink>
          <button className="button rounded-full font-bold text-zinc-400 hover:text-zinc-600 w-44 h-12 text-sm md:w-56 md:h-20 md:text-lg">
            LOG OUT
          </button>
        </LogoutLink>
        <button
          className="button rounded-full font-bold text-zinc-400 hover:text-zinc-600 w-44 h-12 text-sm md:w-56 md:h-20 md:text-lg"
          onClick={() => {
            router.push("/leaderboard");
          }}
        >
          LEADERBOARD
        </button>
      </div>
    </div>
  );
}
