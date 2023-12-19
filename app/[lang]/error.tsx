"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ErrorPage({error}: {error: Error}) {
    const router = useRouter()
    return (
        <div className='flex flex-col py-[24dvh] items-center justify-center gap-3'>
{/*             <Image alt='Stoic Logo' src={Logo} placeholder='blur' className='rounded w-20 h-20 mb-2'/> */}
            <h2 className='text-7xl font-medium leading-[3rem]'>Error!</h2>
            <h3 className='text-2xl 2xl:text-3xl font-medium'>Something went wrong.</h3>
            <p>{error.message}</p>
            <Link href="/">
            <Button onClick={router.refresh} variant={'outline'}>Refresh the page</Button>
            </Link>
        </div>
    )
}