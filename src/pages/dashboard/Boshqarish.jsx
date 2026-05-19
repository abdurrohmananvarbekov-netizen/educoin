import React, { useState } from 'react';
import { Add, DeleteOutlined, EditOutlined } from '@mui/icons-material';

const boshqarishSubMenu = [
  { id: 'kurslar', text: 'Kurslar' },
  { id: 'xonalar', text: 'Xonalar' },
  { id: 'hodimlar', text: 'Hodimlar' },
  { id: 'xabar', text: 'Xabar yuborish' },
];

export default function Boshqarish({ setActiveMenu }) {
  const [activeBoshqarishTab, setActiveBoshqarishTab] = useState('kurslar');
  const [activeCourseBranch, setActiveCourseBranch] = useState('filial_1');

  return (
    <div className="max-w-[1400px] mx-auto pb-8">
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-gray-900 mb-1.5">Boshqarish</h1>
        <p className="text-[13px] text-gray-500 max-w-3xl leading-relaxed">
          Ushbu sahifada siz sovg'alarni boshqarish imkoniyatiga ega bo'lasiz. Har bir sovg'a haqida batafsil ma'lumot va yangi sovg'a qo'shish imkoniyati bor.
        </p>
      </div>

      {/* Top Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        {boshqarishSubMenu.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveBoshqarishTab(tab.id);
              if (tab.id === 'kurslar') setActiveMenu('kurslar');
              if (tab.id === 'xonalar') setActiveMenu('xonalar');
              if (tab.id === 'hodimlar') setActiveMenu('hodimlar');
              if (tab.id === 'xabar') setActiveMenu('xabar_yuborish');
            }}
            className={`pb-3 text-[13px] font-semibold whitespace-nowrap border-b-2 transition-colors ${activeBoshqarishTab === tab.id
                ? 'border-[#6d28d9] text-[#6d28d9]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab.text}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeBoshqarishTab === 'kurslar' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[18px] font-bold text-gray-900">Kurslar</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#6d28d9] text-white rounded-xl hover:bg-[#6d28d9] font-semibold text-[13px] transition-colors shadow-sm">
              <Add fontSize="small" />
              Kurslar qoshish
            </button>
          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { color: 'bg-white border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]' },
              { color: 'bg-purple-50/40 border border-purple-100' },
              { color: 'bg-yellow-50/40 border border-yellow-100' },
              { color: 'bg-green-50/40 border border-green-100' },
              { color: 'bg-blue-50/40 border border-blue-100' },
              { color: 'bg-pink-50/40 border border-pink-100' },
            ].map((card, idx) => (
              <div key={idx} className={`rounded-2xl p-5 ${card.color}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[14px] text-gray-900 leading-tight pr-4">Human Resources Manager</h3>
                  <div className="flex items-center gap-1.5 shrink-0 text-gray-400">
                    <button className="hover:text-red-500 transition-colors"><DeleteOutlined sx={{ fontSize: 18 }} /></button>
                    <button className="hover:text-[#6d28d9] transition-colors"><EditOutlined sx={{ fontSize: 18 }} /></button>
                  </div>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  A little about the company and the team that you'll be working with. A li...
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded-md text-[11px] font-bold text-gray-500 shadow-sm">90 min</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded-md text-[11px] font-bold text-gray-500 shadow-sm">3 oy</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded-md text-[11px] font-bold text-gray-500 shadow-sm">1 000 000 mln</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

