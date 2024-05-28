'use client';
import { serverUpdateTravelPlan } from '@/actions/planner';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function PlanRenameForm({
  planId,
  planName,
  onCancel,
  loading,
  setLoading,
  name,
  setName
}: {
  planId: string | undefined;
  planName: string | undefined;
  onCancel: () => void;
  loading: boolean;
  setLoading: (newState: boolean) => void;
  setName: (newState: string) => void;
  name: string;
}) {

  const pathname = usePathname();

  const handleSubmit = async () => {
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await handleSubmit();
    }
  };
  return (
    <input
      ref={inputRef}
      type="text"
      value={name}
      disabled={loading}
      onBlur={onCancel}
      onKeyDown={handleKeyDown}
      onChange={(e) => setName(e.target.value)}
      placeholder={planName}
      className="font-semibold disabled:opacity-50 disabled:cursor-not-allowed w-fit rounded-lg text-lg py-1 px-2 hover:bg-primary/20 transition text-start"
    />
  );
}
