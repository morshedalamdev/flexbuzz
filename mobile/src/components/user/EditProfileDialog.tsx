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
import { useAuthStore } from '@/store/auth-store';
import { usePostStore } from '@/store/post-store';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GENDER_OPTIONS = [
  { value: '', label: 'Select gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export default function EditProfileDialog({ open, onOpenChange }: EditProfileDialogProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const syncUserInPosts = usePostStore((state) => state.syncUserInPosts);
  const [form, setForm] = useState({
    username: currentUser.username,
    email: currentUser.email,
    firstName: currentUser.profile.firstName,
    lastName: currentUser.profile.lastName,
    gender: currentUser.profile.gender ?? '',
    dob: currentUser.profile.dob ?? '',
    bio: currentUser.profile.bio,
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = () => {
    updateProfile({
      username: form.username,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      dob: form.dob,
      bio: form.bio,
    });
    syncUserInPosts(currentUser.id, {
      username: form.username,
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      dob: form.dob,
      bio: form.bio,
    });
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
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Last name</label>
              <Input
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                placeholder="Doe"
              />
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
          </div>

          {/* Date of birth */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Date of Birth</label>
            <Input
              type="date"
              value={form.dob}
              onChange={(e) => update('dob', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Bio</label>
            <Textarea
              value={form.bio}
              onChange={(e) => update('bio', e.target.value)}
              placeholder="Tell the world about yourself..."
              className="min-h-[80px]"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
