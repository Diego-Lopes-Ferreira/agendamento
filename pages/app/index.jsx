import { signOut, useSession } from "next-auth/react";
import globals from "styles/globals.module.css";

export default function MainAppPage() {
  const { data: session } = useSession();

  function handleLogOut() {
    signOut();
  }

  return (
    <div className={globals.containerCenterPage}>
      <h1>id: {session?.user.id}</h1>
      <h1>email?: {session?.user.email}</h1>
      <button onClick={handleLogOut} className={globals.buttonFg}>
        Log out :)
      </button>
    </div>
  );
}
