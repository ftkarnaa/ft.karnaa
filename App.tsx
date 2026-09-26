import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import BookingsPage from './pages/BookingsPage'
import FindingPartnerPage from './pages/FindingPartnerPage'
import TrackingPage from './pages/TrackingPage'
import BookSlotPage from './pages/BookSlotPage'
import ProfilePage from './pages/ProfilePage'
import ReelsPage from './pages/ReelsPage'

export type Screen = 'home' | 'reels' | 'bookings' | 'book-slot' | 'finding' | 'tracking' | 'profile'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('Shreyak')
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedEvent, setSelectedEvent] = useState('')

  if (!isLoggedIn) {
    return <LoginPage onLogin={(name) => { setUserName(name); setIsLoggedIn(true) }} />
  }

  if (screen === 'bookings') return <BookingsPage onBack={() => setScreen('home')} />
  if (screen === 'book-slot') {
    return (
      <BookSlotPage
        initialEvent={selectedEvent}
        onBack={() => setScreen('home')}
        onContinue={() => setScreen('finding')}
      />
    )
  }
  if (screen === 'finding') return <FindingPartnerPage onBack={() => setScreen('home')} onPartnerFound={() => setScreen('tracking')} />
  if (screen === 'tracking') return <TrackingPage onBack={() => setScreen('home')} />
  if (screen === 'reels') return <ReelsPage onNavigate={setScreen} />
  if (screen === 'profile') {
    return (
      <ProfilePage
        onBack={() => setScreen('home')}
        onNavigate={setScreen}
        onLogout={() => setIsLoggedIn(false)}
      />
    )
  }

  return (
    <HomePage
      userName={userName}
      onNavigate={setScreen}
      onBook={(eventType) => {
        setSelectedEvent(eventType)
        setScreen('book-slot')
      }}
      onLogout={() => setIsLoggedIn(false)}
    />
  )
}
