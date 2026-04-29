import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApp } from '@/store/AppContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.username.trim()) errs.username = 'Username is required.';
    else if (form.username.length < 3) errs.username = 'At least 3 characters.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'At least 6 characters.';
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = 'Passwords do not match.';
    return errs;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    login(form.username);
    setLoading(false);
    navigate('/');
  };

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

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Username</label>
            <Input
              placeholder="@username"
              value={form.username}
              onChange={(e) => update('username', e.target.value)}
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              autoComplete="email"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                className="pr-11"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Confirm Password
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(e) => update('confirmPassword', e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <Button type="submit" className="w-full h-12 text-base mt-2" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign Up'}
          </Button>
        </form>

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
