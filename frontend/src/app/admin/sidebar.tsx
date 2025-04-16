"use client";
import Link from "next/link";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import AdminLogo from "./admin-logo";
import { ChartBarIcon } from "@heroicons/react/20/solid";
import { BarChart, FileQuestion, Milestone, Users } from "lucide-react";

export default function MySidebar() {
    const [broken, setBroken] = useState(false);
    // console.log(broken);
    return (
        <Sidebar
            // collapsed={true}
            // toggled={false}
            breakPoint="md"
            onBreakPoint={setBroken}
            style={{
                color: "white",
            }}
            backgroundColor="black"
        >
            <Menu
                menuItemStyles={{
                    subMenuContent: {
                        backgroundColor: "#222",
                    },
                    button: {
                        "&:hover": {
                            backgroundColor: "#333",
                        },
                    },
                }}
            >
                <MenuItem className="mt-5" component={<Link href="/admin" />}>
                    <div className="inline-flex items-center gap-2">
                        <AdminLogo />
                        <span className="text-xl font-semibold">Hoppla</span>
                    </div>
                </MenuItem>
                <SubMenu icon={<FileQuestion size={18} />} label="Requests">
                    <MenuItem
                        component={<Link href="/admin/requests/driver" />}
                    >
                        Driver Requests
                    </MenuItem>
                    <MenuItem component={<Link href="/admin/requests/car" />}>
                        Car Requests
                    </MenuItem>
                </SubMenu>
                <MenuItem
                    component={<Link href="/admin/users" />}
                    icon={<Users size={18} />}
                >
                    Users
                </MenuItem>
                <MenuItem
                    component={<Link href="/admin/rides" />}
                    icon={<Milestone size={18} />}
                >
                    Rides
                </MenuItem>
            </Menu>
        </Sidebar>
    );
}
