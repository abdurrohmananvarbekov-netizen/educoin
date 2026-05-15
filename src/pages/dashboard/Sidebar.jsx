import React from 'react';
import {
  HomeOutlined,
  PersonOutlined,
  LayersOutlined,
  SchoolOutlined,
  CardGiftcardOutlined,
  Tune,
  Bolt,
  NotificationsActiveOutlined,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';

const menuData = [
  { id: 'asosiy', text: 'Asosiy', icon: <HomeOutlined /> },
  { id: 'oqituvchilar', text: "O'qituvchilar", icon: <PersonOutlined /> },
  { id: 'guruhlar', text: 'Guruhlar', icon: <LayersOutlined /> },
  { id: 'talabalar', text: 'Talabalar', icon: <SchoolOutlined /> },
  { id: 'sovglar', text: "Sovg'alar", icon: <CardGiftcardOutlined /> },
  { id: 'boshqarish', text: 'Boshqarish', icon: <Tune /> },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeMenu, setActiveMenu }) {
  return (
      <div 
        className={`${
          sidebarOpen ? 'w-[260px]' : 'w-[80px]'
        } bg-white flex flex-col h-screen transition-all duration-300 relative z-20 border-r border-gray-100 shrink-0`}
      >
        {/* Sidebar Toggle - Positioned on the border */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute right-0 top-6 translate-x-1/2 w-8 h-8 bg-[#8b5cf6] rounded-lg flex items-center justify-center text-white hover:bg-[#7c3aed] transition-colors shadow-md z-30"
        >
          {sidebarOpen ? <ChevronLeft fontSize="small" /> : <ChevronRight fontSize="small" />}
        </button>

        {/* Logo */}
        <div className="flex items-center h-[72px] px-6 py-4">
          <div className="w-8 h-8 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-lg mr-3 shrink-0">
            <Bolt sx={{ fontSize: 20 }} />
          </div>
          {sidebarOpen && <span className="text-gray-900 font-bold text-xl tracking-tight">NajotEdu</span>}
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuData.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeMenu === item.id 
                  ? 'bg-[#8b5cf6] text-white shadow-lg shadow-purple-200' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center w-6 h-6 shrink-0">
                {React.cloneElement(item.icon, { fontSize: 'small' })}
              </span>
              {sidebarOpen && (
                <span className={`ml-3 text-[15px] ${activeMenu === item.id ? 'font-bold' : 'font-medium'}`}>
                  {item.text}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Subscription Card */}
        {sidebarOpen && (
          <div className="p-4">
            <div className="bg-[#fee2e2]/50 border border-red-100 rounded-[24px] p-5 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <NotificationsActiveOutlined sx={{ color: '#f97316', fontSize: 22 }} />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-gray-900">Obuna</h4>
                  <p className="text-[12px] font-medium text-red-500">Obunangiz tugagan</p>
                </div>
              </div>
              
              <button className="w-full mt-2 bg-[#dc2626] text-white text-[14px] font-bold py-3.5 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                <Bolt sx={{ fontSize: 18 }} />
                Obunani yangilash
              </button>
            </div>
          </div>
        )}
      </div>
  );
}
