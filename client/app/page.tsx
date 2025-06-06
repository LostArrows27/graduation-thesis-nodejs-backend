import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";

export default function Index() {
  // const canInitSupabaseClient = () => {
  //   // This function is just for the interactive tutorial.
  //   // Feel free to remove it once you have Supabase connected.
  //   try {
  //     createClient();
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // };

  // const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20">
      <nav className="border-b-foreground/10 flex justify-center w-full h-16 border-b">
        <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm">
          <DeployButton />
          {/* {isSupabaseConnected && <AuthButton />} */}
        </div>
      </nav>

      <div className="animate-in flex flex-col flex-1 max-w-4xl gap-20 px-3 opacity-0">
        <Header />
        <main className="flex flex-col flex-1 gap-6">
          <h2 className="mb-4 text-4xl font-bold">Next steps</h2>
          {/* {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
        </main>
      </div>

      <footer className="border-t-foreground/10 flex justify-center w-full p-8 text-xs text-center border-t">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="hover:underline font-bold"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
