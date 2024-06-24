import React, { useState } from "react";
import Image from "next/image";
import styles from "./UsersDashboard.module.scss";
import moment from "moment";
import { Table } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useLenSqrRouter } from "@/hooks/useLendSqrRouter";


type MembersProps ={
    item:any
    AllUsers:any
}
  const User: React.FC<MembersProps> = ({ item, AllUsers}) => {
      const [showDropdown, setShowDropdown] = useState(false);  
      const router = useLenSqrRouter();
      const [showDropdownMap, setShowDropdownMap] = useState<{
        [key: string]: boolean;
      }>({});

      const toggleDropdown = (id: string,rowData: any) => {
        const showDropdown = showDropdownMap[id] || false;
        setShowDropdown(showDropdown);
        const updatedMap = { ...showDropdownMap };
        updatedMap[id] = !updatedMap[id];
        setShowDropdownMap(updatedMap);
      };
      const formatDateTime = (dateString:any) => {
        const formattedDateString = dateString.replace(' ', '');
        const date:any = new Date(formattedDateString);
          if (isNaN(date)) {
            return 'Invalid Date';
          }
        const options:any = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        };      
        return date.toLocaleString('en-US', options);
      };


      const viewDetails = (item:any)=>{
        localStorage.setItem("userDetails", JSON.stringify(item));
        router.push(`/dashboard/users/${item?._id}`)
      }
      
  
      return (
        <>
        <tr className="font14">
          <td className="px-6 py-4 text-left">
            {item?.company || `jacobjones@example.com`}
          </td>
          <td className="px-6 py-4 text-left">
            {item?.name}
          </td>
          <td className="px-6 py-4 text-left">
            {item?.email}
          </td>
          <td className="px-6 py-4 text-left">
            {item?.phone}
          </td>
          <td className="px-6 py-4 text-left">
            {formatDateTime(item?.registered)}
          </td>
          <td className="px-6 py-4 text-left">
            <div className={`${styles.statusContainer} ${!item?.isActive ? styles.default : styles.manager}`}>
                <span className={`${styles.statusIndicator} ${!item?.isActive ? styles.default : styles.manager}`}></span>
                <div>{item?.isActive ? "Active":"In Active"}</div>
            </div>
            </td>
          <td className="px-6 py-4 text-left">
            
            <span className={styles.threeDot}>
             <Image 
               src="/threeDotIcon.svg" 
               alt="" 
               width={20} 
               height={20} 
               onClick={() => toggleDropdown(item?._id, item)}
               />
                {showDropdownMap[item?._id] && (
                <div className={styles.dropdownMenu}>
                <div  className={styles.menuItem}>
                 <Image
                    src="/drop_icon3.svg"
                    alt=""
                    width={20}
                    height={20}
                    />
                   <span onClick={() => viewDetails(item)}>View Details</span>
                </div>
                <div className={styles.menuItem}>
                 <Image
                    src="/drop_icon1.svg"
                    alt=""
                    width={20}
                    height={20}
                    />
                    <span>Blacklist User</span>
                </div>
                <div className={styles.menuItem}>
                 <Image
                    src="/drop_icon2.svg"
                    alt=""
                    width={20}
                    height={20}
                    />
                    <span>Activate User</span>
                </div>
                </div>
              )}
            </span>
          </td>
         </tr>
        </>
       
      );
  };


interface UsersTableProps {
    renderTeams: any;
    search: any;
    setSearch: any;
    page: any;
    usersRecords:any
    totalPages:any
    setPage: any;
    pages: any;
}

const UsersTable: React.FC<UsersTableProps> = ({ renderTeams, totalPages, usersRecords, search, setSearch, page, setPage, pages }) => {
  
    const generatePagination = () => {
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            const leftEllipsis = page > 2 ? [1, "..."] : [];
            const rightEllipsis = page < totalPages - 1 ? ["...", totalPages] : [];
            let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
            return [...leftEllipsis, ...visiblePages, ...rightEllipsis];
        }
    };

    const handlePageChange = (pageNumber:any) => {
        setPage(pageNumber);
    };
  
    return (
    <div className={styles.tableContent}>
      <div className={styles.heading}>
        <div className={styles.tableContainer}>
          <Table responsive="sm">
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.headerCell}>
                  <span className={styles.headerCellContent}>
                    <span>organization</span>
                    <Image src="/filter.svg" alt="" width={16} height={16} />
                  </span>
                </th>
                <th className={styles.headerCell}>
                  <span className={styles.headerCellContent}>
                    <span>Username</span>
                    <Image src="/filter.svg" alt="" width={16} height={16} />
                  </span>
                </th>
                <th className={styles.headerCell}>
                  <span className={styles.headerCellContent}>
                    <span>Email</span>
                     <Image src="/filter.svg" alt="" width={16} height={16} />
                  </span>
                </th>
                <th className={styles.headerCell}>
                  <span className={styles.headerCellContent}>
                    <span>Phone number</span>
                     <Image src="/filter.svg" alt="" width={16} height={16} />
                  </span>
                </th>
                <th className={styles.headerCell}>
                  <span className={styles.headerCellContent}>
                    <span>Date joined</span>
                     <Image src="/filter.svg" alt="" width={16} height={16} />
                  </span>
                </th>
                <th className={styles.headerCell}>
                  <span className={styles.headerCellContent}>
                    <span>Status</span>
                     <Image src="/filter.svg" alt="" width={16} height={16} />
                  </span>
                </th>
                <th className={styles.headerCell}></th>
              </tr>
            </thead>
            <tbody>
            {usersRecords?.length !== 0 &&
                renderTeams?.map((item: any, i: number) => (
                <User item={item} key={i} AllUsers={renderTeams} />
             ))}
            </tbody>
          </Table>
          <div className={styles.footer}>
            <div className={styles.results}>
              Showing {usersRecords?.length} out of
              <span className={styles.count}>{pages * 10} results</span>
            </div>
            <div className={styles.pagination}>
                <span
                    onClick={() => {
                        if (page > 1) setPage(page - 1);
                    }}
                    className={`${styles.pageControl} ${page === 1 ? "disabled" : ""}`}
                >
                    <Image src="/prevbtn.svg" alt="" width={24} height={24} />
                </span>
                {generatePagination().map((pageNumber, index) => (
                    <span
                        key={index}
                        className={`${styles.pageLink} ${pageNumber === page ? "active" : ""} ${typeof pageNumber !== "number" ? "ellipsis" : ""}`}
                        onClick={() => typeof pageNumber === "number" && handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </span>
                ))}
                <span
                    onClick={() => {
                        if (page < pages) setPage(page + 1);
                    }}
                    className={`${styles.pageControl} ${page === pages ? "disabled" : ""}`}
                >
                    <Image src="/nextbtn.svg" alt="" width={24} height={24} />
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;