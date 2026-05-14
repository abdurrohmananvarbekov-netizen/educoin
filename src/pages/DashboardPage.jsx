import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Card,
  Grid,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Collapse,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Checkbox,
  InputAdornment,
  TextField,
} from '@mui/material';
import {
  Home,
  People,
  Class,
  School,
  Redeem,
  Settings,
  NotificationsNone,
  DarkModeOutlined,
  Search,
  ExpandMore,
  ChevronRight,
  Logout,
  MenuOpen,
  CheckCircle,
  Add,
  CalendarToday,
  ArrowBackIos,
  FilterList,
} from '@mui/icons-material';

const menuData = [
  { id: 'asosiy', text: 'Asosiy', icon: <Home /> },
  { id: 'oqtuvchilar', text: "O'qituvchilar", icon: <People /> },
  { id: 'sinflar', text: 'Sinflar', icon: <Class /> },
  { id: 'talabalar', text: 'Talabalar', icon: <School /> },
  { id: 'sovglar', text: "Sovg'alar", icon: <Redeem /> },
  { id: 'boshqarish', text: 'Boshqarish', icon: <Settings /> },
];

const PRIMARY_PURPLE = '#8b5cf6';

const teachersData = Array(10).fill({
  name: "Qwerty qwert",
  groups: ["Label", "Label", "Label"],
  phone: "+998(33)4082808",
  birthday: "24 Jan 2022",
  avatar: "https://i.pravatar.cc/150?u="
});

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('asosiy');
  const [openSuccess, setOpenSuccess] = useState(true);
  const [expandSchedule, setExpandSchedule] = useState(false);

  const handleLogout = () => navigate('/login');

  const renderHome = () => (
    <>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'SINFLAR', value: 3, icon: <Class /> },
          { label: 'FANLAR', value: 8, icon: <MenuOpen /> },
          { label: 'TALABALAR', value: 124, icon: <School /> },
          { label: "SOVG'ALAR", value: 32, icon: <Redeem /> },
          { label: "O'QITUVCHILAR", value: teachersData.length, icon: <People /> },
        ].map((stat) => (
          <Grid item xs={12} sm={6} md={2.4} key={stat.label}>
            <Card sx={{ borderRadius: '24px', bgcolor: PRIMARY_PURPLE, p: 3, textAlign: 'center', boxShadow: 'none' }}>
              <Box sx={{ width: 50, height: 50, borderRadius: '14px', bgcolor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, mx: 'auto', color: 'white' }}>
                {stat.icon}
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 900, color: 'white', mb: 0.5 }}>{stat.value}</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>{stat.label}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card sx={{ borderRadius: '24px', bgcolor: PRIMARY_PURPLE, boxShadow: 'none' }}>
        <ListItemButton disableRipple onClick={() => setExpandSchedule(!expandSchedule)} sx={{ py: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'white' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'white' }}>Haftalik Dars Jadvali</Typography>
          </Box>
          <ExpandMore sx={{ transform: expandSchedule ? 'rotate(180deg)' : 'none', color: 'white' }} />
        </ListItemButton>
      </Card>
    </>
  );

  const renderTeachers = () => (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <IconButton disableRipple sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}><CalendarToday sx={{ fontSize: 18 }} /></IconButton>
          <IconButton disableRipple sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}><Add sx={{ fontSize: 18 }} /></IconButton>
          <TextField
            placeholder="Search"
            size="small"
            sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: '8px', width: '280px' }, '& fieldset': { borderColor: '#e2e8f0' } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#94a3b8' }} /></InputAdornment> }}
          />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>O'qituvchilar</Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>Ushbu sahifada siz o'qituvchilar ro'yxatini va ularning ma'lumotlarini topasiz.</Typography>
      </Box>

      <Button disableRipple variant="outlined" startIcon={<FilterList />} sx={{ mb: 3, textTransform: 'none', color: '#1e293b', borderColor: '#e2e8f0', borderRadius: '8px', bgcolor: 'white' }}>
        Filters
      </Button>

      <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: 'none', border: '1px solid #f1f5f9' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell padding="checkbox"><Checkbox size="small" disableRipple /></TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Nomi</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Guruh</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Telefon raqamlari</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Tug'ilgan sanasi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachersData.map((t, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox"><Checkbox size="small" disableRipple /></TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar src={t.avatar + index} sx={{ width: 32, height: 32 }} />
                    <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>{t.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {t.groups.map((g, i) => <Chip key={i} label={g} size="small" variant="outlined" sx={{ height: '22px' }} />)}
                  </Box>
                </TableCell>
                <TableCell>{t.phone}</TableCell>
                <TableCell>{t.birthday}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button disableRipple variant="outlined" startIcon={<ArrowBackIos sx={{ fontSize: 12 }} />} sx={{ textTransform: 'none', borderRadius: '8px', borderColor: '#e2e8f0', color: '#64748b' }}>
          Previous
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[1, 2, 3, '...', 10].map((page, i) => (
            <Box key={i} sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontSize: '14px', bgcolor: page === 1 ? '#f1f5f9' : 'transparent' }}>
              {page}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Sidebar - No Hovers */}
      <Box sx={{ width: 280, bgcolor: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', p: 2, position: 'sticky', top: 0, height: '100vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, px: 1.5 }}>
          <Box sx={{ width: 36, height: 36, bgcolor: PRIMARY_PURPLE, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><School sx={{ fontSize: 22 }} /></Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>EduCoin</Typography>
        </Box>
        <List sx={{ flexGrow: 1 }}>
          {menuData.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                disableRipple
                onClick={() => setActiveMenu(item.id)} 
                sx={{ 
                  borderRadius: '12px', 
                  bgcolor: activeMenu === item.id ? PRIMARY_PURPLE : 'transparent', 
                  color: activeMenu === item.id ? 'white' : '#64748b',
                  '&:hover': { bgcolor: activeMenu === item.id ? PRIMARY_PURPLE : 'transparent' } // Hoverni o'chirish
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 4, py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src="https://i.pravatar.cc/150?u=admin" />
            <IconButton disableRipple color="error" onClick={handleLogout}><Logout /></IconButton>
          </Box>
        </Box>
        <Box sx={{ p: 4 }}>
          {activeMenu === 'asosiy' && renderHome()}
          {activeMenu === 'oqtuvchilar' && renderTeachers()}
          {activeMenu !== 'asosiy' && activeMenu !== 'oqtuvchilar' && <Typography sx={{ textAlign: 'center', mt: 10 }}>Yaqinda...</Typography>}
        </Box>
      </Box>
    </Box>
  );
}
