import AdminCard from '@/components/AdminCard';
import Time from '@/components/Time';
import Upload from '@/components/Upload';
import { Locale } from '@/i18n.config';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import React from 'react';
import ProfileImg from '@/public/profile-pic-placeholder.png';
import { Button } from '@/components/ui/button';
import { BiDownload, BiVideo } from 'react-icons/bi';
import Link from 'next/link';
import CopyToClipboardButton from '@/components/Clipboard';
import { Toaster } from 'sonner';
import { IoMdClose } from 'react-icons/io';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Delete from '@/components/Delete';
import { FaFilePdf } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { FileCard } from '@/components/FileCard';

export default async function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const session = await getServerSession(authOptions);

  const files = await prisma.file.findMany({
    orderBy: { id: 'desc' },
    include: { user: true },
  });

  return (
    <div className="p-12">
      <div className="max-w-7xl flex flex-col gap-8 mx-auto ">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-medium">
            Welcome back,{' '}
            <span className="font-semibold">{session?.user.name}</span>😎
          </h1>
          <Time />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AdminCard
            title="Create a new place"
            description="Add a new place effortlessly using the intuitive UI."
            href="/admin/create-place"
            gradient
          />

          <AdminCard
            title="Upload a new file"
            description="Transfer a new file to edgestore using the input below."
          >
            <Upload session={session} />
          </AdminCard>

          <AdminCard
            title="Configure the AI"
            description="Shape the AI's settings to your liking using the options."
            href="/admin/ai"
            gradient2
          />
        </div>

        <h1 className="text-3xl font-semibold">Uploaded Files</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <FileCard session={session} file={file} key={file.id}/>
          ))}
        </div>
        <Toaster closeButton richColors />
      </div>
    </div>
  );
}
