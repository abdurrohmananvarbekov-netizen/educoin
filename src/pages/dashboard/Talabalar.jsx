import React, { useState } from 'react';
import { 
  Add, 
  DeleteOutlined, 
  EditOutlined,
  VisibilityOutlined,
  Search,
  FilterAltOutlined,
  ArchiveOutlined,
  ChevronLeft,
  ChevronRight,
  Close,
  KeyboardArrowDown,
  FileUploadOutlined
} from '@mui/icons-material';

const initialStudents = [
  { id: 1, name: 'Ali Valiyev', group: ['N26', 'n105'], phone: '+998976541223', email: 'ali@gmail.com', birthDate: '12.12.2010', address: 'Sirdaryo', createdDate: '12.05.2026' },
  { id: 2, name: 'Salim Qodirov', group: ['n105'], phone: '+998977777777', email: 'salim@gmail.com', birthDate: '14.01.2007', address: 'Buxoro', createdDate: '14.05.2026' },
  { id: 3, name: 'Bobur', group: ['n105'], phone: '+9989899999999', email: 'bobur@gmail.com', birthDate: '14.03.2002', address: 'Toshkent', createdDate: '14.05.2026' },
  { id: 4, name: 'Qodir Salimov', group: ['n105'], phone: '+998911111111', email: 'qodir@gmail.com', birthDate: '29.04.2026', address: "O'zbekcha", createdDate: '14.05.2026' },
];

export default function Talabalar() {
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    group: '',
    phone: '+998',
    email: '',
    birthDate: '',
    address: 'Toshkent sh.',
    password: '',
    avatar: ''
  });

  const availableGroups = ['N26', 'n105'];
  const regions = [
    'Toshkent sh.', 'Toshkent vil.', 'Sirdaryo', 'Jizzax', 'Samarqand', 
    'Farg\'ona', 'Namangan', 'Andijon', 'Qashqadaryo', 'Surxondaryo', 
    'Buxoro', 'Navoiy', 'Xorazm', 'Qoraqalpog\'iston Res.'
  ];
  const [groupSearch, setGroupSearch] = useState('');
  const [selectedGroupsForModal, setSelectedGroupsForModal] = useState([]);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteStudent = (id) => {
    if (window.confirm("Ushbu talabani o'chirishni xohlaysizmi?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleEditStudent = (student) => {
    setFormData({
      name: student.name,
      group: student.group.join(', '),
      phone: student.phone,
      email: student.email,
      birthDate: student.birthDate,
      address: student.address,
      avatar: student.avatar || '',
      password: ''
    });
    setEditingStudentId(student.id);
    setIsAddDrawerOpen(true);
  };

  const handleSaveStudent = () => {
    if (!formData.name || !formData.phone) {
      alert("Iltimos, ism va telefonni kiriting!");
      return;
    }

    const studentData = {
      ...formData,
      group: formData.group.split(',').map(g => g.trim()).filter(g => g !== '')
    };

    if (editingStudentId) {
      setStudents(students.map(s => s.id === editingStudentId ? { ...s, ...studentData } : s));
    } else {
      const newStudent = {
        id: Date.now(),
        ...studentData,
        createdDate: new Date().toLocaleDateString('uz-UZ')
      };
      setStudents([newStudent, ...students]);
    }

    setIsAddDrawerOpen(false);
    setEditingStudentId(null);
    setFormData({ name: '', group: '', phone: '+998', email: '', birthDate: '', address: 'Toshkent sh.', password: '', avatar: '' });
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const toggleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(sid => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  return (
    <div className="px-6 py-4 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Talabalar</h1>
          <p className="text-[13px] text-gray-500 max-w-3xl">
            Ushbu sahifada siz Talabalar ro'yxatini va ularning ma'lumotlarini topasiz. Har bir Talaba ismi, fanlari va aloqa ma'lumotlari keltirilgan.
          </p>
        </div>
        <button 
          onClick={() => setIsAddDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#6d28d9] text-white rounded-xl hover:bg-[#6d28d9] font-semibold text-[13px] transition-colors shadow-sm"
        >
          <Add fontSize="small" />
          Talaba qo'shish
        </button>
      </div>

      {/* Content Table Container */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 flex items-center justify-between border-b border-gray-50">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 20 }} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <FilterAltOutlined sx={{ fontSize: 18 }} />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <ArchiveOutlined sx={{ fontSize: 18 }} />
              Arxiv
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4 w-10 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-[#6d28d9] focus:ring-[#6d28d9]"
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-4">F.I.Sh &darr;</th>
                <th className="px-4 py-4 text-center">Guruh</th>
                <th className="px-4 py-4">Telefon raqamlari</th>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Tug'ilgan sanasi</th>
                <th className="px-4 py-4">Manzil</th>
                <th className="px-4 py-4">Yaratilgan sana</th>
                <th className="px-4 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#6d28d9] focus:ring-[#6d28d9]"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => toggleSelectStudent(student.id)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {student.avatar ? (
                        <img src={student.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[#6d28d9] font-bold text-[12px]">
                          {student.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-[13px] font-bold text-gray-700">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {student.group.map((g, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded-md text-[10px] font-bold text-gray-500 uppercase">
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-gray-600">{student.phone}</td>
                  <td className="px-4 py-4 text-[13px] text-gray-600">{student.email}</td>
                  <td className="px-4 py-4 text-[13px] text-gray-600">{student.birthDate}</td>
                  <td className="px-4 py-4 text-[13px] text-gray-600">{student.address}</td>
                  <td className="px-4 py-4 text-[13px] text-gray-600">{student.createdDate}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors">
                        <VisibilityOutlined sx={{ fontSize: 18 }} />
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <DeleteOutlined sx={{ fontSize: 18 }} />
                      </button>
                      <button 
                        onClick={() => handleEditStudent(student)}
                        className="p-1.5 text-gray-400 hover:text-[#6d28d9] transition-colors"
                      >
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
        <div className="p-4 flex items-center justify-between border-t border-gray-50">
          <button className="px-4 py-2 border border-gray-100 rounded-xl text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            &larr; Previous
          </button>
          <div className="flex items-center gap-1">
            {[1, 2, 3, '...', 8, 9, 10].map((page, idx) => (
              <button 
                key={idx}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-bold transition-all ${
                  page === 1 ? 'bg-purple-50 text-[#6d28d9]' : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 border border-gray-100 rounded-xl text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            Next &rarr;
          </button>
        </div>
      </div>

      {/* Add Student Drawer */}
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
          {/* Drawer Header */}
          <div className="p-6 flex items-center justify-between border-b border-gray-50">
            <h2 className="text-xl font-bold text-gray-900">
              {editingStudentId ? 'Talabani tahrirlash' : 'Talaba qo\'shish'}
            </h2>
            <button 
              onClick={() => {
                setIsAddDrawerOpen(false);
                setEditingStudentId(null);
                setFormData({ name: '', group: '', phone: '+998', email: '', birthDate: '', address: '', password: '' });
              }}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
            >
              <Close />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Telefon raqam</label>
              <input 
                type="text"
                placeholder="+998"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Mail</label>
              <input 
                type="email"
                placeholder="Elektron pochtani kiriting"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Talaba FIO</label>
              <input 
                type="text"
                placeholder="Ma'lumotni kiriting"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Tug'ilgan sanasi</label>
              <input 
                type="date"
                placeholder="dd/mm/yyyy"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors appearance-none"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Manzil</label>
              <select 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors appearance-none cursor-pointer"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Parol</label>
              <input 
                type="password"
                placeholder="Parolni kiriting"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Guruh</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.group && formData.group.split(',').map((g, i) => g.trim() && (
                  <span key={i} className="px-2 py-1 bg-purple-50 text-[#6d28d9] rounded-lg text-[11px] font-bold flex items-center gap-1 uppercase">
                    {g.trim()}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => {
                  setSelectedGroupsForModal(formData.group ? formData.group.split(',').map(g => g.trim()) : []);
                  setIsGroupModalOpen(true);
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-[#6d28d9] font-bold text-[13px] hover:bg-gray-50 transition-colors"
              >
                <Add fontSize="small" />
                Guruh qo'shish
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1e293b]">Surati</label>
              <label htmlFor="student-avatar-input" className="w-full p-8 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer group block relative overflow-hidden text-center">
                <input 
                  type="file" 
                  id="student-avatar-input"
                  accept="image/*"
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({ ...prev, avatar: reader.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {formData.avatar ? (
                  <div className="flex flex-col items-center gap-2">
                    <img src={formData.avatar} alt="Avatar preview" className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-sm" />
                    <span className="text-[12px] text-gray-500 font-medium">Rasmni o'zgartirish</span>
                  </div>
                ) : (
                  <>
                    <FileUploadOutlined className="text-gray-300 group-hover:text-[#6d28d9] transition-colors" sx={{ fontSize: 32 }} />
                    <div className="text-center space-y-1">
                      <p className="text-[13px] font-bold">
                        <span className="text-[#6d28d9]">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-[11px] text-gray-400">JPG or PNG (max. 2 MB)</p>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-gray-50 flex items-center gap-3">
            <button 
              onClick={() => {
                setIsAddDrawerOpen(false);
                setEditingStudentId(null);
                setFormData({ name: '', group: '', phone: '+998', email: '', birthDate: '', address: 'Toshkent sh.', password: '' });
              }}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Bekor qilish
            </button>
            <button 
              onClick={handleSaveStudent}
              className={`flex-1 px-4 py-3 rounded-xl text-[14px] font-bold transition-all ${
                formData.name && formData.phone && formData.phone !== '+998'
                  ? 'bg-[#6d28d9] text-white hover:bg-[#6d28d9] cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!formData.name || !formData.phone || formData.phone === '+998'}
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>

      {/* Group Selection Modal */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
            onClick={() => setIsGroupModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-[440px] rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-50">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900">Guruhga biriktirish</h3>
                <p className="text-[13px] text-gray-500">Bir yoki bir nechta guruhni tanlang</p>
              </div>
              <button 
                onClick={() => setIsGroupModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
              >
                <Close />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
                <input 
                  type="text" 
                  placeholder="Guruh qidirish..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-[13px] focus:outline-none focus:border-[#6d28d9] transition-colors"
                  value={groupSearch}
                  onChange={(e) => setGroupSearch(e.target.value)}
                />
              </div>

              <div className="max-h-[300px] overflow-y-auto no-scrollbar space-y-1">
                {availableGroups
                  .filter(g => g.toLowerCase().includes(groupSearch.toLowerCase()))
                  .map((group) => (
                    <label 
                      key={group}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group"
                    >
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#6d28d9] focus:ring-[#6d28d9]"
                        checked={selectedGroupsForModal.includes(group)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedGroupsForModal([...selectedGroupsForModal, group]);
                          } else {
                            setSelectedGroupsForModal(selectedGroupsForModal.filter(g => g !== group));
                          }
                        }}
                      />
                      <span className="text-[14px] font-bold text-gray-700 uppercase group-hover:text-gray-900">{group}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsGroupModalOpen(false)}
                className="px-6 py-2.5 border border-gray-100 rounded-xl text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button 
                onClick={() => {
                  setFormData({ ...formData, group: selectedGroupsForModal.join(', ') });
                  setIsGroupModalOpen(false);
                }}
                className={`px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all shadow-lg ${
                  selectedGroupsForModal.length > 0
                    ? 'bg-[#6d28d9] text-white hover:bg-[#6d28d9] cursor-pointer shadow-purple-100'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={selectedGroupsForModal.length === 0}
              >
                Qo'shish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

