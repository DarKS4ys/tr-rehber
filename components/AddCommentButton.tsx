'use client';

import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { IoMdSend } from 'react-icons/io';
import type { User } from 'next-auth';
import { Button } from '@/components/ui/button';
import Input from './Input';
import clsx from 'clsx';
import {RingLoader} from 'react-spinners'

interface AddCommentButton {
  placeId: string;
  sendComment: any
  placeLocal: any
  user: User | undefined | null
}

export default function AddCommentButton({ user, placeId, sendComment, placeLocal }: AddCommentButton) {
  const [isPending, startTransition] = useTransition();
  const [text, setText] = useState('');

  console.log(isPending)

  const handleCommentSend = async () => {
    try {
      const response: any = await sendComment(placeId, text, user);
      setText('');

      if (response.success) {
        toast.success(placeLocal.comments.success);
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message || placeLocal.comments.error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isPending) {
      startTransition(() => {
        handleCommentSend();
      });
    }
  };

  const handleButtonClick = () => {
    if (!isPending) {
      startTransition(() => {
        handleCommentSend();
      });
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Input
        required
        name="Comment"
        placeholder={user ? placeLocal.comments.placeholder : placeLocal.comments.userError}
        className={clsx('input input-bordered w-full', !user && 'cursor-not-allowed opacity-50')}
        value={text}
        disabled={!user}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button
        className={clsx('overflow-hidden flex gap-2 group', 'disabled:opacity-50 disabled:cursor-not-allowed')}
        disabled={isPending || !user}
        onClick={handleButtonClick}
      >
        <h1 className='group-hover:translate-x-2.5 transition'>{!isPending ? placeLocal.comments.send : <RingLoader size={32}/> }</h1>
        {!isPending && <IoMdSend size={18} className="group-hover:translate-x-10 transition" />}
      </Button>

    </div>
  );
}