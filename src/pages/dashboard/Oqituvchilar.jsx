import React, { useState } from 'react';
import {
  CloudDownloadOutlined,
  Add,
  FilterList,
  Inventory2Outlined,
  DeleteOutlined,
  Search,
  ArrowDownward,
  VisibilityOutlined,
  EditOutlined,
  ChevronLeft,
  ChevronRight,
  Close,
  EmailOutlined,
  CalendarTodayOutlined,
  CloudUploadOutlined
} from '@mui/icons-material';

const initialTeachersData = [
  { id: 1, name: "Qwerty qwert", groups: ["Label", "Label", "Label", "+4"], phone: "+998(33)4082808", birthDate: "24 Jan 2022", createdAt: "24 Jan 2022", coin: "123 123", checked: false, isArchived: false },
  { id: 2, name: "Alisher Alisherov", groups: ["Label"], phone: "+998(90)1234567", birthDate: "15 Mar 1995", createdAt: "10 Feb 2023", coin: "450", checked: false, isArchived: false },
  { id: 3, name: "Bobur Boburov", groups: ["Label", "Label"], phone: "+998(99)9876543", birthDate: "12 Nov 1988", createdAt: "05 Jan 2023", coin: "1200", checked: false, isArchived: false },
  { id: 4, name: "Dilshod Dilshodov", groups: ["Label"], phone: "+998(94)1112233", birthDate: "20 May 1992", createdAt: "15 Apr 2023", coin: "0", checked: false, isArchived: false },
  { id: 5, name: "Eldor Eldorov", groups: ["Label"], phone: "+998(93)4445566", birthDate: "30 Sep 1990", createdAt: "20 Mar 2023", coin: "350", checked: false, isArchived: false },
  { id: 6, name: "Farhod Farhodov", groups: ["Label", "Label"], phone: "+998(97)7778899", birthDate: "05 Jul 1985", createdAt: "01 Jun 2023", coin: "890", checked: false, isArchived: false },
  { id: 7, name: "G'ani G'aniyev", groups: ["Label"], phone: "+998(98)1212121", birthDate: "18 Aug 1993", createdAt: "12 Jul 2023", coin: "150", checked: false, isArchived: false },
  { id: 8, name: "Hasan Hasanov", groups: ["Label", "Label", "Label", "+1"], phone: "+998(95)3434343", birthDate: "22 Dec 1989", createdAt: "08 Aug 2023", coin: "2000", checked: false, isArchived: false },
  { id: 9, name: "Islom Islomov", groups: ["Label", "Label"], phone: "+998(91)5656565", birthDate: "10 Feb 1996", createdAt: "19 Sep 2023", coin: "50", checked: false, isArchived: false },
  { id: 10, name: "Javohir Javohirov", groups: ["Label", "Label", "Label"], phone: "+998(90)7878787", birthDate: "25 Oct 1994", createdAt: "25 Oct 2023", coin: "500", checked: false, isArchived: false },
];

export default function Oqituvchilar() {
  const [teachers, setTeachers] = useState(initialTeachersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);

  const handleToggleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setTeachers(prev => prev.map(t => ({ ...t, checked: isChecked })));
  };

  const handleToggleTeacher = (id) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const handleDeleteSelected = () => {
    if (window.confirm("Tanlanganlarni o'chirishga ishonchingiz komilmi?")) {
      setTeachers(prev => prev.filter(t => !t.checked));
    }
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm("O'chirishga ishonchingiz komilmi?")) {
      setTeachers(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleArchiveTeacher = (id) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, isArchived: !t.isArchived, checked: false } : t));
  };

  const handleArchiveSelected = () => {
    setTeachers(prev => prev.map(t => t.checked ? { ...t, isArchived: !showArchived, checked: false } : t));
  };

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.phone.includes(searchQuery);
    const matchesArchive = showArchived ? t.isArchived : !t.isArchived;
    return matchesSearch && matchesArchive;
  });

  const allSelected = filteredTeachers.length > 0 && filteredTeachers.every(t => t.checked);

  return (
    <>
            <div className="max-w-[1400px] mx-auto pb-8">
              {/* Page Header */}
              <div className="flex justify-between items-start mb-6">
                  <div className="pr-8">
                      <h1 className="text-[24px] font-bold text-gray-900 mb-1.5">O'qituvchilar</h1>
                      <p className="text-[13px] text-gray-500 max-w-3xl leading-relaxed">
                          Ushbu sahifada siz o'qituvchilar ro'yxatini va ularning ma'lumotlarini topasiz. Har bir o'qituvchining ismi, fanlari va aloqa ma'lumotlari keltirilgan.
                      </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                      <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold text-[13px] transition-colors shadow-sm">
                          <CloudDownloadOutlined fontSize="small" />
                          Export
                      </button>
                      <button 
                          onClick={() => setIsAddTeacherOpen(true)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-[#8b5cf6] text-white rounded-xl hover:bg-[#7c3aed] font-semibold text-[13px] transition-colors shadow-sm"
                      >
                          <Add fontSize="small" />
                          O'qituvchi qo'shish
                      </button>
                  </div>
              </div>

              {/* Table Controls */}
              <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold text-[13px] transition-colors shadow-sm">
                          <FilterList fontSize="small" className="text-gray-500" />
                          Filters
                      </button>
                      <button onClick={handleArchiveSelected} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold text-[13px] transition-colors shadow-sm">
                          <Inventory2Outlined fontSize="small" className="text-gray-500" />
                          {showArchived ? "Arxivdan chiqarish" : "Arxivga olish"}
                      </button>
                      <button onClick={handleDeleteSelected} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-red-500 rounded-xl hover:bg-red-50 font-semibold text-[13px] transition-colors shadow-sm">
                          <DeleteOutlined fontSize="small" className="text-red-500" />
                          Delete
                      </button>
                  </div>
                  <div className="flex items-center gap-3">
                      <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fontSize="small" />
                          <input 
                              type="text" 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Qidiruv" 
                              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-medium focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all shadow-sm w-[240px]"
                          />
                      </div>
                      <button 
                        onClick={() => setShowArchived(!showArchived)}
                        className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl font-semibold text-[13px] transition-colors shadow-sm ${showArchived ? 'bg-[#8b5cf6] border-[#8b5cf6] text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                          {showArchived ? 'Asosiy ro\'yxat' : 'Arxiv'}
                          <Inventory2Outlined fontSize="small" />
                      </button>
                  </div>
              </div>

              {/* Table */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                      <table className="w-full text-left text-[13px] whitespace-nowrap">
                          <thead className="bg-white border-b border-gray-100 text-gray-500 text-[12px] font-semibold">
                              <tr>
                                  <th className="px-4 py-3 w-12 text-center">
                                      <input 
                                        type="checkbox" 
                                        checked={allSelected} 
                                        onChange={handleToggleSelectAll} 
                                        className="w-4 h-4 rounded border-gray-300 text-[#8b5cf6] focus:ring-[#8b5cf6]" 
                                      />
                                  </th>
                                  <th className="px-4 py-3 cursor-pointer hover:text-gray-700">
                                      Nomi <ArrowDownward sx={{ fontSize: 14 }} className="inline-block ml-0.5" />
                                  </th>
                                  <th className="px-4 py-3">Guruh</th>
                                  <th className="px-4 py-3">Telefon raqamlari</th>
                                  <th className="px-4 py-3">Tug'ilgan sanasi</th>
                                  <th className="px-4 py-3">Yaratilgan sana</th>
                                  <th className="px-4 py-3">Coin</th>
                                  <th className="px-4 py-3 text-right"></th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                              {filteredTeachers.length === 0 ? (
                                  <tr>
                                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                                      Hech narsa topilmadi
                                    </td>
                                  </tr>
                              ) : filteredTeachers.map((teacher, idx) => (
                                  <tr key={teacher.id} className="hover:bg-gray-50/50 transition-colors">
                                      <td className="px-4 py-3 text-center">
                                          <input 
                                              type="checkbox" 
                                              checked={teacher.checked || false}
                                              onChange={() => handleToggleTeacher(teacher.id)}
                                              className="w-4 h-4 rounded border-gray-300 text-[#8b5cf6] focus:ring-[#8b5cf6] accent-[#8b5cf6]" 
                                          />
                                      </td>
                                      <td className="px-4 py-3">
                                          <div className="flex items-center gap-2.5">
                                              <img src={`https://i.pravatar.cc/150?img=${idx + 10}`} alt="avatar" className="w-7 h-7 rounded-full object-cover" />
                                              <span className="font-semibold">{teacher.name}</span>
                                          </div>
                                      </td>
                                      <td className="px-4 py-3">
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                              {teacher.groups.map((g, i) => (
                                                  <span key={i} className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${g.startsWith('+') ? 'bg-gray-50 text-gray-500 border-gray-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                                      {g}
                                                  </span>
                                              ))}
                                          </div>
                                      </td>
                                      <td className="px-4 py-3 text-gray-500">{teacher.phone}</td>
                                      <td className="px-4 py-3 text-gray-500">{teacher.birthDate}</td>
                                      <td className="px-4 py-3 text-gray-500">{teacher.createdAt}</td>
                                      <td className="px-4 py-3">
                                          <div className="flex items-center gap-1.5">
                                              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                                              <span>{teacher.coin}</span>
                                          </div>
                                      </td>
                                      <td className="px-4 py-3">
                                          <div className="flex items-center justify-end gap-2 text-gray-400">
                                              <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded hover:bg-red-50 text-red-500 transition-colors">
                                                <span className="font-bold text-lg leading-none mb-0.5">-</span>
                                              </button>
                                              <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded hover:bg-green-50 text-green-500 transition-colors">
                                                <span className="font-bold text-lg leading-none mb-0.5">+</span>
                                              </button>
                                              <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                                                  <VisibilityOutlined sx={{ fontSize: 18 }} />
                                              </button>
                                              <button onClick={() => handleArchiveTeacher(teacher.id)} className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${teacher.isArchived ? 'bg-[#8b5cf6] text-white' : 'hover:bg-gray-100'}`} title={teacher.isArchived ? "Arxivdan chiqarish" : "Arxivga olish"}>
                                                  <Inventory2Outlined sx={{ fontSize: 18 }} />
                                              </button>
                                              <button onClick={() => handleDeleteTeacher(teacher.id)} className="w-7 h-7 flex items-center justify-center hover:bg-red-50 text-gray-500 hover:text-red-500 rounded transition-colors" title="O'chirish">
                                                  <DeleteOutlined sx={{ fontSize: 18 }} />
                                              </button>
                                              <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                                                  <EditOutlined sx={{ fontSize: 18 }} />
                                              </button>
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
                  
                  {/* Pagination */}
                  <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-white">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
                          <ChevronLeft fontSize="small" /> Previous
                      </button>
                      <div className="flex items-center gap-1 text-[13px] font-semibold text-gray-500">
                          <button className="w-8 h-8 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center">1</button>
                          <button className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center">2</button>
                          <button className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center">3</button>
                          <span className="w-8 h-8 flex items-center justify-center">...</span>
                          <button className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center">8</button>
                          <button className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center">9</button>
                          <button className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center">10</button>
                      </div>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
                          Next <ChevronRight fontSize="small" />
                      </button>
                  </div>
              </div>
            </div>

      {/* Add Teacher Drawer */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isAddTeacherOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20" onClick={() => setIsAddTeacherOpen(false)} />
        
        {/* Drawer Panel */}
        <div className={`relative w-[400px] max-w-full bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ${isAddTeacherOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">O'qituvchi qoshish</h2>
              <p className="text-xs text-gray-500">Bu yerda siz yangi o'qituvchi qo'shishingiz mumkin.</p>
            </div>
            <button onClick={() => setIsAddTeacherOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <Close fontSize="small" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Telefon raqam */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Telefon raqam</label>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#8b5cf6] focus-within:ring-1 focus-within:ring-[#8b5cf6] transition-all">
                <div className="bg-gray-50 px-3 py-2.5 border-r border-gray-200 text-gray-600 font-medium text-[13px] flex items-center justify-center">
                  +998
                </div>
                <input type="text" className="flex-1 px-3 py-2.5 text-[13px] focus:outline-none" />
              </div>
            </div>

            {/* Mail */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Mail</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <EmailOutlined fontSize="small" />
                </div>
                <input 
                  type="email" 
                  placeholder="Elektron pochtani kiriting" 
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all" 
                />
              </div>
            </div>

            {/* FIO */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">O'qituvchi FIO</label>
              <input 
                type="text" 
                placeholder="Ma'lumotni kiriting" 
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all" 
              />
            </div>

            {/* Tug'ilgan sanasi */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Tug'ilgan sanasi</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <CalendarTodayOutlined fontSize="small" />
                </div>
                <input 
                  type="text" 
                  defaultValue="01.03.1990" 
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-[13px] font-medium text-gray-800 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all" 
                />
              </div>
            </div>

            {/* Guruh */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Guruh</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-[#8b5cf6] focus-within:ring-1 focus-within:ring-[#8b5cf6] transition-all">
                <Search fontSize="small" className="text-gray-400" />
                <div className="flex items-center gap-1.5 flex-1 overflow-x-auto no-scrollbar">
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-[12px] font-semibold text-gray-700 whitespace-nowrap">
                    dFDFASC <button className="hover:text-red-500"><Close sx={{ fontSize: 12 }} /></button>
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-[12px] font-semibold text-gray-700 whitespace-nowrap">
                    JDCCXH <button className="hover:text-red-500"><Close sx={{ fontSize: 12 }} /></button>
                  </span>
                </div>
              </div>
            </div>

            {/* Jinsi */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Jinsi</label>
              <div className="flex gap-6 bg-gray-50 border border-gray-100 rounded-xl p-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" defaultChecked className="w-4 h-4 text-[#8b5cf6] focus:ring-[#8b5cf6] border-gray-300" />
                  <span className="text-[13px] font-medium text-gray-700">Erkak</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" className="w-4 h-4 text-[#8b5cf6] focus:ring-[#8b5cf6] border-gray-300" />
                  <span className="text-[13px] font-medium text-gray-700">Ayol</span>
                </label>
              </div>
            </div>

            {/* Surati */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Surati</label>
              <div className="border border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 hover:border-[#8b5cf6] transition-all">
                <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 mb-3 shadow-sm">
                  <CloudUploadOutlined fontSize="small" />
                </div>
                <p className="text-[13px] text-gray-600 mb-1">
                  <span className="text-[#8b5cf6] font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-[11px] text-gray-400 font-medium">JPG or PNG (max. 800x800px)</p>
              </div>
            </div>

            {/* Parol qo'shish */}
            <div className="flex justify-end pt-1">
              <button className="text-[13px] font-semibold text-[#8b5cf6] flex items-center gap-1 hover:text-[#7c3aed] transition-colors">
                <Add fontSize="small" /> Parol qoshish
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-white">
            <button 
              onClick={() => setIsAddTeacherOpen(false)}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Bekor qilish
            </button>
            <button className="px-5 py-2.5 bg-gray-50 text-gray-400 rounded-xl text-[13px] font-semibold hover:bg-gray-100 hover:text-gray-500 transition-colors">
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
