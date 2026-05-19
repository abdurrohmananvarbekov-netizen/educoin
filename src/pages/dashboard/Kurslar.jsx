import React, { useState } from 'react';
import { 
  Add, 
  DeleteOutlined, 
  EditOutlined,
  Search,
  Close,
  KeyboardArrowDown,
  PaymentsOutlined
} from '@mui/icons-material';

const initialCoursesData = [
  { id: 1, title: 'Human Resources Manager', description: 'A little about the company and the team that you\'ll be working with. A li...', duration: '90 min', period: '3 oy', price: '1 000 000 mln', color: 'bg-blue-50' },
  { id: 2, title: 'Human Resources Manager', description: 'A little about the company and the team that you\'ll be working with. A li...', duration: '90 min', period: '3 oy', price: '1 000 000 mln', color: 'bg-purple-50' },
  { id: 3, title: 'Human Resources Manager', description: 'A little about the company and the team that you\'ll be working with. A li...', duration: '90 min', period: '3 oy', price: '1 000 000 mln', color: 'bg-orange-50' },
  { id: 4, title: 'Human Resources Manager', description: 'A little about the company and the team that you\'ll be working with. A li...', duration: '90 min', period: '3 oy', price: '1 000 000 mln', color: 'bg-green-50' },
  { id: 5, title: 'Human Resources Manager', description: 'A little about the company and the team that you\'ll be working with. A li...', duration: '90 min', period: '3 oy', price: '1 000 000 mln', color: 'bg-indigo-50' },
  { id: 6, title: 'Human Resources Manager', description: 'A little about the company and the team that you\'ll be working with. A li...', duration: '90 min', period: '3 oy', price: '1 000 000 mln', color: 'bg-pink-50' },
];

const tabs = [
  'Kurslar', 'Xonalar', 'Hodimlar', 'Xabar yuborish'
];

export default function Kurslar({ setActiveMenu }) {
  const [activeTab, setActiveTab] = useState('Kurslar');
  const [courses, setCourses] = useState(initialCoursesData);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    duration: '',
    period: '',
    price: '',
    description: '',
    color: '#6d28d9'
  });

  const colorToBg = {
    '#334155': 'bg-slate-50',
    '#6d28d9': 'bg-purple-50',
    '#dc2626': 'bg-red-50',
    '#c2410c': 'bg-orange-50',
    '#059669': 'bg-green-50',
    '#0891b2': 'bg-cyan-50',
    '#2563eb': 'bg-blue-50',
    '#6366f1': 'bg-indigo-50',
    '#be185d': 'bg-pink-50'
  };

  const handleSaveCourse = () => {
    if (!newCourse.title || !newCourse.duration || !newCourse.period || !newCourse.price) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    if (editingCourseId) {
      setCourses(courses.map(c => c.id === editingCourseId ? { ...c, ...newCourse, color: colorToBg[newCourse.color] || 'bg-gray-50' } : c));
    } else {
      const courseToAdd = {
        id: Date.now(),
        ...newCourse,
        color: colorToBg[newCourse.color] || 'bg-gray-50'
      };
      setCourses([courseToAdd, ...courses]);
    }

    setIsAddDrawerOpen(false);
    setEditingCourseId(null);
    setNewCourse({
      title: '',
      duration: '',
      period: '',
      price: '',
      description: '',
      color: '#6d28d9'
    });
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm("Ushbu kursni o'chirishni xohlaysizmi?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleEditCourse = (course) => {
    const hexColor = Object.keys(colorToBg).find(key => colorToBg[key] === course.color) || '#6d28d9';
    setNewCourse({
      title: course.title,
      duration: course.duration,
      period: course.period,
      price: course.price,
      description: course.description,
      color: hexColor
    });
    setEditingCourseId(course.id);
    setIsAddDrawerOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Boshqarish</h1>
        <p className="text-[13px] text-gray-500 max-w-3xl">
          Ushbu sahifada siz sovg'alarni boshqarish imkoniyatiga ega bo'lasiz. Har bir sovg'a haqida batafsil ma'lumot va yangi sovg'a qo'shish imkoniyat bor.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="border-b border-gray-100">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'Kurslar') setActiveMenu('kurslar');
                if (tab === 'Xonalar') setActiveMenu('xonalar');
                if (tab === 'Hodimlar') setActiveMenu('hodimlar');
                if (tab === 'Xabar yuborish') setActiveMenu('xabar_yuborish');
              }}
              className={`pb-3 text-[13px] font-semibold whitespace-nowrap transition-all relative ${
                activeTab === tab ? 'text-[#6d28d9]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6d28d9] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        {/* Card Header */}
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-gray-900">Kurslar</h2>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsAddDrawerOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#6d28d9] text-white rounded-xl hover:bg-[#6d28d9] font-semibold text-[13px] transition-colors shadow-sm cursor-pointer z-10"
          >
            <Add fontSize="small" />
            Kurslar qo'shish
          </button>
        </div>

        {/* Courses Grid */}
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className={`${course.color} rounded-2xl p-5 border border-white shadow-sm flex flex-col justify-between h-[150px] relative group hover:shadow-md transition-shadow`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[14px] font-bold text-gray-800 line-clamp-1">{course.title}</h3>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <DeleteOutlined sx={{ fontSize: 18 }} />
                      </button>
                      <button 
                        onClick={() => handleEditCourse(course)}
                        className="p-1.5 text-gray-400 hover:text-[#6d28d9] transition-colors"
                      >
                        <EditOutlined sx={{ fontSize: 18 }} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <span className="px-2 py-1 bg-white/60 rounded-md text-[11px] font-bold text-gray-600">{course.duration}</span>
                  <span className="px-2 py-1 bg-white/60 rounded-md text-[11px] font-bold text-gray-600">{course.period}</span>
                  <span className="px-2 py-1 bg-white/60 rounded-md text-[11px] font-bold text-gray-600">{course.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Course Drawer */}
      <div 
        className={`fixed inset-0 z-[999] flex transition-opacity duration-300 ${
          isAddDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/30 transition-opacity duration-300" 
          onClick={() => setIsAddDrawerOpen(false)}
        />
        <div 
          className={`absolute right-0 top-0 h-full w-[400px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
            isAddDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 flex items-center justify-between border-b border-gray-50">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900">
                {editingCourseId ? 'Kursni tahrirlash' : 'Kurs qo\'shish'}
              </h2>
              <p className="text-[13px] text-gray-500">
                Bu yerda siz {editingCourseId ? 'kurs ma\'lumotlarini o\'zgartirishingiz' : 'yangi Kurs qo\'shishingiz'} mumkin.
              </p>
            </div>
            <button 
              onClick={() => {
                setIsAddDrawerOpen(false);
                setEditingCourseId(null);
                setNewCourse({ title: '', duration: '', period: '', price: '', description: '', color: '#6d28d9' });
              }}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
            >
              <Close />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-gray-900">Nomi</label>
              <input 
                type="text"
                placeholder="HR Manager..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#6d28d9] transition-colors"
                value={newCourse.title}
                onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
              />
            </div>

            {/* Duration Min */}
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-gray-900">Dars davomiyligi</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] appearance-none focus:outline-none focus:border-[#6d28d9] transition-colors text-gray-500"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                >
                  <option value="">Tanlang</option>
                  <option value="60 min">60 min</option>
                  <option value="90 min">90 min</option>
                  <option value="120 min">120 min</option>
                </select>
                <KeyboardArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Duration Months */}
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-gray-900">Kurs davomiyligi (oylarda)</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] appearance-none focus:outline-none focus:border-[#6d28d9] transition-colors text-gray-500"
                  value={newCourse.period}
                  onChange={(e) => setNewCourse({...newCourse, period: e.target.value})}
                >
                  <option value="">Tanlang</option>
                  <option value="1 oy">1 oy</option>
                  <option value="2 oy">2 oy</option>
                  <option value="3 oy">3 oy</option>
                  <option value="6 oy">6 oy</option>
                </select>
                <KeyboardArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-gray-900">Narx</label>
              <div className="relative">
                <PaymentsOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 20 }} />
                <input 
                  type="text"
                  placeholder="Narxini kiriting"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#6d28d9] transition-colors"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-gray-900">Description</label>
              <textarea 
                rows="4"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#6d28d9] transition-colors resize-none"
                placeholder="A little about the company and the team that you'll be working with."
                value={newCourse.description}
                onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
              />
              <p className="text-[12px] text-gray-400">This is a hint text to help user.</p>
            </div>

            {/* Color */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[14px] font-bold text-gray-900">Rangi</label>
                <p className="text-[12px] text-gray-400">The color you choose will be displayed to users and in the list of roles.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.keys(colorToBg).map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewCourse({...newCourse, color})}
                    className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                      newCourse.color === color ? 'ring-2 ring-offset-2 ring-[#6d28d9] scale-110' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-gray-100 flex items-center gap-3">
            <button 
              onClick={() => setIsAddDrawerOpen(false)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Bekor qilish
            </button>
            <button 
              onClick={handleSaveCourse}
              className="flex-1 px-4 py-3 bg-[#6d28d9] text-white rounded-xl text-[14px] font-bold hover:bg-[#6d28d9] transition-colors shadow-lg shadow-purple-100"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

