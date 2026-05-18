import React, { useState } from 'react';
import {
  GroupOutlined,
  SchoolOutlined,
  CreditCardOutlined,
  ReportProblemOutlined,
  AcUnitOutlined,
  Inventory2Outlined,
  KeyboardArrowDown
} from '@mui/icons-material';

const statCards = [
  { id: 1, title: 'Faol talabalar', value: 52, icon: <SchoolOutlined sx={{ fontSize: 24, color: '#7c3aed' }} /> },
  { id: 2, title: 'Guruhlar', value: 23, icon: <GroupOutlined sx={{ fontSize: 24, color: '#7c3aed' }} /> },
  { id: 3, title: 'Joriy oy to\'lovlar', value: 0, icon: <CreditCardOutlined sx={{ fontSize: 24, color: '#7c3aed' }} /> },
  { id: 4, title: 'Qarzdorlar', value: 104, icon: <ReportProblemOutlined sx={{ fontSize: 24, color: '#7c3aed' }} /> },
  { id: 5, title: 'Muzlatilganlar', value: 0, icon: <AcUnitOutlined sx={{ fontSize: 24, color: '#7c3aed' }} /> },
  { id: 6, title: 'Arxivdagilar', value: 23, icon: <Inventory2Outlined sx={{ fontSize: 24, color: '#7c3aed' }} /> },
];

export default function Asosiy() {
  const [activeAccordions, setActiveAccordions] = useState({
    payments: false,
    profit: false,
    schedule: false
  });

  const toggleAccordion = (key) => {
    setActiveAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-gray-900 mb-1">Salom, Anvarbekov Abdurrohman!</h1>
        <p className="text-[15px] text-gray-500">NajotEdu platformasiga xush kelibsiz!</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((card) => (
          <div 
            key={card.id} 
            className="bg-white rounded-[12px] p-6 flex flex-col items-center justify-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-3">
              {card.icon}
            </div>
            <span className="text-[13px] font-medium text-gray-400 mb-1 text-center">{card.title}</span>
            <span className="text-[28px] font-bold text-gray-900">{card.value}</span>
          </div>
        ))}
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {[
          { id: 'payments', title: 'Joriy oy uchun to\'lovlar' },
          { id: 'profit', title: 'Yillik Foyda' },
          { id: 'schedule', title: 'Dars jadvali' }
        ].map((section) => (
          <div key={section.id} className="bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden">
            <div 
              onClick={() => toggleAccordion(section.id)}
              className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-gray-800 text-[16px]">{section.title}</span>
              <KeyboardArrowDown className={`text-gray-400 transition-transform duration-300 ${activeAccordions[section.id] ? 'rotate-180' : ''}`} />
            </div>
            {activeAccordions[section.id] && (
              <div className="px-6 pb-6 animate-fadeIn">
                <div className="text-sm text-gray-400 font-medium py-10 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                  Ma'lumotlar mavjud emas
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

