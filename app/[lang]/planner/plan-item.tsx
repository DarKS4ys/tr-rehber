import type { TravelPlan } from '@prisma/client';
import Image from 'next/image';
import React, { useTransition } from 'react';
import placeholderPlanImage from '@/public/travelplan.png';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';
import { Trash } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { serverDeleteNewTravelPlan } from '@/actions/planner';

export default function PlanItem({ plan }: { plan: TravelPlan }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    startTransition(async () => {
      await serverDeleteNewTravelPlan(plan.id, pathname);
      toast.success('Başarıyla seyehat planı kaldırıldı.');

    });
  };

  return (
    <div onClick={() => router.push(`planner/${plan.id}`)}>
      <Card className="cursor-pointer hover:bg-card/50 duration-200 active:scale-95 backdrop-blur-lg transition">
        <CardContent>
          <Image
            src={plan.imageUrl || placeholderPlanImage}
            width={512}
            height={512}
            className="rounded-lg h-48 w-48 mt-8 bg-primary/10 p-4 relative object-contain"
            alt="Travel Plan Image"
          />
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="absolute top-2 rounded-lg right-2 bg-red-400 hover:bg-red-500 transition p-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash />
          </button>
        </CardContent>
        <CardFooter className="text-lg font-medium">{plan.name}</CardFooter>
      </Card>
    </div>
  );
}

/*     <div className="bg-primary w-64 h-64 text-primary-foreground p-4 rounded-xl flex flex-col gap-y-2">
        <div className="bg-primary-foreground/10 rounded-lg w-full h-full relative">
        <Image src={plan.imageUrl || placeholderPlanImage} fill className='object-contain' alt='Travel Plan Image'/>
        </div>
      <h1 className="font-semibold text-lg">{plan.name}</h1>
    </div> */
