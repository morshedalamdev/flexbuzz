import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { SignupSchema } from '@/lib/validation';
import { showToast } from '@/lib/show-toast';
import { StatusType } from '@/types';
import { Spinner } from '../ui/spinner';

export default function Signup() {
    const navigate = useNavigate();
    const { signup, isPending } = useAuthStore();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const update = (field: string, value: string) =>
        setForm((f) => ({ ...f, [field]: value }));

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        const validatedData = SignupSchema.safeParse(form);
        if (!validatedData.success) {
            showToast(StatusType.ERROR, "Validation Error");

            const fieldErrors = validatedData.error.flatten().fieldErrors;
            setErrors({
                username: fieldErrors.username?.[0] ?? '',
                email: fieldErrors.email?.[0] ?? '',
                password: fieldErrors.password?.[0] ?? '',
                confirmPassword: fieldErrors.confirmPassword?.[0] ?? ''
            });
            return;
        }

        const response = await signup({
            username: form.username,
            email: form.email,
            password: form.password,
        });

        if (response.status === StatusType.SUCCESS) {
            showToast(StatusType.SUCCESS, response.message);
            navigate("/");
            return;
        }

        showToast(StatusType.ERROR, response.message);
    };

    return (
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
                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={form.confirmPassword}
                        onChange={(e) => update('confirmPassword', e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword((v) => !v)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-2" disabled={isPending}>
                {isPending ? <Spinner /> : ""}Sign Up
            </Button>
        </form>
    );
}