import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@/store/AppContext';
import { Toaster } from 'sonner';
import AppRoutes from './routes/routes';


export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </AppProvider>
  );
}