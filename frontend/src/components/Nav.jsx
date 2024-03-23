import { useState, useEffect, useRef } from "react";
import logo from "/assets/logo.svg";
import profile from "/assets/profile.svg";
import { PiFlowerFill } from "react-icons/pi";
import { FaDatabase } from "react-icons/fa";
import { TbAppsFilled } from "react-icons/tb";
import { IoIosPlayCircle } from "react-icons/io";
import { IoMdHelpCircle } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

function Nav({ collapsed, setCollapsed, toggleCollapse }) {
    const navRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setCollapsed(true);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [setCollapsed]);

    const handleDropdownToggle = () => {
        setShowDropdown((prevState) => !prevState);
    };
    return (
        <section ref={navRef}>
            <div className="w-[100%] bg-white h-[70px] flex justify-start items-center absolute z-40">
                <div className="w-[250px] flex justify-center">

                    <Link to={"/"}>
                        <img src={logo} alt="" className={`w-[90px] ${collapsed ? "translate-x-[-70px]" : ""}`} />
                    </Link>

                </div>

                <span className="flex absolute right-2">
                    <div className="hidden text-[15px] sm:block">
                        <pre className="font-semibold font-sans text-[18px] flex items-center">Free Trial     |  <p className="text-[14px] font-medium">2 days left</p> </pre>
                        <h2 className="text-orange-500 text-[12px]mt-2 cursor-pointer">Extend free trial</h2>
                    </div>

                    <div className="flex w-[100px] text-[12px] ml-6  items-center">
                        <img src={profile} alt="" className="w-[40px]" />
                        <IoMdArrowDropdown className="ml-2 scale-150" id="dropdown" onClick={handleDropdownToggle} />
                    </div>

                    {showDropdown && (
                        <div className="absolute right-2 top-[50px] bg-white border-2  rounded-md shadow-md py-2 px-4 hover:bg-gray-100">
                            <Link to='/Logout'>
                                <button className="block w-full text-left text-gray-800  py-1 px-2">Logout</button>
                            </Link>
                        </div>
                    )}
                </span>
            </div>
            <div
                className={`w-[250px] bg-white h-[100vh] flex justify-center items-start absolute transition-all  ${collapsed ? "-ml-[180px]" : ""
                    }`}
            >
                <div className="mt-[80px]">
                    <span className={`h-[140px] w-[220px] flex flex-col justify-evenly items-start pl-[20px] ${!collapsed ? 'border-t-2 border-b-2 border-gray-300' : ''}`}>


                        <Link to={"/"}>
                            <div className="flex items-center text-gray-300 hover:text-orange-500 cursor-pointer">
                                <FaDatabase className={`${collapsed ? 'translate-x-[170px] scale-[1.5]' : 'scale-[1.5]'}`} />
                                {!collapsed && <h2 className="text-[15px] ml-2 font-bold" onClick={toggleCollapse}>My Projects</h2>}
                            </div>
                        </Link>

                        <Link to={"/Sample"}>
                            <div className={`flex items-center text-gray-300 hover:text-orange-500 cursor-pointer`}>
                                <PiFlowerFill className={`${collapsed ? 'translate-x-[170px] scale-[1.5]' : 'scale-[1.5]'}`} />
                                {!collapsed && <h2 className="text-[15px] ml-2 font-bold">Sample Projects</h2>}
                            </div>
                        </Link>

                    </span>
                    <span className="h-[140px] w-[220px] flex flex-col justify-evenly items-start pl-[20px] ">
                        <Link to={"/Apps"}>
                            <div className="flex items-center text-gray-300 hover:text-orange-500 cursor-pointer">
                                <TbAppsFilled className={`${collapsed ? 'translate-x-[170px] scale-[1.5]' : 'scale-[1.5]'}`} />
                                {!collapsed && <h2 className="text-[15px] ml-2 font-bold">Apps</h2>}
                            </div>
                        </Link>

                        <Link to={"/Intro"}>
                            <div className="flex items-center text-gray-300 hover:text-orange-500 cursor-pointer">
                                <IoIosPlayCircle className={`${collapsed ? 'translate-x-[170px] scale-[1.5]' : 'scale-[1.5]'}`} />
                                {!collapsed && <h2 className="text-[15px] ml-2 font-bold">Intro to Necleo</h2>}
                            </div>
                        </Link>
                    </span>
                    <span className={`h-[180px] w-[220px] flex flex-col justify-evenly items-start pl-[20px] absolute bottom-0`}>
                        <Link to={"/Help"}>
                            <div className="flex items-center text-gray-300 hover:text-orange-500 cursor-pointer">
                                <IoMdHelpCircle className={`${collapsed ? 'translate-x-[170px] scale-[1.5]' : 'scale-[1.5]'}`} />
                                {!collapsed && <h2 className="text-[15px] ml-2 font-bold">Help and Suggestion</h2>}
                            </div>
                        </Link>

                        <Link to={"/Feedback"}>
                            <div className="flex items-center text-gray-300 hover:text-orange-500 cursor-pointer">
                                <MdFeedback className={`${collapsed ? 'translate-x-[170px] scale-[1.5]' : 'scale-[1.5]'}`} />
                                {!collapsed && <h2 className="text-[15px] ml-2 font-bold">Feedback</h2>}
                            </div>
                        </Link>

                        <div className="flex items-center text-gray-350 hover:text-orange-500 cursor-pointer" onClick={toggleCollapse}>
                            <TbLayoutSidebarLeftCollapseFilled className={`${collapsed ? 'translate-x-[170px] scale-[1.5]' : 'scale-[1.5]'}`} />
                            <h2 className="text-[15px] ml-2 font-bold" >
                                Collapse
                            </h2>
                        </div>
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Nav;
