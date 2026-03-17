"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { RiArrowDropDownLine } from "react-icons/ri";
import { sidebarData, activeKeys } from "@/component/data/data";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineCaretDown, AiOutlineFileText } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";
import { MdAccountBalance } from "react-icons/md";
import { CustomMenu as Menu } from "@/lib/AntdComponents";
import DashboardModal from "@/component/dashboard-component/dashboard/DashboardModal";
import { useState, useLayoutEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logOut } from "@/store/userSlice";
import { createClient } from "@/lib/supabase/client";

const DashboardSider = () => {
  const pathName = usePathname();
  const { user: reduxUser, business: reduxBusiness } = useAppSelector((store) => store?.user);
  const dispatch = useAppDispatch();
  const [activePath, setActivePath] = useState("");
  const { replace, push } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createClient();
  
  const [dbUser, setDbUser] = useState<any>(null);
  const [dbBusiness, setDbBusiness] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useLayoutEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        let profile: any = null;
      if (session?.user) {
        // Try to fetch by ID first
        let { data, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        
        // If not found by ID (maybe due to manual auth recreation), try by email
        if (!data && session.user.email) {
          const { data: emailData } = await supabase.from('profiles').select('*').eq('email', session.user.email).single();
          data = emailData;
        }
        
        profile = data;
      } else {
        // Fallback: Just grab the first profile if no session is found during migration
        const { data } = await supabase.from('profiles').select('*').limit(1).single();
        profile = data;
      }
        
      if (profile) {
        // Fallback to standard Redux structure if DB fields are empty
        setDbUser({
          ...profile,
          firstName: profile.first_name || profile.firstName || reduxUser?.firstName,
          lastName: profile.last_name || profile.lastName || reduxUser?.lastName,
        });
        
        let business: any = null;
        if (session?.user) {
          const { data } = await supabase.from('business_profiles').select('*').eq('profile_id', profile.id).single();
          business = data;
        } else {
           const { data } = await supabase.from('business_profiles').select('*').limit(1).single();
           business = data;
        }
          
        if (business) {
          setDbBusiness({
            ...business,
            businessName: business.business_name || business.businessName || reduxBusiness?.businessName,
          });
        }
      }
      } finally {
        setIsLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [supabase, reduxUser?.firstName, reduxUser?.lastName, reduxBusiness?.businessName]);

  const user = dbUser || reduxUser;
  const business = dbBusiness || reduxBusiness;
  
  const handleLogout = async () => {
    // 1. Sign out from Supabase
    await supabase.auth.signOut();
    
    // 2. Clear Redux state
    dispatch(logOut());
    
    // 3. Clear any local storage items we set manually
    localStorage.removeItem("token");
    
    // 4. Redirect to login
    replace("/");
  };

  useLayoutEffect(() => {
    setActivePath(activeKeys.filter((value) => pathName.includes(value))[0]);
  }, [pathName]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Add Money",
      icon: <BiMoney size={20} />,
      className: "!font-semibold !text-[15px]",
      onClick: () => setIsModalOpen(true),
    },
    {
      key: "2",
      label: "Make Payment",
      icon: <MdAccountBalance size={20} />,
      className: "!font-semibold !text-[15px]",
      onClick: () => push("payment"),
    },
    {
      key: "3",
      label: "Send Invoice",
      icon: <AiOutlineFileText size={20} />,
      className: "!font-semibold !text-[15px]",
      onClick: () => push("invoice"),
    },
  ];
  return (
    <div className="drawer-side z-10 ">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <aside className="flex flex-col space-y-4 w-[16rem] h-screen overflow-hidden  shadow-xl bg-white px-4 py-2 overflow-y-scroll">
        <Image src={logo} alt="logo" className="mx-auto" />
        <div className=" border border-gray-200" />
        <details className="dropdown">
          <summary className=" flex space-x-2 items-center justify-center  my-4  ">
            {isLoadingProfile ? (
              <div className="flex items-center justify-center w-full space-x-2">
                <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            ) : (
              <>
                {user?.profilePicture ? (
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <Image
                        src={user.profilePicture}
                        alt="User-pic"
                        width={100}
                        height={100}
                        objectFit="center"
                      />{" "}
                    </div>
                  </div>
                ) : (
                  <Avatar
                    style={{ backgroundColor: "#CDA4FF" }}
                    size={60}
                    className="!text-sm text-black relative"
                  >
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
                      : 'AU'}{" "}
                  </Avatar>
                )}
                <span className="text-sm">
                  <p className="font-medium text-[16px]">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : (user?.firstName || user?.lastName) 
                        ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                        : 'Admin User'}
                  </p>
                </span>
                <RiArrowDropDownLine className="cursor-pointer" size={25} />
              </>
            )}
          </summary>
          <ul className="-mt-4  menu dropdown-content z-[1]  w[15rem] w-[98%] mx-auto">
            <li
              onClick={handleLogout}
              className="w-full bg-[#EEF2F7] p-2 cursor-pointer text-center items-center rounded-box mx-auto block"
            >
              Log Out
            </li>
          </ul>
        </details>
        <div className=" border border-gray-200" />

        <Dropdown
          className="flex p-2 items-center justify-center mx-2 my-4 border rounded cursor-pointer bg-[#FAFAFA]"
          menu={{ items }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className="font-semibold"> Quick Action</p>{" "}
              <AiOutlineCaretDown />
            </Space>
          </a>
        </Dropdown>
        <div className=" border border-gray-200" />
        <Menu
          selectedKeys={[activePath]}
          items={sidebarData}
          className="!space-y-3 !w-full"
          mode="inline"
        />
        <DashboardModal open={isModalOpen} setOpen={setIsModalOpen} />
      </aside>
    </div>
  );
};

export default DashboardSider;
