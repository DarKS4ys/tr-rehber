'use client';
import { useFormStatus } from 'react-dom';
import { ComponentProps } from 'react';
import { Button } from './ui/button';

type FormSubmitButton = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<'button'>;

export default function FormSubmitButton({
  children,
  className,
}: FormSubmitButton) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className={`${className} btn btn-primary `}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </Button>
  );
}
