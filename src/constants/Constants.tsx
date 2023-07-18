import { Component, ReactComponentElement } from "react"
import { JsxAttribute } from "typescript"
import { AiOutlineDashboard } from "react-icons/ai"
import { FaUsers } from "react-icons/fa"
import { GiTeacher } from "react-icons/gi"
import { FaUserGraduate } from "react-icons/fa"
import { AiFillAccountBook } from "react-icons/ai"
import { ImLibrary } from "react-icons/im"
import { TfiWrite } from "react-icons/tfi"
import {GiGraduateCap} from "react-icons/gi"
import {IoRibbonSharp} from "react-icons/io5"
import {BsBookFill} from "react-icons/bs"
import {AiOutlineApartment} from "react-icons/ai"

export type DLinks = {
    name: string;
    to: string;
    icon: ReactComponentElement<any>;
};

export type DNavLinks = {
    section: string,
    links: DLinks[];
};
export const adminNavLinks: DNavLinks[] = [
    {
        section: "Main Links",
        links: [
            {
                name: "Dashboard",
                to: "/admin",
                icon: <AiOutlineDashboard size={20} />
            },
            {
                name: "Users",
                to: "/users",
                icon: <FaUsers size={20} />
            },
            {
                name: "Teachers",
                to: "/teachers",
                icon: <GiTeacher size={20} />
            },
            {
                name: "Students",
                to: "/students",
                icon: <FaUserGraduate size={20} />
            },
            {
                name: "Account",
                to: "/account",
                icon: <AiFillAccountBook size={20} />
            },
            {
                name:"Courses",
                to:"/courses",
                icon:<GiGraduateCap size={20} />
            },
            {
                name:"Batches",
                to:"/batches",
                icon:<IoRibbonSharp size={20} />
            },
            {
                name:"Department",
                to:"/departments",
                icon:<AiOutlineApartment size={20} />
            },
            {
                name:"Semesters",
                to:"/semesters",
                icon:<AiOutlineApartment size={20} />
            },
            {
                name:"Subjects",
                to:"/subjects",
                icon:<BsBookFill size={20} />
            }
            
            ,{
                name: "Library",
                to: "/library",
                icon: <ImLibrary size={20} />
            },
            
            {
                name: "Exam",
                to: "/exam",
                icon: <TfiWrite size={20} />
            }
        ]
    }
]

export const accountantNavLinks: DNavLinks[] = [
    {
        section: "Main Links",
        links: [
            {
                name: "Dashboard",
                to: "/admin",
                icon: <AiOutlineDashboard size={20} />
            },
            {
                name: "Users",
                to: "/users",
                icon: <FaUsers size={20} />
            },
            {
                name: "Teachers",
                to: "/teachers",
                icon: <GiTeacher size={20} />
            },
            {
                name: "Students",
                to: "/students",
                icon: <FaUserGraduate size={20} />
            },

            {
                name: "Library",
                to: "/library",
                icon: <ImLibrary size={20} />
            },
            {
                name: "Exam",
                to: "/exam",
                icon: <TfiWrite size={20} />
            }
        ]
    }
]

export const librarianNavLinks: DNavLinks[] = [
    {
        section: "Main Links",
        links: [
            {
                name: "Dashboard",
                to: "/admin",
                icon: <AiOutlineDashboard size={20} />
            },
            {
                name: "Users",
                to: "/users",
                icon: <FaUsers size={20} />
            },
            {
                name: "Teachers",
                to: "/teachers",
                icon: <GiTeacher size={20} />
            },
            {
                name: "Students",
                to: "/students",
                icon: <FaUserGraduate size={20} />
            },
            {
                name: "Account",
                to: "/account",
                icon: <AiFillAccountBook size={20} />
            },
            {
                name: "Library",
                to: "/library",
                icon: <ImLibrary size={20} />
            },
            {
                name: "Exam",
                to: "/exam",
                icon: <TfiWrite size={20} />
            }
        ]
    }
]




