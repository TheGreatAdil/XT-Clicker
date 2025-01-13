import Image from "next/image";

export default function Card({ user }: { user: any }) {
  return (
    <div className="card flex justify-between items-center bg-zinc-100 rounded-full w-[90vw]">
      <h4 className="font-extrabold text-zinc-400 text-2xl md:text-6xl w-[25vw] md:w-[15vw]">
        {user.score}
      </h4>

      <h3 className="font-extrabold truncate text-zinc-400 md:text-4xl text-2xl max-w-[80rem]">
        {user.kinde_given_name}
      </h3>

      <Image
        src={user.profile}
        width={50}
        height={50}
        alt="Profile picture"
        className="rounded-full shadow-md shadow-gray-600 translate-x-4 scale-100 md:scale-[1.15]"
      />
    </div>
  );
}
