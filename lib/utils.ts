import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateString = (value: unknown, maxLength: number) => {
  if (!value || typeof value !== 'string') {
      return false
  }

  return true
}

export const extractErrorMessage = (error: unknown): string => {
  let message: string
  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Something went wrong'
  }

  return message
}

export const truncateText = (text: string | null | undefined, chars: number): string => {
  if (text && text.length > chars) {
    return text.substring(0, chars) + '...';
  }
  
  if (text) {
    return text;
  } else {
    return 'Loading...'
  }
};