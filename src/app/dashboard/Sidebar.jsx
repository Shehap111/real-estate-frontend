"use client";

import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  FaBars,
  FaCity,
  FaThList,
  FaBuilding,
  FaRegNewspaper,
  FaAddressBook,
  FaEnvelopeOpenText,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearAdmin } from "@/redux/slices/adminSlice";
import {useRouter} from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllMessages } from "@/redux/slices/contactSlice";
import { Badge } from "@mui/material";

export default function SidebarComp() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();


  const messages = useSelector((state) => state.contact.messages);
  const unreadCount = messages.filter((msg) => !msg.isRead).length;
  
  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);


  const handleLogout = () => {
    localStorage.removeItem("token");         // Remove token
    dispatch(clearAdmin());                   // Clear Redux state
    router.push("/admin/login");              // Navigate to login
  };

  return (
    <div>
      <Sidebar className="sidebar" collapsed={collapsed}>
        <Menu>
          <MenuItem
            className="Welcome"
            icon={<FaBars style={{ fontSize: '25px' }} />}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "" : "Welcome Admin"}
          </MenuItem>

          <MenuItem icon={<FaCity style={{ fontSize: '25px' }} />} component={<Link href="/dashboard/cities" />}>
          Cities
        </MenuItem>

        <MenuItem icon={<FaThList  style={{ fontSize: '25px' }}/>} component={<Link href="/dashboard/propertyTypes" />}>
          Property Types
        </MenuItem>

        <MenuItem icon={<FaBuilding style={{ fontSize: '25px' }} />} component={<Link href="/dashboard/property" />}>
          Property
        </MenuItem>

        <MenuItem icon={<FaRegNewspaper style={{ fontSize: '25px' }} />} component={<Link href="/dashboard/blog" />}>
          Blog
        </MenuItem>

        <MenuItem icon={<FaAddressBook style={{ fontSize: '25px' }} />} component={<Link href="/dashboard/contacts" />}>
          Contacts
        </MenuItem>

        <MenuItem
          icon={
            <Badge badgeContent={unreadCount} sx={{ margin: '50px' }} color="error">
              <FaEnvelopeOpenText style={{ fontSize: '25px' }} />
            </Badge>
          }
          component={<Link href="/dashboard/contacts/messages" />}
        >
          Messages
        </MenuItem>



          {/* Logout */}
          <MenuItem icon={<FaSignOutAlt style={{ fontSize: '25px' }} />} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
