import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import Signup from '@/components/auth/signup';

export default function SignupPage() {
  return (
    <div className="min-h-dvh bg-white flex flex-col">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-8 pt-14 pb-10 flex flex-col items-center text-white">
        <div className="bg-white/20 rounded-2xl p-3 mb-3">
          <Zap size={28} className="text-white" fill="white" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">Flex Buzz</h1>
        <p className="text-indigo-100 text-sm mt-1">Join the conversation</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8 pb-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Create account</h2>
        <p className="text-gray-400 text-sm mb-6">It's free and always will be</p>

        <Signup />

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
