import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { showToast } from '@/lib/show-toast';
import { useNavigate } from 'react-router-dom';
import { StatusType } from '@/types';
import { Spinner } from '../ui/spinner';

export default function Login() {
    const navigate = useNavigate();
    const { login, isPending } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            showToast(StatusType.WARNING, "Please fill in all fields.");
            return;
        }

        const response = await login({ username, password });
        if (response.status === StatusType.SUCCESS) {
            showToast(StatusType.SUCCESS, response.message);
            navigate("/");
            return;
        }

        showToast(StatusType.ERROR, response.message);
        setPassword("");
    }

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label htmlFor="username" className="text-sm font-medium text-gray-700 block mb-1.5">Username</label>
                <Input
                    type="text"
                    placeholder="@username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
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
            </div>

            <Button type="submit" className="w-full h-12 text-base" disabled={isPending}>
                {isPending ? <Spinner /> : ""}Login
            </Button>
        </form>
    );
}