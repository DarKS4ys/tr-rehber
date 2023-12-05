import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Message } from "ai";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToBottom(containerRef: React.RefObject<HTMLElement>) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild;
    if (lastMessage) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "end",
      };
      lastMessage.scrollIntoView(scrollOptions);
    }
  }
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

/* export const isAuthenticated = async () => {
  try {
    const session = await getServerSession(authOptions);
    return session?.user?.status === 'Admin';
  } catch (error) {
    console.error('Error fetching session:', error);
    return false;
  }
}; */

export const initialMessages: Message[] = [
  {
    role: "assistant",
    id: "0",
    content:
      "Hi! Feel free to ask me any additional info regarding this place or other questions in your mind.",
  },
];

export function formattedText(inputText: string) {
  return inputText
    .replace(/\n+/g, " ") // Replace multiple consecutive new lines with a single space
    .replace(/(\w) - (\w)/g, "$1$2") // Join hyphenated words together
    .replace(/\s+/g, " "); // Replace multiple consecutive spaces with a single space
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}