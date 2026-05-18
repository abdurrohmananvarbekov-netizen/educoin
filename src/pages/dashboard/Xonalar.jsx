import React, { useState } from 'react';
import { 
  Add, 
  DeleteOutlined, 
  EditOutlined,
  Refresh,
  Close,
  Remove
} from '@mui/icons-material';

const initialRoomsData = [
  { id: 1, name: 'Telegram', capacity: 15 },
  { id: 2, name: 'Twitter', capacity: 12 },
  { id: 3, name: 'Apple', capacity: 25 },
  { id: 4, name: 'Facebook', capacity: 32 },
  { id: 5, name: 'Google', capacity: 18 },
  { id: 6, name: 'Amazon', capacity: 30 },
  { id: 7, name: 'Microsoft', capacity: 20 },
  { id: 8, name: 'Instagram', capacity: 18 },
  { id: 9, name: 'Netflix', capacity: 25 },
];

const tabs = [
  'Kurslar', 'Xonalar', 'Hodimlar', 'Xabar yuborish'
];

export default function Xonalar({ setActiveMenu }) {
  const [activeTab, setActiveTab] = useState('Xonalar');
  const [rooms, setRooms] = useState(initialRoomsData);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [newRoom, setNewRoom] = useState({
    name: '',
    capacity: ''
  });

  const subTabs = [
    'AICoder markazi', 'Fizika va Matematika', '4-maktab', 'Niner markazi', 'IELTS full mock', 'IELTS full mock centre', 'Arxiv'
  ];

  const handleDeleteRoom = (id) => {
    if (window.confirm("Ushbu xonani o'chirishni xohlaysizmi?")) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  const handleEditRoom = (room) => {
    setNewRoom({
      name: room.name,
      capacity: room.capacity.toString()
    });
    setEditingRoomId(room.id);
    setIsAddDrawerOpen(true);
  };

  const handleSaveRoom = () => {
    if (!newRoom.name || !newRoom.capacity) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    if (editingRoomId) {
      setRooms(rooms.map(r => r.id === editingRoomId ? { ...r, name: newRoom.name, capacity: parseInt(newRoom.capacity) } : r));
    } else {
      const roomToAdd = {
        id: Date.now(),
        name: newRoom.name,
        capacity: parseInt(newRoom.capacity)
      };
      setRooms([roomToAdd, ...rooms]);
    }

    setIsAddDrawerOpen(false);
    setEditingRoomId(null);
    setNewRoom({ name: '', capacity: '' });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Boshqarish</h1>
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
                activeTab === tab ? 'text-[#7c3aed]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c3aed] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        {/* Card Header */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-bold text-gray-900">Xonalar</h2>
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <Refresh sx={{ fontSize: 18 }} />
            </button>
          </div>
          <button 
            onClick={() => setIsAddDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white rounded-xl hover:bg-[#6d28d9] font-semibold text-[13px] transition-colors shadow-sm"
          >
            <Add fontSize="small" />
            Xonani qo'shish
          </button>
        </div>

        {/* Rooms Grid */}
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rooms.map((room) => (
              <div 
                key={room.id} 
                className="bg-gray-50/50 rounded-2xl p-5 border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-[14px] font-bold text-gray-800">{room.name}</h3>
                    <p className="text-[12px] text-gray-500 font-medium">Sig'imi: {room.capacity}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleDeleteRoom(room.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <DeleteOutlined sx={{ fontSize: 18 }} />
                    </button>
                    <button 
                      onClick={() => handleEditRoom(room)}
                      className="p-1.5 text-gray-400 hover:text-[#7c3aed] transition-colors"
                    >
                      <EditOutlined sx={{ fontSize: 18 }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Room Drawer */}
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
              {editingRoomId ? 'Xonani tahrirlash' : 'Xonani qo\'shish'}
            </h2>
            <button 
              onClick={() => {
                setIsAddDrawerOpen(false);
                setEditingRoomId(null);
                setNewRoom({ name: '', capacity: '' });
              }}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
            >
              <Close />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-gray-900 flex items-center gap-1">
                Nomi <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                placeholder="Xona nomi"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#7c3aed] transition-colors"
                value={newRoom.name}
                onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-gray-900 flex items-center gap-1">
                Sig'imi <span className="text-red-500">*</span>
              </label>
              <input 
                type="number"
                placeholder="Xona sig'imi"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#7c3aed] transition-colors"
                value={newRoom.capacity}
                min="0"
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setNewRoom({...newRoom, capacity: isNaN(val) ? '' : Math.max(0, val).toString()});
                }}
              />
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-gray-100 flex items-center gap-3">
            <button 
              onClick={() => {
                setIsAddDrawerOpen(false);
                setEditingRoomId(null);
                setNewRoom({ name: '', capacity: '' });
              }}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Bekor qilish
            </button>
            <button 
              onClick={handleSaveRoom}
              className="flex-1 px-4 py-3 bg-[#7c3aed] text-white rounded-xl text-[14px] font-bold hover:bg-[#6d28d9] transition-colors shadow-lg shadow-purple-100"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

