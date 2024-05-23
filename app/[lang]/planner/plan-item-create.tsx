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
import { DBUserWithTravelPlan } from './intro';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { serverCreateNewTravelPlan } from '@/actions/planner';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

export default function PlanItemCreate({
  dbUser,
}: {
  dbUser: DBUserWithTravelPlan;
}) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname()

  const handleClick = () => {
    if (dbUser) {
      startTransition(async () => {
        await serverCreateNewTravelPlan(
          dbUser.id,
          pathname,
          dbUser.TravelPlan.length + 1
        );
      });
      toast.success('Başarıyla yeni seyehat planı oluşturuldu.');
    } else {
      toast.error('Bunu yapabilmeniz için giriş yapmanız gerek.');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Card className="hover:bg-card/50 duration-200 active:scale-95 backdrop-blur-lg transition">
        <CardContent>
          <div className="rounded-lg h-48 w-48 mt-8 bg-primary/10 p-4 relative object-contain">
            <AiOutlinePlusCircle className="w-full h-full" />
          </div>
        </CardContent>
        <CardFooter className="text-lg font-medium">
          Yeni Plan Oluştur
        </CardFooter>
      </Card>
    </button>
  );
}
