import AdminMenu from "@/components/HomeMenu/AdminMenu/AdminMenu";
import AgentMenu from "@/components/HomeMenu/AgentMenu/AgentMenu";
import UserMenu from "@/components/HomeMenu/UsersMenu/UserMenu";


export default function Home() {
  return (
    <section>
      {/* usr Menu */}
      {/* <UserMenu /> */}
      {/* <AgentMenu /> */}
      <AdminMenu />
    </section>
  );
}
