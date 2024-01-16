
import type { Session } from "next-auth"
import Image from "next/image"
import profilePicPlaceholder from '@/public/profile-pic-placeholder.png'
import { signIn, signOut } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { truncateText } from "@/lib/utils"
import { FiSettings } from "react-icons/fi"
import Link from "next/link"
import { FaScrewdriverWrench } from "react-icons/fa6";
import { MdPlace } from "react-icons/md";
import type { Locale } from "@/i18n.config"


interface UserMenuButtonProps {
    session: Session | null
    userMenu: any
    lang: Locale
    local: string
}

export default function UserMenuButton({ local, lang, session, userMenu }: UserMenuButtonProps) {
    const user = session?.user

  return (
    <div className="flex items-center">
        {user ? 
            <div className="flex gap-2 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Image src={user?.image || profilePicPlaceholder} alt="Profile Picture" width={64} height={64} className="border border-border w-12 rounded-full aspect-square" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2">
                        <DropdownMenuLabel>
                            <div>
                                <span className="flex justify-between gap-2 items-center font-medium">
                                    
                                    <h1 className="text-lg">{truncateText(user.name, 12)}</h1>

                                    -

                                    <h2 className="text-lg">
                                        {user.status}
                                    </h2>
                                </span>
                                <h1 className="text-sm text-muted-foreground font-light">{truncateText(user.email, 25)}</h1>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator/>
                        
{/*                         <Link href='/settings'>
                            <DropdownMenuItem className="gap-2 flex text-lg items-center opacity-90 hover:opacity-100 transition">
                                <FiSettings/>
                                <h1>{userMenu.settings}</h1>
                            </DropdownMenuItem>
                        </Link> */}

                        <Link href={`/${lang}/saved-places`}>
                            <DropdownMenuItem className="gap-2 flex text-lg items-center opacity-90 hover:opacity-100 transition">
                                <MdPlace />
                                <h1>{userMenu.saved}</h1>
                            </DropdownMenuItem>
                        </Link>


                        {user.status == 'Admin' &&
                        <Link href={`/${lang}/admin`}>
                            <DropdownMenuItem className="gap-2 flex text-lg items-center opacity-90 hover:opacity-100 transition">
                            <FaScrewdriverWrench />
                                <h1>{userMenu.admin}</h1>
                            </DropdownMenuItem>
                        </Link>
                        }

                        <Button className="w-full mt-1" onClick={() => signOut({callbackUrl: "/"})}>{userMenu.logout}</Button>
                         
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        :
            <div>
                {/* <Button onClick={() => signIn()}>Sign In</Button>  */}
                <Link href={`/${lang}/sign-in`}><Button>{local}</Button></Link>
            </div>
        }
    </div>
  )
}
