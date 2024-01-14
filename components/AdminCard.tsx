import React, { ReactNode } from 'react';
import { Button } from './ui/button';
import clsx from 'clsx';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isAuthenticated } from '@/lib/isAuthenticated';

interface AdminCardProps {
  title: string;
  description: string;
  href?: string;
  gradient?: boolean;
  gradient2?: boolean;
  children?: ReactNode;
  adminCardLocal: any;
}

export default async function AdminCard({
  title,
  description,
  href,
  gradient,
  gradient2,
  children,
  adminCardLocal,
}: AdminCardProps) {
  try {
    const isAdmin = await isAuthenticated();

    if (isAdmin) {
      console.log('User is an Admin');
    } else {
      console.log('User is not an Admin');
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
  }

  return (
    <div
      className={clsx(
        'relative group overflow-hidden rounded-xl flex flex-col gap-2 items-start justify-center p-10',
        gradient
          ? 'bg-gradient-to-b from-accent/60 to-primary/30'
          : gradient2
          ? 'bg-gradient-to-br dark:from-destructive-foreground/5 from-black/5 dark:to-destructive/50 to-destructive/40'
          : 'dark:from-accent dark:to-card/80 bg-gradient-to-br from-accent/60 to-muted-foreground/30'
      )}
    >
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-light text-muted-foreground font-sm">{description}</p>
      {children}
      {href && (
        <Link href={href}>
          <Button className="gap-2 group">
            {adminCardLocal.link}
            <BsArrowRight />
          </Button>
        </Link>
      )}

      <div className="w-64 absolute bottom-0 h-10 bg-primary rounded-full opacity-0 group-hover:opacity-100 mt-4 dark:blur-[110px] blur-[100px] transition duration-500" />
    </div>
  );
}
