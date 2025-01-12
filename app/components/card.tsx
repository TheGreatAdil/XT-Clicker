import Image from "next/image";

export default function Card({ user }: { user: any }) {
  return (
    <div className="flex md:w-[80vw] w-[95vw] items-center justify-between bg-zinc-100 rounded-full card">
      <h1 className="md:text-6xl text-4xl md:min-w-32 md:max-w-32 font-extrabold text-zinc-400">
        {user.score}
      </h1>
      <h3 className="md:text-5xl text-3xl lg:max-w-[40vw] md:max-w-96 max-w-48 font-extrabold truncate text-zinc-400">
        {user.kinde_given_name}
      </h3>

      <Image
        src={user.profile}
        width={100}
        height={100}
        alt="Profile picture"
        className="rounded-full shadow-md shadow-gray-600 translate-x-4"
      />
    </div>
  );
}
