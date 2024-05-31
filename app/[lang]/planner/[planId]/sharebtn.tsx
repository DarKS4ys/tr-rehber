"use client"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function ShareButton({domain}: {domain: string | undefined}) {
  const [copySuccess, setCopySuccess] = useState(false);

  const pathname = usePathname()

  const handleCopyLink = () => {
    const link = `${domain}${pathname}`
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopySuccess(true);
        toast.success('Bağlantı başarıyla kopyalandı!')
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => {
        // Handle error
        console.error('Failed to copy link to clipboard');
      });
  };

  return (
    <div>
      <Button
      className={cn(copySuccess && 'bg-green-500 hover:bg-green-600')}
        onClick={handleCopyLink}
      >

        {copySuccess ? 'Kopyalandı' : 'Paylaş'}
      </Button>
    </div>
  )
}
