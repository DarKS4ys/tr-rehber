'use client';

import ShinyButton from '@/components/ShinyButton';
import BorderButton from '@/components/ui/border-button';
import React, { useState, useTransition } from 'react';
import Globe from './globe';
import { cn } from '@/lib/utils';
import type { User } from 'next-auth';
import { toast } from 'sonner';
import { serverCreateNewTravelPlan } from '@/actions/planner';
import type { User as DbUser, TravelPlan } from '@prisma/client';
import PlanItem from './plan-item';
import PlanItemCreate from './plan-item-create';
import { usePathname } from 'next/navigation';

export interface DBUserWithTravelPlan extends DbUser {
  TravelPlan: TravelPlan[];
}

export default function Intro({
  user,
  dbUser,
}: {
  user: User | undefined;
  dbUser: DBUserWithTravelPlan | null;
}) {
  const [globeHover, setGlobeHover] = useState(false);
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();

  const handleClick = () => {
    if (user) {
      startTransition(async () => {
        await serverCreateNewTravelPlan(user.id, pathname);
        toast.success('Başarıyla yeni seyehat planı oluşturuldu.');

      });
    } else {
      toast.error('Bunu yapabilmeniz için giriş yapmanız gerek.');
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-4 items-center justify-center ">
      <BorderButton>Yapay Zekâ Destekli</BorderButton>

      <div className="text-center space-y-2">
        <h1 className="text-5xl font-semibold">Seyehat Planlayıcı</h1>
        <p className="text-muted-foreground text-sm">
          Özel ve Kişiselleştirilmiş Seyahat Planınızı Oluşturun
        </p>
      </div>
      {dbUser?.TravelPlan && dbUser?.TravelPlan.length > 0 ? (
        <div className="flex flex-col gap-y-3 md:gap-y-0 md:flex-row overflow-x-scroll md:gap-x-3">
          {dbUser.TravelPlan.map((travelPlan, i) => (
            <PlanItem key={i} plan={travelPlan} />
          ))}
          {dbUser.TravelPlan.length < 3 && <PlanItemCreate dbUser={dbUser} />}
        </div>
      ) : (
        <ShinyButton
          onClick={handleClick}
          onMouseEnter={() => setGlobeHover(true)}
          onMouseLeave={() => setGlobeHover(false)}
          label="başla"
          disabled={isPending}
        />
      )}
      <div
        className={cn(
          '-z-10 transition duration-700 pointer-events-none absolute inset-0 w-full [mask-image:radial-gradient(ellipse_at_50%_100%,transparent_5%,black)] dark:[mask-image:radial-gradient(ellipse_at_50%_100%,transparent_20%,black)]',
          globeHover && 'drop-shadow-[0_0px_55px_rgba(255,_255,_255,_0.7)]'
        )}
      >
        <Globe />
      </div>
    </div>
  );
}
