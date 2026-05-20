import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { UserType } from '@/types/user';
import { useUserStore } from '@/store/user-store';
import { Spinner } from '../ui/spinner';
import { ProfileEditSchema } from '@/lib/validation';
import { showToast } from '@/lib/show-toast';
import { StatusType } from '@/types';

interface EditProfileDialogProps {
  user: UserType
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GENDER_OPTIONS = [
  { value: '', label: 'Select gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export default function EditProfileDialog({ user, open, onOpenChange }: EditProfileDialogProps) {
  const { isLoading, updateProfile } = useUserStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const today = new Date();
  const maxDob = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0];
  const minDob = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0];

  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
    firstName: user.profile.firstName ?? '',
    lastName: user.profile.lastName ?? '',
    gender: user.profile.gender ?? '',
    dob: user.profile.dob ?? '',
    bio: user.profile.bio ?? '',
  });

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSave = async () => {
    const validated = ProfileEditSchema.safeParse(form);
    if (!validated.success) {
      const fieldErrors = validated.error.flatten().fieldErrors;
      const nextErrors: Record<string, string> = {
        username: fieldErrors.username?.[0] ?? '',
        email: fieldErrors.email?.[0] ?? '',
        firstName: fieldErrors.firstName?.[0] ?? '',
        lastName: fieldErrors.lastName?.[0] ?? '',
        gender: fieldErrors.gender?.[0] ?? '',
        dob: fieldErrors.dob?.[0] ?? '',
        bio: fieldErrors.bio?.[0] ?? '',
      };
      setErrors(nextErrors);

      const firstError = Object.values(nextErrors).find(Boolean);
      showToast(StatusType.ERROR, firstError ?? 'Please fix the highlighted profile fields.');
      return;
    }

    setErrors({});
    const profileUpdates = {
      username: form.username,
      email: form.email,
      profile: {
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        dob: form.dob,
        bio: form.bio,
      }
    };
    await updateProfile(profileUpdates);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Username</label>
            <Input
              value={form.username}
              onChange={(e) => update('username', e.target.value)}
              placeholder="@username"
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* First / Last name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">First name</label>
              <Input
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                placeholder="Jane"
              />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Last name</label>
              <Input
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                placeholder="Doe"
              />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => update('gender', e.target.value)}
              className="flex h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
          </div>

          {/* Date of birth */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Date of Birth</label>
            <Input
              type="date"
              value={form.dob}
              onChange={(e) => update('dob', e.target.value)}
              min={minDob}
              max={maxDob}
            />
            {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob}</p>}
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Bio</label>
            <Textarea
              value={form.bio}
              onChange={(e) => update('bio', e.target.value)}
              placeholder="Tell the world about yourself..."
              className="min-h-20"
            />
            {errors.bio && <p className="text-xs text-red-500 mt-1">{errors.bio}</p>}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave} disabled={isLoading}>
            {isLoading ? <Spinner /> : ""}Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
