import Image from 'next/image';
import UserAuthForm from './UserAuthForm';
/* import Logo from '@/public/NexifyLogo.svg' */

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
  authLocal: any;
};

const SignIn = (props: Props) => {

  const { authLocal } = props;
  return (
    <div className="container mx-auto flex w-full my-4 flex-col justify-center sm:w-[w-400px]">
      <div className="flex text-center flex-col items-center gap-4">
        {/* <Image alt="Nexify Logo" src={Logo} height={50} width={50}/> */}
        <h1 className="font-semibold text-3xl tracking-tight">{authLocal.title}</h1>
        <UserAuthForm callbackUrl={props.callbackUrl}/>
      </div>
    </div>
  );
};

export default SignIn;
