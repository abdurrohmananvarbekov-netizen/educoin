import React, { useState } from 'react';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import Asosiy from './dashboard/Asosiy';
import Oqituvchilar from './dashboard/Oqituvchilar';
import Kurslar from './dashboard/Kurslar';
import Xonalar from './dashboard/Xonalar';
import Talabalar from './dashboard/Talabalar';
import Guruhlar from './dashboard/Guruhlar';
import { 
  AutoStoriesOutlined, 
  MeetingRoomOutlined, 
  AccountBalanceOutlined, 
  PeopleAltOutlined, 
  AssignmentLateOutlined, 
  LockPersonOutlined, 
  CurrencyExchangeOutlined, 
  SendOutlined, 
  QuizOutlined, 
  VerifiedUserOutlined,
  Close,
  ChevronLeft
} from '@mui/icons-material';

const othersMenuItems = [
  { id: 'kurslar', text: 'Kurslar', icon: <AutoStoriesOutlined /> },
  { id: 'xonalar', text: 'Xonalar', icon: <MeetingRoomOutlined /> },
  { id: 'hodimlar', text: 'Hodimlar', icon: <PeopleAltOutlined /> },
  { id: 'xabar_yuborish', text: 'Xabar Yuborish', icon: <SendOutlined /> },
];

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState('asosiy');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('oquv_markaz');
  const [isOthersMenuOpen, setIsOthersMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-gray-800 overflow-hidden">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
        onOpenOthers={() => setIsOthersMenuOpen(true)}
        onCloseOthers={() => setIsOthersMenuOpen(false)}
        isOthersMenuOpen={isOthersMenuOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          <div className="p-8 pt-0">
            {activeMenu === 'asosiy' && <Asosiy />}
            {activeMenu === 'oqituvchilar' && <Oqituvchilar />}
            {activeMenu === 'boshqarish' && <Kurslar setActiveMenu={setActiveMenu} />}
            {activeMenu === 'kurslar' && <Kurslar setActiveMenu={setActiveMenu} />}
            {activeMenu === 'xonalar' && <Xonalar setActiveMenu={setActiveMenu} />}
            {activeMenu === 'talabalar' && <Talabalar />}
            {activeMenu === 'guruhlar' && <Guruhlar />}
            {['sovglar', 'filial', 'hodimlar', 'sabablar', 'rollar', 'coin', 'xabar_yuborish', 'faq', 'tekshiruv'].includes(activeMenu) && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <h2 className="text-2xl font-bold mb-2 capitalize">{activeMenu.replace('_', ' ')}</h2>
                <p>Ushbu sahifa hozirda ishlab chiqilmoqda...</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Others Menu Drawer */}
      <div 
        className={`fixed inset-0 z-50 flex transition-all duration-300 ${
          isOthersMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ left: isOthersMenuOpen ? (sidebarOpen ? '260px' : '80px') : '0' }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/40 transition-opacity duration-300" 
          onClick={() => setIsOthersMenuOpen(false)}
        />
        
        {/* Drawer Panel */}
        <div 
          className={`absolute w-[240px] bg-white h-full shadow-[10px_0_30px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-300 z-10 rounded-tr-[25px] rounded-br-[25px] overflow-hidden ${
            isOthersMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ left: 0 }}
        >
          <div className="p-0 flex flex-col h-full">
            {/* Header */}
            <div className="h-[72px] px-6 flex items-center border-b border-gray-50">
              <h2 className="text-[15px] font-bold text-gray-800 tracking-tight">Menu</h2>
            </div>

            {/* Menu Items */}
            <div className="flex-1 py-4 overflow-y-auto no-scrollbar">
              {othersMenuItems.map((item, index) => (
                <button
                   key={index}
                   onClick={() => {
                     setActiveMenu(item.id);
                     setIsOthersMenuOpen(false);
                   }}
                   className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-[#6d28d9] transition-all group"
                 >
                   <div className="w-5 h-5 flex items-center justify-center transition-colors">
                     {React.cloneElement(item.icon, { sx: { fontSize: 20 } })}
                   </div>
                   <span className="text-[14px] font-semibold tracking-tight">{item.text}</span>
                 </button>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

