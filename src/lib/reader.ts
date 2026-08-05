import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// Reads the content Keystatic manages, at build time. Used by all pages.
export const reader = createReader(process.cwd(), keystaticConfig);

export type EventEntry = Awaited<ReturnType<typeof reader.collections.events.all>>[number];

export const CATEGORY_LABELS: Record<string, string> = {
  conferences: 'Conferences & Summits',
  galas: 'Galas & Awards',
  corporate: 'Corporate & Networking',
  leadership: 'Leadership & Faith',
  charity: 'Charity & Concerts',
};

/** Sorted-by-order helper for collection results. */
export function byOrder<T extends { entry: { order: number } }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.entry.order - b.entry.order);
}

/** Resolve a stored cover image value to a usable URL (handles bare filename or full path). */
export function eventImage(cover: string | null): string {
  if (!cover) return '/images/hero.jpg';
  return cover.startsWith('/') ? cover : `/images/events/${cover}`;
}

/** Resolve a stored blog image value to a usable URL (handles bare filename or full path). */
export function blogImage(img: string | null): string {
  if (!img) return '/images/hero.jpg';
  return img.startsWith('/') ? img : `/images/blog/${img}`;
}

/** Published (non-draft) blog posts, newest first. */
export async function publishedPosts() {
  const posts = await reader.collections.posts.all();
  return posts
    .filter((p) => !p.entry.draft)
    .sort((a, b) => (a.entry.date && b.entry.date ? (a.entry.date < b.entry.date ? 1 : -1) : 0));
}

/** Format an ISO date (YYYY-MM-DD) as e.g. "5 August 2026". */
export function formatPostDate(date: string | null): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
