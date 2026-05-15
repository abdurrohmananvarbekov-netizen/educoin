import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  EventNoteOutlined,
  Add,
  Search,
  KeyboardArrowDown,
  NotificationsNoneOutlined,
  DarkModeOutlined
} from '@mui/icons-material';

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
        <header className="h-[72px] px-8 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            {/* Calendar */}
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors rounded-lg">
              <EventNoteOutlined fontSize="small" />
            </button>

            {/* + Qo'shish Button */}
            <button className="h-9 px-4 bg-[#6366f1] text-white rounded-lg flex items-center gap-2 text-[14px] font-medium hover:bg-[#4f46e5] transition-colors shadow-sm">
              <Add fontSize="small" />
              Qo'shish
              <KeyboardArrowDown fontSize="small" />
            </button>

            {/* Search */}
            <div className="relative flex-1 max-w-[320px] ml-2 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" fontSize="small" />
              <input 
                  type="text" 
                  placeholder="Qidirish..." 
                  className="w-full pl-9 pr-4 py-2 bg-gray-50/80 border border-gray-100 rounded-lg text-[14px] focus:outline-none focus:border-[#8b5cf6] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language */}
            <div className="flex items-center gap-1 text-[14px] font-medium text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
              O'zbekcha
              <KeyboardArrowDown fontSize="small" />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <NotificationsNoneOutlined fontSize="medium" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <DarkModeOutlined fontSize="medium" />
              </button>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-sm">
              A
            </div>
          </div>
        </header>
  );
}
