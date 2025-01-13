"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import Card from "../components/card";
import { useRouter } from "next/navigation";
import { CirclePlay } from "lucide-react";

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
        <div className="md:text-9xl text-4xl text-zinc-400">LOADING</div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed p-2 z-50 flex justify-end w-full top-[93%] md:top-[87%]">
        <button className="button rounded-full font-bold flex justify-center items-center bg-white text-zinc-400 hover:text-zinc-600 w-26 h-26 text-sm md:text-2xl">
          PLAY
        </button>
      </div>

      <div className="flex justify-center p-6">
        <h3 className="font-extrabold text-zinc-400 md:text-9xl text-4xl pb-6 md:p-0">
          LEADERBOARD
        </h3>
      </div>

      <div className="flex justify-center">
        <div>
          {users.map((user: User, index: number) => (
            <div key={user.id} className="flex pb-3 md:pb-4">
              <span>{index + 1}</span>
              <Card user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
