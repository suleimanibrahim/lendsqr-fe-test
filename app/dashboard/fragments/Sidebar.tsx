import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useState } from "react";
import styles from "./Sidebar.module.scss";
import Image from "next/image";

interface MenuLinkProps {
  children: ReactNode;
  active?: boolean;
  href: string;
  onClick?: () => void;
}

const MenuLink: FC<MenuLinkProps> = ({ children, active, href, onClick }) => {
  return (
    <Link href={href} className={`${styles.menuLink} ${active ? styles.active : ""}`} onClick={onClick}>
      {children}
      {active && <span className={styles.activeIndicator}></span>}
    </Link>
  );
};

export const Sidebar = ({ showNav, setShowNav }: { showNav: boolean; setShowNav: (showNav: boolean) => void }) => {
  const pathName = usePathname();

  return (
    <div className={`${styles.sidebar} ${showNav ? styles.show : styles.hide}`}>
      <div className={styles.menu}>
          <MenuLink href="/organization" active={pathName === "/organization"}>
            <div className={styles.orgStyle}>
             <Image src="/briefcase.svg" alt="" width={16} height={16} /> Switch Organization <Image src="/np_next.svg" alt="" width={16} height={16} />
            </div>
          </MenuLink>
        <MenuLink href="/dashboard" active={pathName === "/dashboard"} onClick={() => setShowNav(!showNav)}>
          <Image src="/home.svg" alt="" width={16} height={16} /> Dashboard
        </MenuLink>
        <span className={`${styles.headings} font12 weight500`}>CUSTOMERS</span>
        <MenuLink
          href="/dashboard/users"
          active={pathName.includes("/dashboard/users")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/user-friends.svg" alt="" width={16} height={16} /> Users
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
         <Image src="/users.svg" alt="" width={16} height={16} /> Guarantors
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/sack.svg" alt="" width={16} height={16} /> Loans
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
         <Image src="/handshake-regular.svg" alt="" width={16} height={16} /> Decision Models
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/piggy-bank.svg" alt="" width={16} height={16} /> Savings
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/money.svg" alt="" width={16} height={16} /> Loan Requests
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/user-check.svg" alt="" width={16} height={16} /> Whitelist
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
         <Image src="/user-times.svg" alt="" width={16} height={16} /> Karma
        </MenuLink>
        <span className={`${styles.headings} font12 weight500`}>BUSINESSES</span>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/briefcase.svg" alt="" width={16} height={16} /> Organization
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/money.svg" alt="" width={16} height={16} /> Loan Products
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/np_bank.svg" alt="" width={16} height={16} /> Savings Products
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/coins-solid.svg" alt="" width={16} height={16} /> Fees and Charges
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/icon.svg" alt="" width={16} height={16} /> Transactions
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/galaxy.svg" alt="" width={16} height={16} /> Services
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/user-cog.svg" alt="" width={16} height={16} /> Service Account
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/scroll.svg" alt="" width={16} height={16} /> Settlements
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/chart-bar.svg" alt="" width={16} height={16} /> Reports
        </MenuLink>
        <span className={`${styles.headings} font12 weight500`}>SETTINGS</span>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/sliders-h.svg" alt="" width={16} height={16} /> Preferences
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/badge-percent.svg" alt="" width={16} height={16} /> Fees and Pricing
        </MenuLink>
        <MenuLink
          href="/dashboard/clients"
          active={pathName.includes("/dashboard/clients")}
          onClick={() => setShowNav(!showNav)}
        >
          <Image src="/clipboard-list.svg" alt="" width={16} height={16} /> Audit Logs
        </MenuLink>
      </div>
    </div>
  );
};