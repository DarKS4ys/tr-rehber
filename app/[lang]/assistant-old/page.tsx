import { Locale } from '@/i18n.config';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import React from 'react';
import PlaceCard from '../../../components/PlaceCard';
import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import BGImage from '@/public/background.jpg';
import { BubbleText } from '@/components/Assistant/BubbleText';
import Link from 'next/link';
import Typewriter from '@/components/Assistant/Typewriter';
import Avatar from '@/components/Assistant/Avatar';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

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

  const { metadataLocal } = await getDictionary(lang);

  metadata.title = metadataLocal.explore + ' | Sanal Rehberim';

  return (
      <div id="home" className="w-full relative p-3 h-[90svh] overflow-hidden">
        <div className="bg-main/40 relative backdrop-blur-xl overflow-hidden text-primary-foreground flex gap-4 justify-center items-center rounded-[2rem] w-full h-full">
          <div className="w-full md:flex hidden  flex-col items-start justify-start p-12 mt-8">
            <div className="z-10 pointer-events-none flex awesome text-start items-start justify-start">
              <BubbleText className="italic text-[clamp(72px,17.5vw,120px)] md:text-[7rem] lg:text-[6.6rem] xl:text-[7.5rem]  2xl:text-[10rem] leading-[1] uppercase font-black font-mono">
                Y
              </BubbleText>
              <BubbleText className="whitespace-nowrap text-[clamp(72px,17.5vw,120px)] md:text-[7rem] lg:text-[6.6rem] xl:text-[7.5rem] 2xl:text-[10rem] leading-[1] uppercase font-black font-mono">
                apay Zeka
              </BubbleText>
            </div>
            <h1 className="pointer-events-none z-10 text-[clamp(40px,10vw,65px)] md:text-[4.5rem] 2xl:text-[6.5rem] leading-[1] uppercase font-mono">
              Destekli{' '}
              <span className="text-[clamp(48px,11.5vw,80px)] md:text-[5.5rem] 2xl:text-[7.5rem] font-black">
                Sanal Rehber
              </span>{' '}
              Asistanı
            </h1>

            <Link
              className="z-10 p-4 mt-4 rounded-xl hover:bg-main/40 duration-150 shadow-xl hover:shadow-black/35 active:scale-95 transition ring-1 ring-white hover:ring hover:ring-offset-1 bg-main/70 backdrop-blur-lg"
              target="_blank"
              href={process.env.NEXTAUTH_URL!}
            >
              <Typewriter />
            </Link>
          </div>

          <div className="z-10 w-full md:w-[65%] 2xl:w-[45%] overflow-hidden rounded-br-[2rem] h-full flex items-end relative justify-end">
            <div
              className="absolute right-0 top-0 w-full h-full drop-shadow-lg shadow-black"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 50%)',
              }}
            >
              <Avatar username={session?.user.name} />
            </div>
          </div>
          
          <div className="inset-0 w-full absolute ">
          <BackgroundGradientAnimation/>
          </div>
        </div>

    </div>
  );
}
