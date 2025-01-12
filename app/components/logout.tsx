import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Logout() {
  return (
    <LogoutLink>
      <button className="button w-64 h-16 font-bold text-2xl text-zinc-400 hover:text-zinc-600 rounded-full ">
        LOG OUT
      </button>
    </LogoutLink>
  );
}
