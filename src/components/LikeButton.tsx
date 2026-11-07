import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'carasur_likes_v1';

type LikesMap = Record<string, number>;

let cache: LikesMap | null = null;
const listeners = new Set<() => void>();
let storageBound = false;

function read(): LikesMap {
  if (cache) return cache;
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    cache = raw ? (JSON.parse(raw) as LikesMap) : {};
  } catch {
    cache = {};
  }
  return cache;
}

function notify() {
  listeners.forEach((listener) => listener());
}

function persist(next: LikesMap) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable (private mode / quota): keep in-memory state only
  }
  notify();
}

function toggleLike(key: string) {
  const current = read();
  const next: LikesMap = { ...current };
  if (next[key]) {
    delete next[key];
  } else {
    next[key] = Date.now();
  }
  persist(next);
}

function bindStorageSync() {
  if (storageBound || typeof window === 'undefined') return;
  storageBound = true;
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      cache = null;
      notify();
    }
  });
}

function useLike(key: string) {
  const [, setTick] = useState(0);

  useEffect(() => {
    bindStorageSync();
    const sync = () => setTick((tick) => tick + 1);
    listeners.add(sync);
    sync();
    return () => {
      listeners.delete(sync);
    };
  }, [key]);

  const liked = Boolean(read()[key]);

  return {
    liked,
    toggle: () => toggleLike(key),
  };
}

export interface LikeButtonProps {
  contentKey: string;
  label?: string;
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  contentKey,
  label = 'Me gusta',
  className = '',
}) => {
  const { liked, toggle } = useLike(contentKey);

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? 'Quitar me gusta' : 'Dar me gusta'}
      onClick={(event) => {
        event.stopPropagation();
        toggle();
      }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
        liked
          ? 'text-red-700 border-red-300 bg-red-50 hover:bg-red-100 hover:border-red-400'
          : 'text-[#666562] hover:text-[#111111] border-[#e5e4e0] hover:border-[#111111] bg-white hover:bg-[#f5f4f0]'
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-3 h-3 transition-transform ${liked ? 'scale-110 text-red-600' : ''}`}
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="font-medium">{liked ? 'Te gusta' : label}</span>
    </button>
  );
};
