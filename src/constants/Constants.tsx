import { Component,ReactComponentElement} from "react"
import {JsxAttribute} from "typescript"
import {AiTwotoneDashboard} from "react-icons/ai"
import {FaUsers} from "react-icons/fa"

export type DLinks={
    name:string;
    to:string;
    icon:ReactComponentElement<any>;
};

export type DNavLinks={
     section:string,
     links:DLinks[];
};
export const adminNavLinks: DNavLinks[] = [
    {
        section:"Main Links",
        links:[
            {
                name:"Dashboard",
                to:"/admin",
                icon:<AiTwotoneDashboard size={20}/>
            },
            {
                name:"Users",
                to:"/users",
                icon:<FaUsers size={20}/>
            }
        ]
    }
]
