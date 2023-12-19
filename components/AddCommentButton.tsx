'use client';

import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { IoMdSend } from 'react-icons/io';
import type { User } from 'next-auth';
import { Button } from '@/components/ui/button';
import Input from './Input';
import clsx from 'clsx';

interface AddCommentButton {
  placeId: string;
  sendComment: any
  user: User | undefined | null
}

export default function AddCommentButton({ user, placeId, sendComment }: AddCommentButton) {
  const [isPending, startTransition] = useTransition();
  const [text, setText] = useState('');

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      startTransition(async () => {
        try {
          const response: any = await sendComment(placeId, text, user);
          setText('')

          if (response.success) {
            toast.success('Comment added.');
          } else {
            toast.error(response.error);
          }
        } catch (error: any) {
          toast.error(error.message || 'Could not send the comment.');
        }
      });
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Input
        required
        name="Comment"
        placeholder={user ? "Write your comment..." : 'You have to be signed in to comment.'}
        className={clsx('input input-bordered w-full', !user && 'cursor-not-allowed opacity-50')}
        value={text}
        disabled={!user}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button
        className={clsx('overflow-hidden flex gap-2', !user ? 'opacity-50 cursor-not-allowed' : 'group')}
        disabled={isPending && !user}
        onClick={() => {
          startTransition(async () => {
            try {
              const response: any = await sendComment(placeId, text, user);
              setText('')

              if (response.success) {
                toast.success('Comment added.');
              } else {
                toast.error(response.error);
              }
            } catch (error: any) {
              toast.error(error.message || 'Couldnt send the comment.'); // Display specific error message for invalid text length
            }
          });
        }}
      >
        <h1 className='group-hover:translate-x-2.5 transition'>Send</h1>
        <IoMdSend size={18} className="group-hover:translate-x-10 transition" />
      </Button>
      {isPending && <span className="loading loading-spinner loading-md" />}
    </div>
  );
}