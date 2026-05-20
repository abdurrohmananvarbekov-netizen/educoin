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
  CalendarMonthOutlined,
  ChevronLeft,
  BarChart,
  CheckCircle
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
    students: 5 
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
  
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [detailTab, setDetailTab] = useState('malumotlar');
  const [isMentorsExpanded, setIsMentorsExpanded] = useState(false);
  const [isParamsExpanded, setIsParamsExpanded] = useState(false);
  
  const [scheduleSessions, setScheduleSessions] = useState([
    { id: 1, day: 2, month: 'May', passed: true },
    { id: 2, day: 5, month: 'May', passed: true },
    { id: 3, day: 7, month: 'May', passed: true },
    { id: 4, day: 9, month: 'May', passed: true },
    { id: 5, day: 12, month: 'May', passed: true },
    { id: 6, day: 14, month: 'May', passed: true },
    { id: 7, day: 16, month: 'May', passed: true },
    { id: 8, day: 19, month: 'May', passed: false },
    { id: 9, day: 21, month: 'May', passed: false },
    { id: 10, day: 23, month: 'May', passed: false },
    { id: 11, day: 26, month: 'May', passed: false },
    { id: 12, day: 28, month: 'May', passed: false },
    { id: 13, day: 30, month: 'May', passed: false },
  ]);

  const toggleSessionPassed = (id) => {
    setScheduleSessions(prev =>
      prev.map(s => s.id === id ? { ...s, passed: !s.passed } : s)
    );
  };

  const [darsliklarTab, setDarsliklarTab] = useState('vazifa');
  const [isCreateHomeworkOpen, setIsCreateHomeworkOpen] = useState(false);
  const [newHwTopic, setNewHwTopic] = useState('');
  const [newHwDesc, setNewHwDesc] = useState('');
  const [newHwFile, setNewHwFile] = useState(null);

  const [homeworks, setHomeworks] = useState([
    {
      id: 1,
      topic: 'Html asoslari',
      studentsCount: 5,
      pendingCount: 0,
      checkedCount: 0,
      givenTime: '13 May, 2026 10:00',
      endTime: '14 May, 2026 06:00',
      lessonDate: '12 May, 2026'
    },
    {
      id: 2,
      topic: 'Kirish',
      studentsCount: 5,
      pendingCount: 0,
      checkedCount: 0,
      givenTime: '13 May, 2026 11:52',
      endTime: '14 May, 2026 07:52',
      lessonDate: '9 May, 2026'
    },
    {
      id: 3,
      topic: 'Nodejs',
      studentsCount: 5,
      pendingCount: 0,
      checkedCount: 3,
      givenTime: '14 May, 2026 09:47',
      endTime: '15 May, 2026 05:47',
      lessonDate: '14 May, 2026'
    },
    {
      id: 4,
      topic: 'takrorlash',
      studentsCount: 5,
      pendingCount: 0,
      checkedCount: 0,
      givenTime: '19 May, 2026 16:22',
      endTime: '20 May, 2026 12:22',
      lessonDate: '19 May, 2026'
    }
  ]);

  const handleCreateHomework = (e) => {
    e.preventDefault();
    if (!newHwTopic) return;
    
    // Create random or current dates for givenTime/endTime
    const now = new Date();
    const formatTime = (date) => {
      const day = date.getDate();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day} ${month}, ${year} ${hours}:${minutes}`;
    };

    const formatDateOnly = (date) => {
      const day = date.getDate();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    };

    const newHw = {
      id: Date.now(),
      topic: newHwTopic,
      studentsCount: 5,
      pendingCount: 0,
      checkedCount: 0,
      givenTime: formatTime(now),
      endTime: formatTime(new Date(now.getTime() + 24 * 60 * 60 * 1000)), // tomorrow
      lessonDate: formatDateOnly(now)
    };
    
    setHomeworks([newHw, ...homeworks]);
    setIsCreateHomeworkOpen(false);
    // Reset form
    setNewHwTopic('');
    setNewHwDesc('');
    setNewHwFile(null);
  };
  
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

  if (selectedGroupId) {
    const group = groups.find(g => g.id === selectedGroupId);
    if (group) {
      const durationVal = parseFloat(group.duration) || 6.0;
      const durationFormatted = durationVal.toFixed(1);

      if (isCreateHomeworkOpen) {
        return (
          <div className="px-6 py-4 space-y-6">
            <div className="bg-white border border-slate-100 rounded-[24px] shadow-sm p-6 pb-8 space-y-4">
              {/* Back Button and Title */}
              <div className="flex items-center gap-1 select-none">
                <ChevronLeft 
                  onClick={() => setIsCreateHomeworkOpen(false)}
                  className="cursor-pointer text-gray-900 hover:text-[#6d28d9] transition-colors -ml-1"
                  sx={{ fontSize: 24, stroke: "currentColor", strokeWidth: 1.5 }}
                />
                <h1 className="text-[20px] font-bold text-gray-900 leading-none">Yangi uyga vazifa yaratish</h1>
              </div>

              <form onSubmit={handleCreateHomework} className="space-y-5 pt-1">
                {/* Topic Select */}
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-900 flex items-center gap-1">
                    <span className="text-red-500">*</span> Mavzu
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={newHwTopic}
                      onChange={(e) => setNewHwTopic(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[13px] font-bold text-gray-900 focus:outline-none focus:border-[#6d28d9] focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="text-gray-400">Mavzulardan birini tanlang</option>
                      <option value="Html asoslari">Html asoslari</option>
                      <option value="CSS grid va Flexbox">CSS grid va Flexbox</option>
                      <option value="JavaScript asoslari">JavaScript asoslari</option>
                      <option value="Nodejs">Nodejs</option>
                      <option value="React Hooks">React Hooks</option>
                      <option value="takrorlash">takrorlash</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronLeft sx={{ fontSize: 16, transform: 'rotate(-90deg)' }} />
                    </div>
                  </div>
                </div>

                {/* Description Editor Preview */}
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-900 flex items-center gap-1">
                    <span className="text-red-500">*</span> Izoh
                  </label>
                  
                  {/* Rich text simulator toolbar */}
                  <div className="border border-gray-200 rounded-2xl overflow-hidden focus-within:border-[#6d28d9] focus-within:ring-1 focus-within:ring-[#6d28d9] transition-all bg-white">
                    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/50 text-gray-500 text-[12px] font-bold">
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">H1</button>
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">H2</button>
                      <div className="h-4 w-px bg-gray-200 mx-1" />
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded flex items-center gap-0.5">Sans Serif <ChevronLeft sx={{ fontSize: 10, transform: 'rotate(-90deg)' }} /></button>
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded flex items-center gap-0.5">Normal <ChevronLeft sx={{ fontSize: 10, transform: 'rotate(-90deg)' }} /></button>
                      <div className="h-4 w-px bg-gray-200 mx-1" />
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded font-black text-gray-700">B</button>
                      <button type="button" className="px-2.5 py-1 hover:bg-gray-100 rounded italic text-gray-700">I</button>
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded underline text-gray-700">U</button>
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded line-through text-gray-700">S</button>
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded text-gray-700">”</button>
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded text-gray-700">&lt;&gt;</button>
                      <div className="h-4 w-px bg-gray-200 mx-1" />
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">≡</button>
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">≏</button>
                      <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded">🔗</button>
                    </div>
                    <textarea
                      required
                      value={newHwDesc}
                      onChange={(e) => setNewHwDesc(e.target.value)}
                      className="w-full px-4 py-3 min-h-[150px] text-[13px] font-medium text-gray-800 placeholder-gray-400 focus:outline-none resize-none"
                      placeholder="Vazifa haqida batafsil ma'lumot kiriting..."
                    />
                  </div>
                </div>

                {/* File Upload Box */}
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-900">Fayl biriktirish</label>
                  <label className="border-2 border-dashed border-gray-200 hover:border-[#6d28d9] rounded-[20px] bg-gray-50/30 hover:bg-purple-50/5 p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setNewHwFile(e.target.files[0]);
                        }
                      }}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-[13px] font-bold text-gray-600">
                      {newHwFile ? newHwFile.name : "Faylni tanlash yoki shu yerga tashlang"}
                    </span>
                  </label>
                </div>

                {/* Bottom Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCreateHomeworkOpen(false)}
                    className="px-6 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-[13px] font-bold transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-[13px] font-bold transition-colors shadow-sm"
                  >
                    E'lon qilish
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }

      return (
        <div className="px-6 py-4 space-y-6">
          {/* Detail Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedGroupId(null)}
                className="p-1 hover:bg-gray-150 rounded-lg text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-center"
              >
                <ChevronLeft sx={{ fontSize: 24 }} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                Bootcamp Full Stack {group.name}
                <span className="px-2.5 py-0.5 bg-green-50 text-green-600 rounded-md text-[11px] font-bold capitalize">
                  {group.status ? 'Aktiv' : 'Nofaol'}
                </span>
              </h1>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-bold text-[13px] transition-colors shadow-sm">
              <BarChart sx={{ fontSize: 18 }} className="text-gray-500" />
              Statistika
            </button>
          </div>

          {/* Detail Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-8 -mb-[1px]">
              {[
                { id: 'malumotlar', label: "Ma'lumotlar" },
                { id: 'darsliklar', label: 'Guruh darsliklari' },
                { id: 'davomat', label: 'Akademik davomati' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDetailTab(tab.id)}
                  className={`pb-4 text-[14px] font-bold transition-all relative ${
                    detailTab === tab.id 
                      ? 'text-[#6d28d9]' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                  {detailTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6d28d9] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs Content */}
          {detailTab === 'malumotlar' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Guruh mentorlari Card */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all duration-300">
                  <div 
                    onClick={() => setIsMentorsExpanded(!isMentorsExpanded)}
                    className="bg-[#3b82f6] px-5 py-3.5 flex items-center justify-between text-white font-bold text-[14px] cursor-pointer select-none"
                  >
                    <span>Guruh mentorlari</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMentorsExpanded(!isMentorsExpanded);
                      }}
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white flex items-center justify-center"
                    >
                      {isMentorsExpanded ? <Close sx={{ fontSize: 16 }} /> : <Add sx={{ fontSize: 16 }} />}
                    </button>
                  </div>
                  <div className={`transition-all duration-300 overflow-hidden ${isMentorsExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <div className="p-6 flex flex-col items-start gap-4">
                      <div className="flex flex-col items-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100 w-[140px] text-center">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
                          alt={group.teacher} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm mb-2"
                        />
                        <span className="text-[11px] font-bold text-green-500 mb-1">Teacher</span>
                        <span className="text-[14px] font-bold text-gray-900">{group.teacher}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parametrlar Card */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all duration-300">
                  <div 
                    onClick={() => setIsParamsExpanded(!isParamsExpanded)}
                    className="bg-[#3b82f6] px-5 py-3.5 flex items-center justify-between text-white font-bold text-[14px] cursor-pointer select-none"
                  >
                    <span>Parametrlar</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsParamsExpanded(!isParamsExpanded);
                      }}
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white flex items-center justify-center"
                    >
                      {isParamsExpanded ? <Close sx={{ fontSize: 16 }} /> : <Add sx={{ fontSize: 16 }} />}
                    </button>
                  </div>
                  <div className={`transition-all duration-300 overflow-hidden ${isParamsExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <div className="p-6 divide-y divide-gray-100">
                      <div className="flex items-center justify-between py-3">
                        <span className="text-[13px] font-medium text-gray-500">Kurs:</span>
                        <span className="text-[13px] font-bold text-gray-900">{group.course}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-[13px] font-medium text-gray-500">O'rta yosh:</span>
                        <span className="text-[13px] font-bold text-gray-900">21</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-[13px] font-medium text-gray-500">O'quvchilar sig'imi:</span>
                        <span className="text-[13px] font-bold text-gray-900">20</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-[13px] font-medium text-gray-500">Mavjud o'quvchilar:</span>
                        <span className="text-[13px] font-bold text-gray-900">{group.students}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-[13px] font-medium text-gray-500">O'quv oyidagi darslar soni:</span>
                        <span className="text-[13px] font-bold text-gray-900">20</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-[13px] font-medium text-gray-500">Kurs davomiyligi (oy):</span>
                        <span className="text-[13px] font-bold text-gray-900">{durationFormatted}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-[13px] font-medium text-gray-500">Jami darslar soni:</span>
                        <span className="text-[13px] font-bold text-gray-900">20</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dars jadvali Card */}
              <div className="bg-white border border-slate-100 rounded-[20px] shadow-sm p-6 space-y-6">
                <h3 className="text-base font-bold text-gray-955">Dars jadvali</h3>

                {/* Schedule Rows */}
                <div className="space-y-3">
                  {/* Row 1 */}
                  <div className="bg-slate-50/50 hover:bg-slate-50/80 border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors">
                    <div className="w-full md:w-1/5 text-[#3b82f6] hover:underline cursor-pointer font-bold text-[14px]">
                      {group.teacher}
                    </div>
                    <div className="w-full md:w-1/5 text-[13px] font-bold text-gray-600">
                      {group.days ? group.days.replace(/Dushanba/g, 'Du').replace(/Seshanba/g, 'Se').replace(/Chorshanba/g, 'Ch').replace(/Payshanba/g, 'Pa').replace(/Juma/g, 'Ju').replace(/Shanba/g, 'Sh').replace(/, /g, '/') : 'Du/Se/Ch/Pa/Ju'}
                    </div>
                    <div className="w-full md:w-1/5 text-[13px] font-bold text-gray-600">
                      {group.time ? `${group.time} dan - ${(parseInt(group.time.split(':')[0]) + 3).toString().padStart(2, '0')}:${group.time.split(':')[1]} gacha` : '09:30 dan - 12:30 gacha'}
                    </div>
                    <div className="w-full md:w-1/5 text-[13px] font-medium text-gray-400">
                      15 Yan, 2026 - 27 Iyun, 2026
                    </div>
                    <div className="w-full md:w-1/5 text-[13px] font-bold text-gray-600 text-right md:text-left">
                      F2 {group.room} // 18
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="bg-slate-50/50 hover:bg-slate-50/80 border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors">
                    <div className="w-full md:w-1/5 text-[#3b82f6] hover:underline cursor-pointer font-bold text-[14px]">
                      +++Yusupova Barchinoy
                    </div>
                    <div className="w-full md:w-1/5 text-[13px] font-bold text-gray-600">
                      {group.days ? group.days.replace(/Dushanba/g, 'Du').replace(/Seshanba/g, 'Se').replace(/Chorshanba/g, 'Ch').replace(/Payshanba/g, 'Pa').replace(/Juma/g, 'Ju').replace(/Shanba/g, 'Sh').replace(/, /g, '/') : 'Du/Se/Ch/Pa/Ju'}
                    </div>
                    <div className="w-full md:w-1/5 text-[13px] font-bold text-gray-600">
                      08:00 dan - 09:30 gacha
                    </div>
                    <div className="w-full md:w-1/5 text-[13px] font-medium text-gray-400">
                      15 Yan, 2026 - 27 Iyun, 2026
                    </div>
                    <div className="w-full md:w-1/5 text-[13px] font-bold text-gray-600 text-right md:text-left">
                      F2 {group.room} // 18
                    </div>
                  </div>
                </div>

                {/* Show More Button */}
                <div className="flex justify-center">
                  <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-[13px] font-bold transition-colors">
                    Yana ko'rsatish (9)
                  </button>
                </div>

                {/* Month Selector */}
                <div className="flex items-center justify-center gap-4 py-2">
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                    <ChevronLeft sx={{ fontSize: 16 }} />
                  </button>
                  <span className="text-[14px] font-black text-gray-900">1-o'quv oyi</span>
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                    <ChevronLeft sx={{ fontSize: 16, transform: 'rotate(180deg)' }} />
                  </button>
                </div>

                {/* Session Dates Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-13 gap-2.5">
                  {scheduleSessions.map((session) => (
                    <div 
                      key={session.id}
                      onClick={() => toggleSessionPassed(session.id)}
                      className={`flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl border text-center cursor-pointer transition-all ${
                        session.passed 
                          ? 'bg-[#e2e8f0]/60 border-transparent text-gray-500 hover:bg-[#e2e8f0]/80' 
                          : 'bg-white border-gray-200 text-gray-800 hover:border-[#6d28d9]/50 hover:bg-purple-50/10'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">{session.month}</span>
                      <span className="text-[15px] font-black">{session.day}</span>
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center pt-2">
                  <button className="px-6 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-[13px] font-bold transition-colors">
                    Barchasini ko'rish
                  </button>
                </div>
              </div>
            </div>
          )}

          {detailTab === 'darsliklar' && (
            <div className="space-y-6">
              {/* Header inside Tab */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <h2 className="text-lg font-bold text-gray-900">Guruh darsliklari</h2>
                  
                  {/* Pills Selector */}
                  <div className="bg-gray-100/60 p-1 rounded-xl flex gap-1 text-[13px] font-bold text-gray-500 w-fit">
                    {[
                      { id: 'vazifa', label: 'Uyga vazifa' },
                      { id: 'videolar', label: 'Videolar' },
                      { id: 'imtihonlar', label: 'Imtihonlar' },
                      { id: 'jurnal', label: 'Jurnal' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setDarsliklarTab(tab.id)}
                        className={`px-4 py-1.5 transition-all select-none ${
                          darsliklarTab === tab.id
                            ? 'bg-white shadow-sm text-gray-900 rounded-lg'
                            : 'hover:text-gray-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add Button */}
                {darsliklarTab === 'vazifa' && (
                  <button 
                    onClick={() => setIsCreateHomeworkOpen(true)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl font-bold text-[13px] transition-colors shadow-sm w-fit"
                  >
                    <Add sx={{ fontSize: 16 }} />
                    Qo'shish
                  </button>
                )}
              </div>

              {/* Table Container */}
              {darsliklarTab === 'vazifa' && (
                <div className="bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden transition-all">
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-50">
                          <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider w-16 text-center">#</th>
                          <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider">Mavzu</th>
                          <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider text-center w-24">
                            <div className="flex items-center justify-center">
                              <PersonOutlined sx={{ fontSize: 18 }} className="text-gray-400" />
                            </div>
                          </th>
                          <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider text-center w-24">
                            <div className="flex items-center justify-center">
                              <AccessTimeOutlined sx={{ fontSize: 18 }} className="text-orange-400" />
                            </div>
                          </th>
                          <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider text-center w-24">
                            <div className="flex items-center justify-center">
                              <CheckCircle sx={{ fontSize: 18 }} className="text-green-500" />
                            </div>
                          </th>
                          <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider">Berilgan vaqt</th>
                          <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider">Tugash vaqt</th>
                          <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider">Dars sanasi</th>
                          <th className="px-6 py-4 text-right w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {homeworks.map((hw, index) => (
                          <tr key={hw.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-gray-500 text-center">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-gray-900">
                              {hw.topic}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-gray-600 text-center">
                              {hw.studentsCount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-gray-600 text-center">
                              {hw.pendingCount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-gray-600 text-center">
                              {hw.checkedCount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[13px] font-medium text-gray-400">
                              {hw.givenTime}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[13px] font-medium text-gray-400">
                              {hw.endTime}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-gray-600">
                              {hw.lessonDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400">
                              <MoreVert className="cursor-pointer hover:text-gray-600 transition-colors" sx={{ fontSize: 18 }} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Other Tabs content placeholder */}
              {darsliklarTab === 'videolar' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { title: 'HTML va CSS asoslari', duration: '25:40', date: '12 May, 2026' },
                    { title: 'Node.js kirish & Express.js', duration: '40:15', date: '14 May, 2026' },
                    { title: 'MongoDB & Mongoose integratsiyasi', duration: '35:50', date: '19 May, 2026' }
                  ].map((video, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group cursor-pointer">
                      <div className="relative aspect-video bg-slate-900 flex items-center justify-center text-white overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-[#3b82f6]/40 group-hover:scale-105 transition-transform duration-300" />
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#3b82f6] group-hover:scale-110 transition-all shadow-lg z-10">
                          <span className="ml-1 text-white border-y-8 border-y-transparent border-l-[12px] border-l-white" />
                        </div>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="text-[13px] font-bold text-gray-900 group-hover:text-[#3b82f6] transition-colors">{video.title}</h4>
                        <p className="text-[11px] text-gray-400 font-medium">{video.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {darsliklarTab === 'imtihonlar' && (
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 divide-y divide-gray-100">
                  {[
                    { name: 'NodeJS & ExpressJS yozma imtihon', status: 'Yakunlangan', score: '85/100', date: '15 May, 2026' },
                    { name: 'HTML/CSS responsive UI imtihon', status: 'Yakunlangan', score: '92/100', date: '10 May, 2026' }
                  ].map((exam, idx) => (
                    <div key={idx} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <div className="space-y-1">
                        <h4 className="text-[14px] font-bold text-gray-900">{exam.name}</h4>
                        <p className="text-[11px] text-gray-400 font-medium">Sana: {exam.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-2.5 py-0.5 bg-green-50 text-green-600 rounded-md text-[11px] font-bold">
                          {exam.status}
                        </span>
                        <span className="text-[13px] font-bold text-gray-900">{exam.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {darsliklarTab === 'jurnal' && (
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-50">
                        <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider">Talaba ismi</th>
                        <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider text-center">Dars 1</th>
                        <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider text-center">Dars 2</th>
                        <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider text-center">Dars 3</th>
                        <th className="px-6 py-4 text-[13px] font-black text-gray-400 uppercase tracking-wider text-center">O'rtacha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-[13px] font-bold text-gray-700">
                      {[
                        { name: 'Abdurrohman Anvarbekov', g1: 90, g2: 95, g3: 85 },
                        { name: 'Davron Rustamov', g1: 85, g2: 88, g3: 90 },
                        { name: 'Madina Shadiyeva', g1: 92, g2: 90, g3: 94 }
                      ].map((student, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-gray-900">{student.name}</td>
                          <td className="px-6 py-4 text-center text-green-600">{student.g1}</td>
                          <td className="px-6 py-4 text-center text-green-600">{student.g2}</td>
                          <td className="px-6 py-4 text-center text-green-600">{student.g3}</td>
                          <td className="px-6 py-4 text-center text-purple-600">
                            {Math.round((student.g1 + student.g2 + student.g3) / 3)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {detailTab === 'davomat' && (
            <div className="bg-white p-6 border border-gray-100 rounded-2xl text-center text-gray-400">
              Akademik davomat ma'lumotlari hozircha mavjud emas.
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="px-6 py-4 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Guruhlar</h1>
        <button 
          onClick={() => setIsAddDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#6d28d9] text-white rounded-xl hover:bg-[#6d28d9] font-semibold text-[13px] transition-colors shadow-sm"
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
            activeTab === 'guruhlar' ? 'bg-white text-[#6d28d9] shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Guruhlar
        </button>
        <button 
          onClick={() => setActiveTab('arxiv')}
          className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 ${
            activeTab === 'arxiv' ? 'bg-white text-[#6d28d9] shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-gray-100'
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
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-[#6d28d9]">
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
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#6d28d9' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#6d28d9' },
                        }}
                      />
                      <span className={`text-[10px] font-black uppercase tracking-wider ${group.status ? 'text-green-500' : 'text-gray-400'}`}>
                        {group.status ? 'FAOL' : 'NOFAOL'}
                      </span>
                    </div>
                  </td>
                  <td 
                    className="px-6 py-4 text-[13px] font-black text-gray-900 hover:text-[#6d28d9] cursor-pointer hover:underline transition-colors"
                    onClick={() => {
                      setSelectedGroupId(group.id);
                      setDetailTab('malumotlar');
                      setIsMentorsExpanded(false);
                      setIsParamsExpanded(false);
                    }}
                  >
                    {group.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-purple-50 text-[#6d28d9] rounded-lg text-[11px] font-bold">
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
          className="absolute inset-0 bg-black/30 transition-opacity duration-300" 
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
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Kurs */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Kurs <span className="text-red-500">*</span></label>
              <select 
                className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors appearance-none cursor-pointer ${
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
                className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors appearance-none cursor-pointer ${
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
                className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors appearance-none cursor-pointer ${
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
                      formData.days.includes(day) ? 'border-[#6d28d9] bg-purple-50/30' : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#6d28d9] focus:ring-[#6d28d9]"
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
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-medium flex items-center justify-between cursor-pointer hover:border-[#6d28d9] transition-colors"
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
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-medium flex items-center justify-between cursor-pointer hover:border-[#6d28d9] transition-colors"
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
                              isSelected ? 'bg-[#6d28d9] text-white' : 'text-gray-600 hover:bg-purple-50 hover:text-[#6d28d9]'
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
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors resize-none"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-[#6d28d9] font-bold text-[13px] hover:bg-gray-50 transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-[#6d28d9] font-bold text-[13px] hover:bg-gray-50 transition-colors"
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
              className="flex-1 px-4 py-3 bg-[#6d28d9] text-white rounded-xl text-[14px] font-bold hover:bg-[#6d28d9] transition-colors shadow-lg shadow-purple-100"
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
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors"
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
                        className="w-4 h-4 rounded border-gray-300 text-[#6d28d9] focus:ring-[#6d28d9]"
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
                className="px-8 py-2.5 bg-[#6d28d9] text-white rounded-xl text-[14px] font-bold hover:bg-[#6d28d9] transition-colors shadow-lg shadow-purple-100"
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

