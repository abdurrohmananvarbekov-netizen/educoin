import React, { useState, useRef, useEffect } from 'react';
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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ id: 'uz', name: "O'zbekcha" });
  const langRef = useRef(null);

  const languages = [
    { id: 'uz', name: "O'zbekcha" },
    { id: 'ru', name: 'Русский' },
    { id: 'en', name: 'English' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
        <header className="h-[72px] px-8 flex items-center justify-between z-10 shrink-0 relative">
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
                  className="w-full pl-9 pr-4 py-2 bg-gray-50/80 border border-gray-100 rounded-lg text-[14px] focus:outline-none focus:border-[#7c3aed] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-all text-[14px] font-semibold text-gray-600"
              >
                <span>{selectedLang.name}</span>
                <KeyboardArrowDown 
                  fontSize="small" 
                  className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Language Dropdown */}
              <div className={`absolute right-0 mt-2 w-[140px] bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 py-2 transition-all duration-200 z-[100] ${
                isLangOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
              }`}>
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold transition-colors hover:bg-gray-50 ${
                      selectedLang.id === lang.id ? 'text-[#7c3aed]' : 'text-gray-600'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
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
            <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-sm">
              A
            </div>
          </div>
        </header>
  );
}

