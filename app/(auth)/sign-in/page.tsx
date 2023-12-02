import SignIn from '@/components/Auth/SignIn';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const page: FC = (props: Props) => {
  return (
    <div className="h-full p-20 mx-auto flex flex-col items-center justify-center">
      <Link href="/" className="flex gap-2 mb-4"><ChevronLeft />Home</Link>
      <SignIn error={props.searchParams?.error} callbackUrl={props.searchParams?.callbackUrl} />
    </div>
  );
};

export default page;
