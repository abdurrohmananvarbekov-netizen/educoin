import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  ChevronRight,
  GridView,
  LogoutOutlined
} from '@mui/icons-material';

const menuData = [
  { id: 'asosiy', text: 'Asosiy', icon: <HomeOutlined /> },
  { id: 'oqituvchilar', text: "O'qituvchilar", icon: <PersonOutlined /> },
  { id: 'guruhlar', text: 'Guruhlar', icon: <LayersOutlined /> },
  { id: 'talabalar', text: 'Talabalar', icon: <SchoolOutlined /> },
  { id: 'sovglar', text: "Sovg'alar", icon: <CardGiftcardOutlined /> },
  { id: 'boshqarish', text: 'Boshqarish', icon: <Tune /> },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeMenu, setActiveMenu, onOpenOthers, onCloseOthers, isOthersMenuOpen }) {
  const navigate = useNavigate();
  return (
      <div 
        className={`${
          sidebarOpen ? 'w-[260px]' : 'w-[80px]'
        } bg-white flex flex-col h-screen transition-all duration-300 relative z-[60] border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] shrink-0`}
      >
        {/* Sidebar Toggle - Positioned on the border */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute right-0 top-6 translate-x-1/2 w-8 h-8 bg-[#7c3aed] rounded-lg flex items-center justify-center text-white hover:bg-[#6d28d9] transition-colors shadow-md z-[60]"
        >
          {sidebarOpen ? <ChevronLeft fontSize="small" /> : <ChevronRight fontSize="small" />}
        </button>

        {/* Logo */}
        <div className="flex items-center h-[72px] px-6 py-4">
          <img 
            src="/BTC.svg" 
            alt="Educoin Logo" 
            className="w-9 h-9 object-contain mr-3 shrink-0 drop-shadow-sm" 
          />
          {sidebarOpen && <span className="text-gray-900 font-bold text-xl tracking-tight">Educoin</span>}
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuData.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'boshqarish') {
                  setActiveMenu('boshqarish');
                  onOpenOthers();
                } else {
                  setActiveMenu(item.id);
                  onCloseOthers();
                }
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                (activeMenu === item.id || 
                 isOthersMenuOpen && item.id === 'boshqarish' || 
                 item.id === 'boshqarish' && ['kurslar', 'xonalar', 'hodimlar', 'xabar_yuborish'].includes(activeMenu)
                )
                  ? 'bg-[#7c3aed] text-white shadow-lg shadow-purple-200' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center w-6 h-6 shrink-0">
                {React.cloneElement(item.icon, { fontSize: 'small' })}
              </span>
              {sidebarOpen && (
                <span className={`ml-3 text-[15px] ${
                  (activeMenu === item.id || 
                   isOthersMenuOpen && item.id === 'boshqarish' || 
                   item.id === 'boshqarish' && ['kurslar', 'xonalar', 'hodimlar', 'xabar_yuborish'].includes(activeMenu)
                  )
                    ? 'font-bold' : 'font-medium'
                }`}>
                  {item.text}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="px-3 py-2 border-t border-gray-50">
          <button
            onClick={() => {
              if (window.confirm("Tizimdan chiqishni xohlaysizmi?")) {
                localStorage.removeItem('isLoggedIn');
                navigate('/login');
              }
            }}
            className="w-full flex items-center px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
          >
            <span className="flex items-center justify-center w-6 h-6 shrink-0">
              <LogoutOutlined fontSize="small" />
            </span>
            {sidebarOpen && <span className="ml-3 text-[15px]">Chiqish</span>}
          </button>
        </div>

        {/* Subscription Card */}
        {sidebarOpen && (
          <div className="p-4">
            <div className="bg-[#fee2e2]/50 border border-red-100 rounded-[24px] p-4 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <NotificationsActiveOutlined sx={{ color: '#f97316', fontSize: 22 }} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900">Obuna</h4>
                  <p className="text-[11px] font-medium text-red-500">Obunangiz tugagan</p>
                </div>
              </div>
              
              <button className="w-full mt-1 bg-[#dc2626] text-white text-[13px] font-bold py-2.5 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                <Bolt sx={{ fontSize: 18 }} />
                Obunani yangilash
              </button>
            </div>
          </div>
        )}
      </div>
  );
}

