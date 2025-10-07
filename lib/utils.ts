import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function capitalizeAllWords(str : string) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
} 