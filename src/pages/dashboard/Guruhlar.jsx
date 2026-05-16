import React, { useState, useEffect, useRef } from 'react';
import { 
  Add, 
  DeleteOutlined, 
  EditOutlined, 
  MoreVert, 
  GroupsOutlined, 
  PersonOutlined, 
  SchoolOutlined,
  ArchiveOutlined,
  Loop,
  Close,
  AccessTimeOutlined,
  CalendarMonthOutlined
} from '@mui/icons-material';
import { Switch } from '@mui/material';

const initialGroups = [
  { 
    id: 1, 
    status: true, 
    name: 'N26', 
    course: 'Backend', 
    duration: '6 oy', 
    time: '09:30', 
    days: 'Du, Se, Chor, Pay, Ju',
    room: 'Autodesk', 
    teacher: 'Mohirbek', 
    students: 1 
  },
  { 
    id: 2, 
    status: true, 
    name: 'n105', 
    course: 'Backend', 
    duration: '6 oy', 
    time: '16:00', 
    days: 'Se, Pay, Shan',
    room: 'Autodesk', 
    teacher: 'Mohirbek', 
    students: 4 
  },
];

export default function Guruhlar() {
  const [groups, setGroups] = useState(initialGroups);
  const [activeTab, setActiveTab] = useState('guruhlar');
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    room: '',
    duration: '',
    days: [],
    time: '09:00',
    startDate: '',
    description: '',
    students: [],
    teachers: [],
  });

  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  const timePickerRef = useRef(null);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
        setIsTimePickerOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    };

    if (isTimePickerOpen || isDatePickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isTimePickerOpen, isDatePickerOpen]);

  const allStudents = [
    { id: 1, name: 'Ali Valiyev' },
    { id: 2, name: 'Salim Qodirov' },
    { id: 3, name: 'Bobur' },
    { id: 4, name: 'Qodir Salimov' },
  ];

  const allTeachers = [
    { id: 1, name: 'Anvarbekov Abdurrohman' },
    { id: 2, name: 'Islom Shokirov' },
    { id: 3, name: 'Javohir Elmurodov' },
  ];
  
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
  ];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleDateSelect = (day) => {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    setFormData({...formData, startDate: `${year}-${month}-${dayStr}`});
    setIsDatePickerOpen(false);
  };

  const weekDays = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
  const availableCourses = ['Backend', 'Frontend', 'Full stack', 'SMM', 'Grafik Dizayn'];
  const availableRooms = ['Telegram', 'Twitter', 'Apple', 'Facebook', 'Google', 'Amazon', 'Microsoft', 'Instagram', 'Netflix'];

  const resetFormData = () => {
    setFormData({
      name: '',
      course: '',
      room: '',
      duration: '',
      days: [],
      time: '09:00',
      startDate: '',
      description: '',
      students: [],
      teachers: [],
    });
    setIsTimePickerOpen(false);
    setIsDatePickerOpen(false);
    setIsStudentModalOpen(false);
    setIsTeacherModalOpen(false);
    setEditingGroupId(null);
  };

  const handleCloseDrawer = () => {
    setIsAddDrawerOpen(false);
    resetFormData();
  };

  const handleDeleteGroup = (id) => {
    if (window.confirm("Ushbu guruhni o'chirishni xohlaysizmi?")) {
      setGroups(groups.filter(g => g.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setGroups(groups.map(g => g.id === id ? { ...g, status: !g.status } : g));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.course || !formData.room || !formData.duration || formData.days.length === 0 || !formData.time || !formData.startDate) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }

    const dayShortNames = {
      'Dushanba': 'Du',
      'Seshanba': 'Se',
      'Chorshanba': 'Chor',
      'Payshanba': 'Pay',
      'Juma': 'Ju',
      'Shanba': 'Shan'
    };

    const newGroup = {
      id: editingGroupId || Date.now(),
      status: true,
      name: formData.name,
      course: formData.course,
      duration: formData.duration,
      time: formData.time,
      days: formData.days.map(d => dayShortNames[d]).join(', '),
      room: formData.room,
      teacher: formData.teachers.length > 0 ? allTeachers.find(t => t.id === formData.teachers[0])?.name : 'Tayinlanmagan',
      students: formData.students.length
    };

    if (editingGroupId) {
      setGroups(groups.map(g => g.id === editingGroupId ? newGroup : g));
    } else {
      setGroups([newGroup, ...groups]);
    }

    handleCloseDrawer();
  };

  return (
    <div className="px-6 py-4 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Guruhlar</h1>
        <button 
          onClick={() => setIsAddDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8b5cf6] text-white rounded-xl hover:bg-[#7c3aed] font-semibold text-[13px] transition-colors shadow-sm"
        >
          <Add fontSize="small" />
          Guruh qo'shish
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setActiveTab('guruhlar')}
          className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 ${
            activeTab === 'guruhlar' ? 'bg-white text-[#8b5cf6] shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Guruhlar
        </button>
        <button 
          onClick={() => setActiveTab('arxiv')}
          className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 ${
            activeTab === 'arxiv' ? 'bg-white text-[#8b5cf6] shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <ArchiveOutlined sx={{ fontSize: 18 }} />
          Arxiv
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-[#8b5cf6]">
              <GroupsOutlined />
            </div>
            <button className="text-gray-300 hover:text-gray-500"><MoreVert fontSize="small" /></button>
          </div>
          <p className="text-[13px] font-bold text-gray-500 mb-1">Jami guruhlar</p>
          <h2 className="text-3xl font-black text-gray-900">{groups.length}</h2>
        </div>

        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <PersonOutlined />
            </div>
            <button className="text-gray-300 hover:text-gray-500"><MoreVert fontSize="small" /></button>
          </div>
          <p className="text-[13px] font-bold text-gray-500 mb-1">O'qituvchilar</p>
          <h2 className="text-3xl font-black text-gray-900">0</h2>
        </div>

        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <SchoolOutlined />
            </div>
            <button className="text-gray-300 hover:text-gray-500"><MoreVert fontSize="small" /></button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-bold text-gray-500 mb-1">O'quvchilar</p>
              <h2 className="text-3xl font-black text-gray-900">0</h2>
            </div>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-black flex items-center justify-center text-white text-[10px] font-bold">I</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold">M</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-400 flex items-center justify-center text-white text-[10px] font-bold text-pink-100">S</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden transition-all">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider">Guruh nomi</th>
                <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider">Kurs</th>
                <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider text-center">Davomiyligi</th>
                <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider">Dars vaqti</th>
                <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider">Xona</th>
                <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider">O'qituvchi</th>
                <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider text-center">Talabalar</th>
                <th className="px-6 py-4 text-right"><Loop className="text-gray-300 cursor-pointer hover:text-gray-500 transition-colors" sx={{ fontSize: 18 }} /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {groups.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Switch 
                        size="small" 
                        checked={group.status} 
                        onChange={() => toggleStatus(group.id)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#8b5cf6' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#8b5cf6' },
                        }}
                      />
                      <span className={`text-[10px] font-black uppercase tracking-wider ${group.status ? 'text-green-500' : 'text-gray-400'}`}>
                        {group.status ? 'FAOL' : 'NOFAOL'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-black text-gray-900">{group.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-purple-50 text-[#8b5cf6] rounded-lg text-[11px] font-bold">
                      {group.course}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-bold text-gray-600 text-center">{group.duration}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-black text-gray-900">{group.time}</span>
                      <span className="text-[11px] text-gray-400 font-medium">{group.days}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-bold text-gray-600">{group.room}</td>
                  <td className="px-6 py-4 text-[13px] font-bold text-gray-600">{group.teacher}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[14px] font-black text-gray-900">{group.students}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-gray-300 hover:text-gray-500 transition-colors">
                      <MoreVert sx={{ fontSize: 18 }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Group Drawer Placeholder */}
      <div 
        className={`fixed inset-0 z-[999] flex transition-opacity duration-300 ${
          isAddDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/40 transition-opacity duration-300" 
          onClick={handleCloseDrawer}
        />
        <div 
          className={`absolute right-0 w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col transition-transform duration-500 ease-out z-[1000] ${
            isAddDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 flex items-center justify-between border-b border-gray-50">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900">{editingGroupId ? 'Guruhni tahrirlash' : 'Guruh qo\'shish'}</h2>
              <p className="text-[12px] text-gray-500">Yangi guruh yaratish uchun quyidagi ma'lumotlarni kiriting.</p>
            </div>
            <button 
              onClick={handleCloseDrawer}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
            >
              <Close />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-5">
            {/* Guruh nomi */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Guruh nomi <span className="text-red-500">*</span></label>
              <input 
                type="text"
                placeholder="Guruh nomi"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#8b5cf6] transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Kurs */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Kurs <span className="text-red-500">*</span></label>
              <select 
                className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#8b5cf6] transition-colors appearance-none cursor-pointer ${
                  !formData.course ? 'text-gray-400' : 'text-gray-900 font-medium'
                }`}
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
              >
                <option value="" disabled hidden>Kurs</option>
                {availableCourses.map(c => <option key={c} value={c} className="text-gray-900">{c}</option>)}
              </select>
            </div>

            {/* Xona */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Xona <span className="text-red-500">*</span></label>
              <select 
                className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#8b5cf6] transition-colors appearance-none cursor-pointer ${
                  !formData.room ? 'text-gray-400' : 'text-gray-900 font-medium'
                }`}
                value={formData.room}
                onChange={(e) => setFormData({...formData, room: e.target.value})}
              >
                <option value="" disabled hidden>Xona</option>
                {availableRooms.map(r => <option key={r} value={r} className="text-gray-900">{r}</option>)}
              </select>
            </div>

            {/* Davomiyligi */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Davomiyligi <span className="text-red-500">*</span></label>
              <select 
                className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#8b5cf6] transition-colors appearance-none cursor-pointer ${
                  !formData.duration ? 'text-gray-400' : 'text-gray-900 font-medium'
                }`}
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              >
                <option value="" disabled hidden>Davomiyligi</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                  <option key={m} value={`${m} oy`} className="text-gray-900">{m} oy</option>
                ))}
              </select>
            </div>

            {/* Dars kunlari */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Dars kunlari <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                {weekDays.map((day) => (
                  <label 
                    key={day} 
                    className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                      formData.days.includes(day) ? 'border-[#8b5cf6] bg-purple-50/30' : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#8b5cf6] focus:ring-[#8b5cf6]"
                      checked={formData.days.includes(day)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({...formData, days: [...formData.days, day]});
                        } else {
                          setFormData({...formData, days: formData.days.filter(d => d !== day)});
                        }
                      }}
                    />
                    <span className="text-[13px] font-bold text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dars vaqti */}
            <div className="space-y-1.5" ref={timePickerRef}>
              <label className="text-[13px] font-bold text-[#1e293b]">Dars vaqti <span className="text-red-500">*</span></label>
              <div className="relative">
                <div 
                  onClick={() => {
                    setIsTimePickerOpen(!isTimePickerOpen);
                    setIsDatePickerOpen(false);
                  }}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-medium flex items-center justify-between cursor-pointer hover:border-[#8b5cf6] transition-colors"
                >
                  <span className={!formData.time ? 'text-gray-400' : 'text-gray-900'}>
                    {formData.time || 'Vaqtni tanlang'}
                  </span>
                  <AccessTimeOutlined className="text-gray-400" sx={{ fontSize: 18 }} />
                </div>

                {isTimePickerOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[200px] bg-white border border-gray-100 rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="flex bg-[#f8fafc] border-b border-gray-100">
                      <div className="flex-1 p-2 text-center text-[11px] font-black text-gray-400 uppercase tracking-wider">Soat</div>
                      <div className="flex-1 p-2 text-center text-[11px] font-black text-gray-400 uppercase tracking-wider">Daqiqa</div>
                    </div>
                    <div className="flex h-[240px]">
                      {/* Hours */}
                      <div className="flex-1 overflow-y-auto no-scrollbar border-r border-gray-50">
                        {hours.map(h => (
                          <button
                            key={h}
                            onClick={() => {
                              const [_, m] = formData.time.split(':');
                              setFormData({...formData, time: `${h}:${m}`});
                            }}
                            className={`w-full py-2 text-[14px] transition-colors ${
                              formData.time.startsWith(h) ? 'bg-blue-500 text-white font-black' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                      {/* Minutes */}
                      <div className="flex-1 overflow-y-auto no-scrollbar">
                        {minutes.map(m => (
                          <button
                            key={m}
                            onClick={() => {
                              const [h, _] = formData.time.split(':');
                              setFormData({...formData, time: `${h}:${m}`});
                              setIsTimePickerOpen(false);
                            }}
                            className={`w-full py-2 text-[14px] transition-colors ${
                              formData.time.endsWith(m) ? 'bg-blue-500 text-white font-black' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Boshlanish sanasi */}
            <div className="space-y-1.5" ref={datePickerRef}>
              <label className="text-[13px] font-bold text-[#1e293b]">Boshlanish sanasi <span className="text-red-500">*</span></label>
              <div className="relative">
                <div 
                  onClick={() => {
                    setIsDatePickerOpen(!isDatePickerOpen);
                    setIsTimePickerOpen(false);
                  }}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-medium flex items-center justify-between cursor-pointer hover:border-[#8b5cf6] transition-colors"
                >
                  <span className={!formData.startDate ? 'text-gray-400' : 'text-gray-900'}>
                    {formData.startDate || 'Sanani tanlang'}
                  </span>
                  <CalendarMonthOutlined className="text-gray-400" sx={{ fontSize: 18 }} />
                </div>

                {isDatePickerOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[280px] bg-white border border-gray-100 rounded-2xl shadow-2xl z-[100] p-4 animate-in fade-in zoom-in duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
                        }}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVert sx={{ transform: 'rotate(90deg)', fontSize: 16 }} />
                      </button>
                      <span className="text-[14px] font-black text-gray-900">
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
                        }}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVert sx={{ transform: 'rotate(-90deg)', fontSize: 16 }} />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['D', 'S', 'C', 'P', 'J', 'S', 'Y'].map(d => (
                        <div key={d} className="text-center text-[10px] font-black text-gray-400 uppercase">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: (getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) + 6) % 7 }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = formData.startDate === `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                        return (
                          <button
                            key={day}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDateSelect(day);
                            }}
                            className={`h-8 w-8 rounded-lg text-[12px] font-bold transition-all ${
                              isSelected ? 'bg-[#8b5cf6] text-white' : 'text-gray-600 hover:bg-purple-50 hover:text-[#8b5cf6]'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tavsif */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Tavsif</label>
              <textarea 
                placeholder="Guruh haqida qo'shimcha ma'lumot (ixtiyoriy)"
                rows={3}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#8b5cf6] transition-colors resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* O'qituvchilar */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">O'qituvchilar</label>
              <div className="space-y-2">
                {formData.teachers.map(id => (
                  <div key={id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[13px] font-medium text-gray-700">
                      {allTeachers.find(t => t.id === id)?.name}
                    </span>
                    <button 
                      onClick={() => setFormData({...formData, teachers: formData.teachers.filter(tid => tid !== id)})}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Close sx={{ fontSize: 16 }} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setIsTeacherModalOpen(true)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-[#8b5cf6] font-bold text-[13px] hover:bg-gray-50 transition-colors"
                >
                  <Add fontSize="small" />
                  Qo'shish
                </button>
              </div>
            </div>

            {/* Talabalar */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Talabalar</label>
              <div className="space-y-2">
                {formData.students.map(id => (
                  <div key={id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[13px] font-medium text-gray-700">
                      {allStudents.find(s => s.id === id)?.name}
                    </span>
                    <button 
                      onClick={() => setFormData({...formData, students: formData.students.filter(sid => sid !== id)})}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Close sx={{ fontSize: 16 }} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setIsStudentModalOpen(true)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-[#8b5cf6] font-bold text-[13px] hover:bg-gray-50 transition-colors"
                >
                  <Add fontSize="small" />
                  Qo'shish
                </button>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-gray-50 flex items-center gap-3">
            <button 
              onClick={handleCloseDrawer}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Bekor qilish
            </button>
            <button 
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-[#8b5cf6] text-white rounded-xl text-[14px] font-bold hover:bg-[#7c3aed] transition-colors shadow-lg shadow-purple-100"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>

      {/* Selection Modals */}
      {(isStudentModalOpen || isTeacherModalOpen) && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => { setIsStudentModalOpen(false); setIsTeacherModalOpen(false); setSearchQuery(''); }}
          />
          <div className="relative w-full max-w-[500px] bg-white rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 flex items-center justify-between border-b border-gray-50">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {isStudentModalOpen ? 'Talaba qo\'shish' : 'O\'qituvchi qo\'shish'}
                </h2>
                <p className="text-[12px] text-gray-500">
                  Bitta yoki bir nechta {isStudentModalOpen ? 'talabani' : 'o\'qituvchini'} tanlang
                </p>
              </div>
              <button 
                onClick={() => { setIsStudentModalOpen(false); setIsTeacherModalOpen(false); setSearchQuery(''); }}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
              >
                <Close />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input 
                type="text"
                placeholder={isStudentModalOpen ? 'Talaba qidirish...' : 'O\'qituvchi qidirish...'}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[13px] focus:outline-none focus:border-[#8b5cf6] transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="max-h-[300px] overflow-y-auto no-scrollbar space-y-1">
                {(isStudentModalOpen ? allStudents : allTeachers)
                  .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(item => (
                    <label 
                      key={item.id} 
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group"
                    >
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#8b5cf6] focus:ring-[#8b5cf6]"
                        checked={formData[isStudentModalOpen ? 'students' : 'teachers'].includes(item.id)}
                        onChange={(e) => {
                          const key = isStudentModalOpen ? 'students' : 'teachers';
                          if (e.target.checked) {
                            setFormData({...formData, [key]: [...formData[key], item.id]});
                          } else {
                            setFormData({...formData, [key]: formData[key].filter(id => id !== item.id)});
                          }
                        }}
                      />
                      <span className="text-[14px] font-medium text-gray-700 group-hover:text-gray-900">{item.name}</span>
                    </label>
                  ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-50 flex items-center justify-end gap-3">
              <button 
                onClick={() => { setIsStudentModalOpen(false); setIsTeacherModalOpen(false); setSearchQuery(''); }}
                className="px-6 py-2.5 border border-gray-200 rounded-xl text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button 
                onClick={() => { setIsStudentModalOpen(false); setIsTeacherModalOpen(false); setSearchQuery(''); }}
                className="px-8 py-2.5 bg-[#8b5cf6] text-white rounded-xl text-[14px] font-bold hover:bg-[#7c3aed] transition-colors shadow-lg shadow-purple-100"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
