// Filename - components/SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { FaChartPie } from "react-icons/fa";
import { VscOutput } from "react-icons/vsc";
import { SiRetool } from "react-icons/si";
import { GrVulnerability } from "react-icons/gr";
export const SidebarData = [
    {
		title: "Dashboard",
		path: "/dashboard",
		icon: <FaChartPie />,
	},
    {
		title: "User",
		path: "/user",
		icon: <VscAccount />,
	},
    {
		title: "All Output",
		path: "/allOutput",
		icon: <VscOutput />,
	},
    {
		title: "Nmap Results",
		path: "/nmap",
		icon: <SiRetool />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "TCP Scan",
				path: "/nmap/nmap1",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
            
			{
				title: "UDP Scan",
				path: "/nmap/nmap2",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
			
		],
	},
	{
		title: "Vulnerability Result",
		path: "/vuln",
		icon: <GrVulnerability />,

		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "HTTP",
				path: "/vuln/vuln1",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
			{
				title: "SMB",
				path: "/vuln/vuln2",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
            {
				title: "FTP",
				path: "/vuln/vuln3",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
		],
	},
];
