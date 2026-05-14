import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  SchoolOutlined,
} from '@mui/icons-material'
import studyImg from '../assets/study.svg'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 2000)
  }

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      backgroundColor: '#fff',
      fontSize: '14px',
      color: '#1a2744',
      '& input': {
        color: '#1a2744',
        '&::placeholder': { color: '#aaa', opacity: 1 },
      },
      '& fieldset': { borderColor: '#d0d5dd' },
      '&:hover fieldset': { borderColor: '#2d5aa0' },
      '&.Mui-focused fieldset': { borderColor: '#2d5aa0', borderWidth: '1.5px' },
    },
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        margin: 0,
        padding: 0,
        fontFamily: '"Inter", "Roboto", sans-serif',
      }}
    >
      {/* LEFT — Dark blue panel (50%) */}
      <div
        style={{
          width: '50%',
          backgroundColor: '#1a2744',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <img
          src={studyImg}
          alt="Study illustration"
          style={{
            width: '80%',
            maxWidth: '420px',
            objectFit: 'contain',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>

      {/* RIGHT — White panel (50%) */}
      <div
        style={{
          width: '50%',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 10%',
          boxSizing: 'border-box',
          flexShrink: 0,
        }}
      >
        {/* Logo + university name */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: 68, height: 68,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a3a6b, #2d5aa0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px',
              boxShadow: '0 4px 16px rgba(26,55,107,0.25)',
            }}
          >
            <SchoolOutlined sx={{ color: 'white', fontSize: 32 }} />
          </div>
          <Typography
            variant="caption"
            style={{
              display: 'block',
              fontSize: '10px',
              color: '#888',
              lineHeight: 1.6,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
            }}
          >
            Muhammad al-Xorazmiy nomidagi<br />
            Toshkent axborot texnologiyalari<br />
            universiteti
          </Typography>
        </div>

        <Divider style={{ width: '100%', marginBottom: '20px' }} />

        <Typography
          style={{
            fontWeight: 700,
            color: '#1a2744',
            letterSpacing: '1.5px',
            textAlign: 'center',
            marginBottom: '28px',
            textTransform: 'uppercase',
            fontSize: '14px',
          }}
        >
          Learning Management System
        </Typography>

        {/* Form */}
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box>
            <Typography
              variant="body2"
              style={{ color: '#333', fontWeight: 500, marginBottom: '6px', fontSize: '13px' }}
            >
              Login
            </Typography>
            <TextField
              fullWidth
              placeholder="Loginni kiriting"
              variant="outlined"
              size="small"
              value={username}
              onChange={e => setUsername(e.target.value)}
              sx={inputSx}
            />
          </Box>

          <Box>
            <Typography
              variant="body2"
              style={{ color: '#333', fontWeight: 500, marginBottom: '6px', fontSize: '13px' }}
            >
              Parol
            </Typography>
            <TextField
              fullWidth
              placeholder="Parolni kiriting"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              size="small"
              value={password}
              onChange={e => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: '#999' }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputSx}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleLogin}
            sx={{
              mt: 0.5,
              py: 1.2,
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'none',
              backgroundColor: '#2d5aa0',
              boxShadow: 'none',
              letterSpacing: '0.3px',
              '&:hover': {
                backgroundColor: '#1a3a6b',
                boxShadow: '0 2px 8px rgba(26,58,107,0.3)',
              },
              '&.Mui-disabled': {
                backgroundColor: '#a0b4d0',
                color: '#fff',
              },
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CircularProgress size={18} thickness={5} sx={{ color: 'white' }} />
                <span>Tekshirilmoqda...</span>
              </Box>
            ) : (
              'Kirish'
            )}
          </Button>
        </Box>

        <Typography
          variant="caption"
          style={{
            color: '#bbb',
            fontSize: '11px',
            marginTop: 'auto',
            paddingTop: '40px',
            textAlign: 'center',
          }}
        >
          Copyright © 2021 of Tashkent University of Information Technologies
        </Typography>
      </div>
    </div>
  )
}
