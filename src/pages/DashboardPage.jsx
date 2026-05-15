import React, { useState } from 'react';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import Asosiy from './dashboard/Asosiy';
import Oqituvchilar from './dashboard/Oqituvchilar';
import Boshqarish from './dashboard/Boshqarish';

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState('asosiy');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('oquv_markaz');

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-gray-800 overflow-hidden">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          <div className="p-8 pt-4">
            {activeMenu === 'asosiy' && <Asosiy />}
            {activeMenu === 'oqituvchilar' && <Oqituvchilar />}
            {activeMenu === 'boshqarish' && <Boshqarish />}
            
            {activeMenu !== 'asosiy' && activeMenu !== 'oqituvchilar' && activeMenu !== 'boshqarish' && (
              <div className="flex items-center justify-center h-full text-gray-400 font-medium text-lg pt-20">
                Tez kunda...
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
