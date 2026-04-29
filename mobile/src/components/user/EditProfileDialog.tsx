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
import { useApp } from '@/store/AppContext';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileDialog({ open, onOpenChange }: EditProfileDialogProps) {
  const { currentUser, updateProfile } = useApp();
  const [form, setForm] = useState({
    username: currentUser.username,
    firstName: currentUser.profile.firstName,
    lastName: currentUser.profile.lastName,
    bio: currentUser.profile.bio,
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = () => {
    updateProfile({
      username: form.username,
      firstName: form.firstName,
      lastName: form.lastName,
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
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Username</label>
            <Input
              value={form.username}
              onChange={(e) => update('username', e.target.value)}
              placeholder="@username"
            />
          </div>
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
