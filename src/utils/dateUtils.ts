import { Photo } from '../types/kencana';

const INDO_MONTHS: Record<string, number> = {
  januari: 0, jan: 0,
  februari: 1, feb: 1,
  maret: 2, mar: 2,
  april: 3, apr: 3,
  mei: 4, may: 4,
  juni: 5, jun: 5,
  juli: 6, jul: 6,
  agustus: 7, ags: 7, agu: 7, aug: 7,
  september: 8, sep: 8,
  oktober: 9, okt: 9, oct: 9,
  november: 10, nov: 10,
  desember: 11, des: 11, dec: 11
};

/**
 * Parses date string in various formats:
 * - "14 Januari 2026" / "08 Februari 2026"
 * - "2026-01-14" (ISO)
 * - "14/01/2026" (DD/MM/YYYY)
 */
export function parsePhotoDate(dateStr?: string): number {
  if (!dateStr || typeof dateStr !== 'string') return 0;
  const trimmed = dateStr.trim();
  if (!trimmed) return 0;

  // 1. Try standard ISO parse
  const isoParsed = Date.parse(trimmed);
  if (!isNaN(isoParsed) && trimmed.includes('-')) {
    return isoParsed;
  }

  // 2. Try Indonesian format: "14 Januari 2026" or "14 Jan 2026"
  const tokens = trimmed.toLowerCase().split(/[\s,.-]+/);
  if (tokens.length >= 3) {
    const day = parseInt(tokens[0], 10);
    const monthKey = tokens[1];
    const year = parseInt(tokens[2], 10);
    if (!isNaN(day) && INDO_MONTHS[monthKey] !== undefined && !isNaN(year)) {
      return new Date(year, INDO_MONTHS[monthKey], day).getTime();
    }

    // Try format: "Januari 14, 2026"
    const monthKeyFirst = tokens[0];
    const daySecond = parseInt(tokens[1], 10);
    if (!isNaN(daySecond) && INDO_MONTHS[monthKeyFirst] !== undefined && !isNaN(year)) {
      return new Date(year, INDO_MONTHS[monthKeyFirst], daySecond).getTime();
    }
  }

  // 3. Try DD/MM/YYYY
  const slashParts = trimmed.split('/');
  if (slashParts.length === 3) {
    const d = parseInt(slashParts[0], 10);
    const m = parseInt(slashParts[1], 10) - 1;
    const y = parseInt(slashParts[2], 10);
    if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
      return new Date(y, m, d).getTime();
    }
  }

  return 0;
}

/**
 * Sorts array of photos by their activity date.
 * Default direction: 'asc' (chronological: earliest activity to latest)
 */
export function sortPhotosByActivityDate(
  photos: Photo[], 
  direction: 'asc' | 'desc' = 'asc'
): Photo[] {
  return [...photos].sort((a, b) => {
    const timeA = parsePhotoDate(a.date);
    const timeB = parsePhotoDate(b.date);

    // If both have valid parsed dates, compare them
    if (timeA !== 0 && timeB !== 0) {
      return direction === 'asc' ? timeA - timeB : timeB - timeA;
    }
    // If only one has valid date, valid date comes first
    if (timeA !== 0 && timeB === 0) return -1;
    if (timeA === 0 && timeB !== 0) return 1;

    // Fallback: compare IDs numerically if numeric
    const idA = typeof a.id === 'number' ? a.id : parseInt(String(a.id), 10) || 0;
    const idB = typeof b.id === 'number' ? b.id : parseInt(String(b.id), 10) || 0;
    return direction === 'asc' ? idA - idB : idB - idA;
  });
}
