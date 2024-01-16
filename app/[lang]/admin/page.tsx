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
import { redirect } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanal Rehberim',
  description: 'Yapay zeka entegreli sanal rehber uygulaması.',
};

export default async function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const session = await getServerSession(authOptions);
  const { admin } = await getDictionary(lang)
  const { metadataLocal } = await getDictionary(lang)

  metadata.title = metadataLocal.admin + ' | Sanal Rehberim'

  if (!session) {
    redirect('/sign-in?callbackUrl=/admin');
  }

  if (session?.user.status != 'Admin') {
    redirect('/');
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
            {admin.welcome},{' '}
            <span className="font-semibold">{session?.user.name}</span>😎
          </h1>
          <Time />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AdminCard
            adminCardLocal={admin.adminCard}
            title={admin.cards.placeCard.title}
            description={admin.cards.placeCard.description}
            href="admin/create-place"
            gradient
          />

          <AdminCard
            adminCardLocal={admin.adminCard}
            title={admin.cards.fileCard.title}
            description={admin.cards.fileCard.description}
          >
            <Upload session={session} />
          </AdminCard>

          <AdminCard
            adminCardLocal={admin.adminCard}
            title={admin.cards.commentCard.title}
            description={admin.cards.commentCard.description}
            href="admin/comments"
            gradient2
          />
        </div>

        <h1 className="text-3xl font-semibold">{admin.uploadedFiles}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <FileCard fileCardLocalization={admin.fileCard} session={session} file={file} key={file.id}/>
          ))}
        </div>
        <Toaster closeButton richColors />
      </div>
    </div>
  );
}
