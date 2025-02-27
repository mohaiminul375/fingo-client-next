'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminMenu from "@/components/HomeMenu/AdminMenu/AdminMenu";
import AgentMenu from "@/components/HomeMenu/AgentMenu/AgentMenu";
import UserMenu from "@/components/HomeMenu/UsersMenu/UserMenu";
import { useAuth } from "@/Provider/AuthProvider";
import Loading from "./loading";

// export default function Home() {

//   return <>
//   <UserMenu />; 
//   {/* <UserMenu />;  */}
//   {/* <UserMenu />;  */}

//   </>
// }
export default function Home() {
  // Home page access base on userType
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  if (user?.userType === 'Admin') {
    return <AdminMenu />;
  }
  if (user?.userType === 'Agent') {
    if (user?.account_status !== 'Active') {
      return <h1 className="text-3xl text-red-700 text-center">You can start Operation after Approved</h1>
    }
    return <AgentMenu />;
  }
  return <UserMenu />;
}
