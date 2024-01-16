'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { AiOutlineLoading } from 'react-icons/ai';
import {FaDiscord, FaGoogle} from 'react-icons/fa'
import { Button } from '../ui/button';

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const UserAuthForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDiscord, setIsLoadingDiscord] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google',{
        redirect: true,
        callbackUrl: props.callbackUrl ?? '/'
      });
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  const loginWithDiscord = async () => {
    setIsLoadingDiscord(true);
    try {
      await signIn('discord',{
        redirect: true,
        callbackUrl: props.callbackUrl ?? '/'
      });
    } catch (error) {

    } finally {
      setIsLoadingDiscord(false);
    }
  };

  return (
    <div className='flex flex-col gap-2 items-center justify-center w-full'>
      <Button
        onClick={loginWithGoogle}
        disabled={isLoading}
        className="w-full md:w-3/6 lg:w-2/6 flex gap-2"
      >
        {isLoading ? <AiOutlineLoading className="animate-spin"/> : <FaGoogle size={20}/>}
        <h1>Google</h1>
      </Button>

      <Button
        onClick={loginWithDiscord}
        disabled={isLoadingDiscord}
        className="w-full md:w-3/6 lg:w-2/6 flex gap-2"
      >
        {isLoadingDiscord ? <AiOutlineLoading className="animate-spin"/> : <FaDiscord size={20}/>}
        <h1>Discord</h1>
      </Button>
    </div>
  );
};

export default UserAuthForm;
