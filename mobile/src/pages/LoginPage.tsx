import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import Login from '@/components/auth/login';

export default function LoginPage() {

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 px-8 pt-16 pb-12 flex flex-col items-center text-white">
        <div className="bg-white/20 rounded-2xl p-3 mb-4">
          <Zap size={32} className="text-white" fill="white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Flex Buzz</h1>
        <p className="text-blue-100 text-sm mt-1 text-center">
          Connect, share, and trend with the world
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8 pb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
        <p className="text-gray-400 text-sm mb-8">Sign in to your account</p>
        <Login />
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
