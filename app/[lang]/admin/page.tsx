import AdminCard from '@/components/AdminCard';
import Time from '@/components/Time';
import Upload from '@/components/Upload';
import { Locale } from '@/i18n.config';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import React from 'react';
import { Toaster } from 'sonner';
import { FileCard } from '@/components/FileCard';

export default async function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const session = await getServerSession(authOptions);

  if (session?.user.status != 'Admin') {
    throw new Error('You need to be an admin')
  }

  const files = await prisma.file.findMany({
    orderBy: { id: 'desc' },
    include: { user: true },
  });

  return (
    <div className="py-10 px-4 md:p-12">
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
