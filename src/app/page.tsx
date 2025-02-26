'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminMenu from "@/components/HomeMenu/AdminMenu/AdminMenu";
import AgentMenu from "@/components/HomeMenu/AgentMenu/AgentMenu";
import UserMenu from "@/components/HomeMenu/UsersMenu/UserMenu";
import { useAuth } from "@/Provider/AuthProvider";
import Loading from "./loading";

export default function Home() {
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
    return <AgentMenu />;
  }
  return <UserMenu />; 
}
