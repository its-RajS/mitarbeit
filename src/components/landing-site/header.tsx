"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import tempLogo from '../../../public/tempLogo.svg'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const routes = [
    {
        title: 'Features', href: '#features'
    },
    {
        title: 'Resources', href: '#resources'
    },
    {
        title: 'Pricing', href: '#pricing'
    },
    {
        title: 'Testimonials', href: '#testimonials'
    }
]

const components: { title: string; href: string; description: string }[] = [
    {
      title: 'Alert Dialog',
      href: '#',
      description:
        'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
      title: 'Hover Card',
      href: '#',
      description:
        'For sighted users to preview content available behind a link.',
    },
    {
      title: 'Progress',
      href: '#',
      description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
      title: 'Scroll-area',
      href: '#',
      description: 'Visually or semantically separates content.',
    },
    {
      title: 'Tabs',
      href: '#',
      description:
        'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
      title: 'Tooltip',
      href: '#',
      description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
  ];
  
const Header = () => {

    const [path, setPath] = useState('#products')
    
  return (
        <header className="flex items-center justify-center p-4">
            <Link href='/' className='flex items-center justify-left w-full ' >
                <Image src={tempLogo} alt='Mitarbeit Logo' width={40} height={40} />
                <span className='text-white font-semibold text-2xl first-letter:ml-2'>Mitarbeit</span>
            </Link>

            <NavigationMenu className='hidden md:block' >
                <NavigationMenuList className='gap-4' >
                    <NavigationMenuItem>
                        <NavigationMenuTrigger onClick={() => setPath('#resources')} className={cn({
                            'text-white': path === '#resources',
                            'text-neutrals-8': path !== '#resources',
                            'font-normal' : true,
                            'text-xl' : true,
                        })} >
                            Resources
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className='grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]' >
                                <li className='row-span-3' >
                                    <span className="
                                        flex w-full h-full flex-col select-none justify-end rounded-md p-6 no-underline focus:shadow-md outline-none bg-linear-to-b
                                        from-neutrals-13 to-neutrals-12 text-neutrals-1
                                    ">
                                        Welcome
                                    </span>
                                </li>
                                <ListItem href='#' title='Resources'>
                                    Re-usable components built with Tailwind CSS.
                                </ListItem>
                                <ListItem href='#' title='Getting Started'>
                                    How to install dependencies and structure your app.
                                </ListItem>
                                <ListItem href='#' title='Styles'>
                                    Styles for headings, paragraphs, lists...etc.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                        onClick={() => setPath('#pricing')}
                        className={cn({
                            'text-white': path === '#pricing',
                            'text-neutrals-8': path !== '#pricing',
                            'font-normal': true,
                            'text-xl': true,
                        })}
                        >
                        Pricing
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:grid-row-2  ">
                            <ListItem
                            title="Pro Plan"
                            href={'#'}
                            >
                            Unlock full power with collaboration.
                            </ListItem>
                            <ListItem
                            title={'Free Plan'}
                            href={'#'}
                            >
                            Great for teams just starting out.
                            </ListItem>
                        </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                        onClick={() => setPath('#testimonials')}
                        className={cn({
                            'text-white': path === '#testimonials',
                            'text-neutrals-8': path !== '#testimonials',
                            'font-normal text-xl': true,
                        })}
                        >
                            Testimonials
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul
                                className="grid w-[400px]
                            gap-3
                            p-4
                            md:w-[500px]
                            md:grid-cols-2 
                            lg:w-[600px]
                            "
                            >
                                {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                </NavigationMenuItem>
                </NavigationMenuList> 
            </NavigationMenu>
            <aside
                className="flex
                w-full
                gap-2
                justify-end"
            >
                <Link href={'/login'}>
                <Button
                    variant="btn-secondary"
                    className=" p-1 hidden sm:block"
                >
                    Login
                </Button>
                </Link>
                <Link href="/signup">
                <Button
                    variant="btn-primary"
                    className="whitespace-nowrap"
                >
                    Sign Up
                </Button>
                </Link>
            </aside>
        </header>
  )
}

export default Header

    const ListItem = ({className, title, children, href, ...props}: React.ComponentPropsWithoutRef<'li'> & {href: string, title: string, children: React.ReactNode}) =>  {

    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className={cn('group block select-none leading-none font-medium space-y-1', className)}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className='group-hover:text-neutrals-5 text-sm text-neutrals-8 line-clamp-2 leading-snug'>
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

ListItem.displayName = 'ListItem'