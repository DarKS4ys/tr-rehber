'use client';

import React from 'react';
import { Button } from './ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import { deleteFile } from '@/actions/actions';
import clsx from 'clsx';
import { User } from 'next-auth';
import { toast } from 'sonner';

export default function Delete({ type, fileUrl, fileId, user }: { type: 'file' | 'place', fileUrl?:string, fileId?:string, user: User }) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const { edgestore } = useEdgeStore();
  
  const handleFileDelete = async (urlToDelete: string) => {
    try {
        setLoading(true);
        await edgestore.publicFiles.delete({
            url: urlToDelete,
        });
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false);
    }
  }
  
  const handlePlaceDelete = async () => {
    try {
        setLoading(true);

    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false);
    }
  }

  const handleClick = async () => {
    if (type === 'file' && fileUrl && fileId) {
        try {
            await handleFileDelete(fileUrl);
            const response = await deleteFile(fileId)

            toast.success(response.message)
        } catch (error) {
            console.log(error)
            
            if (typeof error === 'string') {
                toast.error(error);
            }

        }
    } else if (type === 'place') {
      await handlePlaceDelete();
    }
  }

  return (
    <Button
      disabled={loading}
      className={clsx("bg-red-600 hover:bg-red-700 text-white", loading && 'bg-primary/20 animate-pulse')}
      onClick={handleClick}
    >
      Delete
    </Button>
  );
}
