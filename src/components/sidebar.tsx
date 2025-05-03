"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  LayoutDashboard,
  Users,
  Upload,
  LineChart,
  BarChart3,
  History,
  FileText,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  AccountManagementIcon,
  DashboardIcon,
  FileUploadIcon,
  PredictionIcon,
  SupportIcon,
  LoggingIcon,
  InsightsIcon,
  UserCaseIcon,
} from "./icons";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Account Management",
    href: "/account",
    icon: AccountManagementIcon,
  },
  {
    title: "File Upload",
    href: "/upload",
    icon: FileUploadIcon,
  },
  {
    title: "Predictions",
    href: "/predictions",
    icon: PredictionIcon,
  },
  {
    title: "Insights and Visualization",
    href: "/insights",
    icon: InsightsIcon,
  },
  {
    title: "Logging System",
    href: "/logs",
    icon: LoggingIcon,
  },
  {
    title: "User Case Templates",
    href: "/templates",
    icon: UserCaseIcon,
  },
  // {
  //   title: "Feedbacks & Support",
  //   href: "/support",
  //   icon: SupportIcon,
  // },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col rounded-[18px]  bg-white border-r border-gray-100 transition-all duration-300  sticky top-[18px] bottom-[18px] left-0 max-h-[calc(100vh-36px)]  ",
        collapsed ? "w-20" : "w-[274px]"
      )}
    >
      {/* Logo and toggle */}
      <div className="relative flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center ">
              <Image
                src="/logo.png"
                alt="AuralisBio Logo"
                width={43}
                height={43}
              />
            </div>
          </div>
          {!collapsed && (
            <span className="ml-2 text-xl font-semibold text-gray-800">
              AuralisBio
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute p-1 text-white rounded-full -right-[14px] bg-primary-950 hover:bg-primary-900 "
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-4 overflow-y-auto scrollbar-hide">
        <ul className={cn("space-y-1", collapsed ? "px-0" : "px-4")}>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-lg px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                      isActive && "bg-[#EDF8FF] text-primary-800 ",
                      collapsed && "justify-center rounded-none"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 flex-shrink-0",
                        isActive && "text-blue-600"
                      )}
                    />
                    {!collapsed && (
                      <span className="ml-3 text-sm font-medium">
                        {item.title}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </div>
          <div>
            <Link
              href={"item.href"}
              className={cn(
                "flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                collapsed && "justify-center"
              )}
            >
              <SupportIcon />
              {!collapsed && (
                <span className="ml-3 text-sm font-medium">Support</span>
              )}
            </Link>
          </div>
        </ul>
      </nav>
    </div>
  );
}
