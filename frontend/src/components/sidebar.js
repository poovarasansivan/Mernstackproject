import React, { useContext, useState } from "react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarContext = React.createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(1); // Set initial active item

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <aside
      className="flex flex-col h-screen"
      style={{ width: expanded ? "300px" : "64px" }}
    >
      <nav
        className="flex flex-col flex-grow bg-white border-r shadow-sm"
        style={{ width: "100%" }}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/255.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider
          value={{ expanded, activeItem, handleItemClick }}
        >
          <ul className="flex flex-col flex-grow px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?name=Poovarasan+S?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10  h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Poovarasan S</h4>
              <span className="text-xs text-gray-600">
                poovarasan@gmail.com
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}
export function SidebarItem({ index, icon, text, alert, to }) {
  const { expanded, activeItem, handleItemClick } = useContext(SidebarContext);
  const isActive = activeItem === index;

  return (
    <li
      className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }
        `}
      onClick={() => handleItemClick(index)}
    >
      {expanded ? (
        <Link to={to} className={`flex items-center space-x-2 w-full`}>
          {icon}
          <span className={`overflow-hidden transition-all w-auto ml-1`}>
            {text}
          </span>
        </Link>
      ) : (
        <div className={`flex items-center space-x-2 w-full`}>
          {icon}
          <span className={`overflow-hidden transition-all w-auto ml-1`}>
            {text}
          </span>
        </div>
      )}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
