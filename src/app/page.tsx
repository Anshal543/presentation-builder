import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const Home = async () => {
  const auth = await onAuthenticateUser();
  if (auth.status == 200 || auth.status == 201) {
    redirect("/dashboard");
  }
  redirect("/sign-in");
};

export default Home;
