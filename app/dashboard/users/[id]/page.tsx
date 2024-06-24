import { UserDetails } from "@/components/UsersDetails/UserDetails";
import React from "react";

interface PageProps {
    params: { id: string };
}
const Page: React.FC<PageProps> = ({ params: { id }})=>{
  return (
    <UserDetails id={id} />
  )
}
export default Page;