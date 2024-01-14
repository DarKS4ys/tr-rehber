import React from 'react';
import AdminTable from '@/components/AdminTable';
import { prisma } from '@/lib/db/prisma';
import { Locale } from '@/i18n.config';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDictionary } from '@/lib/dictionary';

export default async function page({
  params: { lang },
  searchParams: { page, pageSize },
}: {
  params: { lang: Locale };
  searchParams: { page: string; pageSize: string };
}) {
  const parsedPage = parseInt(page, 10) || 1;
  const parsedPageSize = parseInt(pageSize, 10) || 10;

  const { comment } = await getDictionary(lang)

  const session = await getServerSession(authOptions)

  // ! IMPORTANT Explanation Right Here ↘
  //? nonAllowedComents hold the value of the first promise (findmany), the totalCount holds the value of second promise (comment.count)
  // We use promise cuz with promise the database can both of them at the same time rather than waiting while one is being completed.

  const [nonAllowedComments, totalCount] = await Promise.all([
    prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      where: { allowed: false },
      include: { user: true, place: true },
      skip: (parsedPage - 1) * parsedPageSize,
      take: parsedPageSize,
    }),
    prisma.comment.count({
      where: { allowed: false },
    }),
  ]);

  return (
    <div className="py-10 px-4 md:p-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <div className='flex flex-col gap-2'>
          <h1 className="text-3xl font-semibold">{comment.title}</h1>
          <p className='text-muted-foreground font-light'>{comment.description}</p>
        </div>
        <AdminTable localization={comment.adminTable} userStatus={session?.user.status} totalCount={totalCount} page={parsedPage} pageSize={parsedPageSize} lang={lang} comments={nonAllowedComments} />
      </div>
    </div>
  );
}
