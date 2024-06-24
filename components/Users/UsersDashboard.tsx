"use client";
import { useEffect, useState } from "react";
import styles from "./UsersDashboard.module.scss";
import Image from "next/image";
import UsersTable from "./UsersTable";

import mockData from "../../mockData.json";

export const UserDashboard = ()=>{
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [usersRecords, setUsersRecord]= useState<any>([])
    const [search, setSearch] = useState(false);

    useEffect(() => {
        const data = mockData;        
        setUsersRecord(data);
        setTotalResults(data?.length);
        setPages(Math.ceil(data.length / 10));
    }, []);

    const totalPages = Math?.ceil(totalResults / 10);
    const renderTeams = usersRecords?.slice((page - 1) * 10, page * 10);

    const cardData = [
        {
            name: "Users",
            value: "2,453",
            icon: "/icon1.svg"
        },
        {
            name: "Active Users",
            value: "2,453",
            icon: "/icon2.svg"
        },
        {
            name: "Users with Loans",
            value: "12,453",
            icon: "/icon3.svg"
        },
        {
            name: "Users with Savings",
            value: "102,453",
            icon: "/icon4.svg"
        }
    ]

 return (
    <div className={styles.container}>
    <span className="font24">Users</span>
    <div className={styles.cards}>
      {cardData.map((data, index) => (
        <div key={index} className={styles.card}>
          <Image src={data?.icon} alt="" width={40} height={40} />
          <span className="font14">{data?.name}</span>
          <span className="font24">{data?.value}</span>
        </div>
      ))}
    </div>
    <UsersTable 
      page={page} 
      pages={pages} 
      usersRecords={usersRecords}
      renderTeams={renderTeams} 
      search={search} 
      setSearch={setSearch}
      setPage={setPage}
      totalPages={totalPages}
      />
    </div>
 )
}
