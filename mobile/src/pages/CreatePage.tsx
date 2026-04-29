import { useNavigate } from 'react-router-dom';
import MobileShell from '@/components/layout/MobileShell';
import TopBar from '@/components/layout/TopBar';
import PostComposer from '@/components/post/PostComposer';

export default function CreatePage() {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <TopBar title="New Post" showBack onBack={() => navigate(-1)} />
      <div className="bg-white flex-1 p-1">
        <PostComposer autoFocus onSuccess={() => navigate('/')} />
      </div>
    </MobileShell>
  );
}
