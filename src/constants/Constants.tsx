import { ReactComponentElement } from "react"
import { AiOutlineDashboard } from "react-icons/ai"
import { FaUsers } from "react-icons/fa"
import { GiTeacher } from "react-icons/gi"
import { FaUserGraduate } from "react-icons/fa"
import { ImLibrary } from "react-icons/im"
import { TfiWrite } from "react-icons/tfi"
import { GiGraduateCap } from "react-icons/gi"
import { IoRibbonSharp } from "react-icons/io5"
import { BsBookFill } from "react-icons/bs"
import { AiOutlineApartment } from "react-icons/ai"

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
                name: "Department",
                to: "/departments",
                icon: <AiOutlineApartment size={20} />
            },

            {
                name: "Courses",
                to: "/courses",
                icon: <GiGraduateCap size={20} />
            },
            {
                name: "Batches",
                to: "/batches",
                icon: <IoRibbonSharp size={20} />
            },
            {
                name: "Semesters",
                to: "/semesters",
                icon: <AiOutlineApartment size={20} />
            },
            {
                name: "Subjects",
                to: "/subjects",
                icon: <BsBookFill size={20} />
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
            /*  {
                 name: "Account",
                 to: "/account",
                 icon: <AiFillAccountBook size={20} />
             }, */

            {
                name: "Library",
                to: "/library",
                icon: <ImLibrary size={20} />
            },


        ]
    }
]

export const accountantNavLinks: DNavLinks[] = [
    {
        section: "Main Links",
        links: [
            {
                name: "Dashboard",
                to: "/accountant",
                icon: <AiOutlineDashboard size={20} />
            },
            {
                name: "Users",
                to: "/accountant/users",
                icon: <FaUsers size={20} />
            },
            {
                name: "Teachers",
                to: "/accountant/teachers",
                icon: <GiTeacher size={20} />
            },
            {
                name: "Students",
                to: "/accountant/students",
                icon: <FaUserGraduate size={20} />
            },

            {
                name: "Library",
                to: "/accountant/library",
                icon: <ImLibrary size={20} />
            },
            {
                name: "Exam",
                to: "/accountant/exam",
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
                to: "/librarian",
                icon: <AiOutlineDashboard size={20} />
            },
            {
                name: "Books",
                to: "/librarian/books",
                icon: <ImLibrary size={20} />
            },
            {
                name: "Book Transactions",
                to: "/librarian/book-transactions",
                icon: <ImLibrary size={20} />
            },
            {
                name: "Users",
                to: "/librarian/users",
                icon: <FaUsers size={20} />
            },
        ]
    }
]

export const teacherNavLinks: DNavLinks[] = [
    {
        section: "Main Links",
        links: [
            {
                name: "Dashboard",
                to: "/teacher",
                icon: <AiOutlineDashboard size={20} />
            },
            {
                name: "Users",
                to: "/teacher/users",
                icon: <FaUsers size={20} />
            },
            {
                name: "Students",
                to: "/teacher/students",
                icon: <FaUserGraduate size={20} />
            },
            {
                name: "Library",
                to: "/teacher/library",
                icon: <ImLibrary size={20} />
            },
            {
                name: "Exam",
                to: "/teacher/exam",
                icon: <TfiWrite size={20} />
            },
        ]
    }
]


export const examinerNavLinks: DNavLinks[] = [
    {
        section: "Main Links",
        links: [
            {
                name: "Dashboard",
                to: "/examiner",
                icon: <AiOutlineDashboard size={20} />
            },
            {
                name: "Users",
                to: "/examiner/users",
                icon: <FaUsers size={20} />
            },
            {
                name: "Teachers",
                to: "/examiner/teachers",
                icon: <GiTeacher size={20} />
            },
            {
                name: "Students",
                to: "/examiner/students",
                icon: <FaUserGraduate size={20} />
            },

            {
                name: "Library",
                to: "/examiner/library",
                icon: <ImLibrary size={20} />
            },
            {
                name: "Exam",
                to: "/examiner/exam",
                icon: <TfiWrite size={20} />
            }
        ]
    }];

export const studentNavLinks: DNavLinks[] = [
    {
        section: "Main Links",
        links: [
            {
                name: "Dashboard",
                to: "/student",
                icon: <AiOutlineDashboard size={20} />
            },
            {
                name: "Teachers",
                to: "/student/teachers",
                icon: <GiTeacher size={20} />
            },
            {
                name: "Library",
                to: "/student/library",
                icon: <ImLibrary size={20} />
            },
            {
                name: "Exam",
                to: "/student/exam",
                icon: <TfiWrite size={20} />
            }
        ]
    }
];