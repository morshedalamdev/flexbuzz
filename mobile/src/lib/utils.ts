import type { UserType } from '@/types/user';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatCount(n: number | undefined): string {
  if (n === undefined) return '0';
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function displayName(profile: UserType) {
  return profile?.profile.firstName
    ? `${profile.profile.firstName} ${profile.profile.lastName}`
    : profile?.username;
}

export function displayInitial(profile: UserType) {
  return profile?.profile.firstName
    ? `${profile.profile.firstName[0]}${profile.profile.lastName?.[0] ?? ''}`.toUpperCase()
    : profile?.username.slice(0, 2).toUpperCase();
}