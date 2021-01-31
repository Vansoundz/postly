import { goto } from "@sapper/app";

const redirect = ({ to, auth }: { to: string; auth: boolean }) => {
  if (auth) {
    goto(to);
  }
};

export { redirect };
