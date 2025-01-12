"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import Card from "../components/card";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  email: string;
  kinde_given_name: string;
  score: number;
  profile: string;
};

export default function Leaderboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("Score Board")
        .select()
        .order("score", { ascending: false });

      if (error) {
        console.log(error);
        setUsers([]);
      }

      if (data) {
        setUsers(data);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex font-extrabold items-center justify-center h-screen">
        <div className="text-9xl text-zinc-400">LOADING</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex font-extrabold justify-center pt-10">
        <div className="md:text-9xl text-7xl text-zinc-600">LEADERBOARD</div>
      </div>
      <div className="flex justify-center pt-24">
        <div className="grid md:grid-cols-1 gap-5 p-6">
          {users.map((user: User, index: number) => (
            <div key={user.id}>
              <span>{index + 1}</span>
              <Card user={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full absolute top-[90%] pt-10 pl-10">
        <button
          className="button w-64 h-16 font-bold text-2xl text-zinc-400 hover:text-zinc-600 rounded-full"
          onClick={() => {
            router.push("/play");
          }}
        >
          <p>PLAY</p>
        </button>
      </div>
    </>
  );
}
