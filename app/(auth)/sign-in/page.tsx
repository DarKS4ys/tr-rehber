import SignIn from '@/components/Auth/SignIn';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};
const Page = async ({ searchParams }: Props) => {

  return (
    <div className="h-full p-20 mx-auto flex flex-col items-center justify-center">
      <Link href="/" className="flex gap-2 mb-4">
        <ChevronLeft />Home
      </Link>
      <SignIn error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
    </div>
  );
};

export default Page;
