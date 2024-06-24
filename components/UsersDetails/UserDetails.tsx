"use client";
import Image from "next/image";
import styles from "./UserDetails.module.scss";
import CustomButton from "../Common/CustomButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserDetailsProps {
    id:any;
}

export const UserDetails:React.FC<UserDetailsProps> = ({ id })=>{
     const router = useRouter();
    const [userDetails, setUserDetails] = useState<any>({});

    useEffect(()=>{
     const data:any = localStorage.getItem('userDetails');     
     setUserDetails(JSON.parse(data));
    },[])


    const personalDetails = [
        {
          "Personal Information": {
            "Full name": userDetails?.name,
            "Phone number": userDetails?.phone,
            "Email address": userDetails?.email,
            "Bvn": "22776699884",
            "Gender": userDetails?.gender,
            "Marital status": "-",
            "Children": "None",
            "Type of residence": "Parent’s Apartment"
          },
          "Education and Employment": {
            "Level of education": userDetails.Education?.["Level of education"],
            "Employment status": userDetails.Education?.["Employment status"],
            "Sector of employment": userDetails.Education?.["Sector of employment"],
            "Duration of employment": userDetails.Education?.["Duration of employment"],
            "Office email": userDetails.Education?.["Office email"],
            "Monthly income": userDetails.Education?.["Monthly income"],
            "Loan repayment": userDetails.Education?.["Loan repayment"],
            "Type of residence": userDetails.Education?.["Type of residence"]
          },
          "Socials": {
            "Twitter": userDetails.Socials?.Twitter,
            "Facebook": userDetails.Socials?.Facebook,
            "Instagram": userDetails.Socials?.Instagram,
          },
          "Guarantor": {
            "Full name": userDetails.Guarantor?.["Full name"],
            "Phone number": userDetails.Guarantor?.["Phone number"],
            "Email address": userDetails.Guarantor?.["Email address"],
            "Relationship": userDetails.Guarantor?.["Relationship"]
          },
          "Guarantor 2": {
            "Full name": userDetails.Guarantor?.["Full name"],
            "Phone number": userDetails.Guarantor?.["Phone number"],
            "Email address": userDetails.Guarantor?.["Email address"],
            "Relationship": userDetails.Guarantor?.["Relationship"]
          }
        }
    ];
    const formatKey = (key:any)=>{        
        return key.replace(/\d+$/, '')
    }

      const renderSection = (sectionName:any, sectionData:any, index:number) => (
        <div  className={styles.cardSection} key={sectionName + index}>
          <span className="font16 weight500">{formatKey(sectionName)}</span>
          <div  className={styles.details}>   
            {Object.entries(sectionData).map(([key, value],i)  => (
              <div key={`${sectionName}-${key}-${i}`} className={styles.content}>
              <span className={`${styles.textheading} font12`}>{key}</span>
              <span className="font16">{value || "" as any}</span>
            </div>
            ))}
           </div> 
          <span className={styles.borderBottom}></span>
        </div>
      );

      const PersonalDetailsCard = () => (
        <div>
          {personalDetails.map((details, index) =>
            Object.entries(details).map(([sectionName, sectionData]) =>
              renderSection(sectionName, sectionData, index)
            )
          )}
        </div>
      );
      
          
    
 return (
        <div className={styles.detailsContainer}>
         <div onClick={()=> router.push("/dashboard/users")} className={styles.arrowBack}>
            <Image src="/arrow_back.svg"  alt="" width={30} height={30} /> <span className="font16">Back to Users</span> 
         </div>
         <div className={styles.subheading}> 
            <span className="font24">User Details</span>
            <div className={styles.btnStyles}>
              <CustomButton className={`${styles.customBtnOne} font16`}  text="Blacklist User"  />
              <CustomButton className={`${styles.customBtnTwo} font16`}  text="Activate User"  />
            </div>
         </div>

         <div className={styles.headingCard}>
            <div className={styles.topItem}>
                <div className={styles.avatar}>
                    <Image src="/user_avatar.svg" alt="" width={100} height={100} />
                    <span className={styles.avatarText}>
                        <span className="font22">{userDetails?.name}</span>
                        <span className="font14">LSQFf587g90</span>
                    </span>
                </div>
                <div className={styles.middle}>
                    <span className="font14">User’s Tier</span>
                     <div className={styles.stars}>
                        <Image src="/np_star1.svg" alt="" width={16} height={16} />
                        <Image src="/np_star2.svg" alt="" width={16} height={16} />
                        <Image src="/np_star2.svg" alt="" width={16} height={16} />
                     </div>
                </div>
                <div className={styles.lastItem}>
                    <span className="font22">{userDetails?.balance}</span>
                    <span className="font12">9912345678/Providus Bank</span>
                </div>
            </div>
            <div className={styles.bottomItem}>
                <span className={`${styles.bottomMenu} font16`}>General Details</span>
                <span className="font16">Documents</span>
                <span className="font16">Bank Details</span>
                <span className="font16">Loans</span>
                <span className="font16">App and System</span>
            </div>
         </div>
        <div className={styles.detailsCard}>
           <PersonalDetailsCard />
        </div>
    </div>    
 )
}
