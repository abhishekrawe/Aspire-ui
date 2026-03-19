import { Routes, Route } from 'react-router-dom'
import { AppProvider } from '@store/AppContext'
import MainLayout from '@components/layout/MainLayout'
import CardsPage from '@components/pages/CardsPage'
import PaymentsPage from '@components/pages/PaymentsPage'
import CreditPage from '@components/pages/CreditPage'
import SettingsPage from '@components/pages/SettingsPage'

function App() {
  return (
    <AppProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CardsPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/credit" element={<CreditPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </MainLayout>
    </AppProvider>
  )
}

export default App

