'use client';
import React, { useState } from 'react';
import PlanRenameForm from './plan-rename-form';
import { serverUpdateTravelPlan } from '@/actions/planner';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

export default function PlanRenameButton({
  planId,
  planName,
}: {
  planId: string | undefined;
  planName: string | undefined;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(planName || '');

  const pathname = usePathname();

  const onCancel = async () => {
    setIsEditing(false);
    if (planId && planName != name) {
      try {
        setLoading(true);
        await serverUpdateTravelPlan(planId, { name }, pathname);
        toast.success('Plan başarıyla adlandırıldı.');
      } catch (err) {
        toast.error('Adlandırma sırasında hata oluştu...');
      } finally {
        setLoading(false);
      }
    }
  };

  const changeLoading = (newState: boolean) => {
    setLoading(newState);
  };

  const changeName = (newState: string) => {
    setName(newState);
  };

  return (
    <>
      {isEditing ? (
        <PlanRenameForm
          planId={planId}
          planName={planName}
          onCancel={onCancel}
          loading={loading}
          setLoading={changeLoading}
          setName={changeName}
          name={name}
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="font-semibold w-fit rounded-lg text-lg py-1 px-2 hover:bg-primary/20 transition text-start"
        >
          {planName}
        </button>
      )}
    </>
  );
}
