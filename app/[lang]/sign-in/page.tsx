import SignIn from '@/components/Auth/SignIn';
import type { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
  params: {
    lang: Locale;
  };
};
const Page = async ({ searchParams, params }: Props) => {

  const {authLocal} = await getDictionary(params.lang)

  return (
    <div className="h-full p-20 mx-auto flex flex-col items-center justify-center">
      <Link href={`/${params.lang}/`} className="hover:underline flex gap-2 mb-4">
        <ChevronLeft />{authLocal.home}
      </Link>
      <SignIn authLocal={authLocal} error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
    </div>
  );
};

export default Page;
