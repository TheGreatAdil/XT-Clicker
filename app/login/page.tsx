import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Login() {
  return (
    <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] grid gap-32">
      <RegisterLink>
        <button className="button w-[75vw] h-32 font-bold text-2xl text-zinc-400 hover:text-zinc-600 rounded-full ">
          SIGN UP
        </button>
      </RegisterLink>
      <LoginLink>
        <button className="button w-[75vw] h-32 font-bold text-2xl text-zinc-400 hover:text-zinc-600 rounded-full">
          LOGIN
        </button>
      </LoginLink>
    </div>
  );
}
