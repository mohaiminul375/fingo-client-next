'use client'
import AdminMenu from "@/components/HomeMenu/AdminMenu/AdminMenu";
import AgentMenu from "@/components/HomeMenu/AgentMenu/AgentMenu";
import UserMenu from "@/components/HomeMenu/UsersMenu/UserMenu";
import { useAuth } from "@/Provider/AuthProvider";
import Loading from "./loading";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />
  }
  if (!user) {
    router.push('/login')
    return
  }
  if (user?.userType === 'Admin') {
    return <AdminMenu />
  }
  if (user?.userType === 'Agent') {
    return <AgentMenu />
  }
  if (user?.userType === 'Admin') {
    return <UserMenu />
  }
}
