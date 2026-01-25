import TitleSection from '@/components/landing-site/title-section'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Banner from '../../../public/appBanner.png'
import { CLIENTS, PRICING_CARDS, PRICING_PLANS, USERS } from '@/lib/constants'
import Calender from '../../../public/Calendar.png'
import avatar1 from '../../../public/avatar1.png'
import Fire from '../../../public/Fire.png'
import Check from '../../../public/Check.png'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import CustomCard from '@/components/landing-site/custom-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardContent, CardDescription, CardTitle } from '@/components/ui/card'
const HomePage = () => {
    return (
        <>
            {/* //? Hero Section */}
            <section>

                <div
                    className='overflow-hidden px-4 sm:px-6 sm:flex sm:flex-col gap-4 mt-10 md:justify-center md:items-center '
                >
                    <TitleSection pill='✨ Your WorkSpace, Perfected' title='All-in-one Collaboration and Productivity Platform' />

                    <div className="p-[2px] mt-6 rounded-xl bg-linear-to-r from-primary-blue-500 to-primary-blue-600 sm:w-[300px]">
                        <Button
                            className='w-full rounded-[10px] p-6 text-2xl bg-background'>
                            Get Mitarbeit Free
                        </Button>
                    </div>
                    {/* //! Image at back of the button */}
                    <div className="w-full flex justify-center items-center relative mt-[-40px] ml-[-50px] md:mt-[-70px] sm:w-full sm:ml-0 ">
                        <Image
                            src={Banner}
                            alt="Application Banner"
                        />
                        {/* Shadow effect */}
                        <div className="bottom-0 left-0 right-0 absolute z-10 top-[50%] bg-linear-to-t from-background to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* //? Slide animation */}
            <section className="realtive">
                <div className="overflow-hidden flex after:content-[''] after:bg-linear-to-l after:to-transparent after:from-background after:absolute after:bottom-0 after:top-0 after:right-0 after:z-10 after:w-20 before:content-[''] before:bg-linear-to-r before:to-transparent before:from-background before:absolute before:bottom-0 before:top-0 before:left-0 before:z-10 before:w-20 ">
                    {
                        [...Array(2)].map((_, index) => (
                            <div key={index} className="flex flex-nowrap animate-slide">
                                {CLIENTS.map((client) => (
                                    <div key={client.alt} className="relative w-[200px] m-20 shrink-0 flex items-center ">
                                        <Image
                                            src={client.logo}
                                            alt={client.alt}
                                            width={200}
                                            className='object-contain max-w-none'
                                        />
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* //? Features */}
            <section className="flex items-center justify-center flex-col relative px-4 sm:px-6">
                {/* //! Background effect */}
                <div className="rounded-full h-32 absolute top-22 -z-10 bg-brand-primary-purple w-[30%] blur-[120px] " />
                <div className="flex flex-col overflow-x-hidden overflow-visible px-4 mt-10 sm:px-6">

                    <TitleSection
                        title="Keep track of your meeting all inone place"
                        pill="Features"
                        subheading='Capture your ideas, thoughts, and meeting notes in a structured and organized manner.'
                    />
                </div>
                <div className="flex items-center justify-center relative max-w-[750px] rounded-4xl border-8 border-washed-purple-400/60 mt-10">
                    <Image src={Calender}
                        alt='Banner'
                    />
                </div>
            </section>

            {/* //?Testimonials */}
            <section className='relative'>
                <div className="rounded-full h-32 absolute top-50 -z-10 bg-brand-primary-purple w-full blur-[120px] " />
                <div className="flex flex-col overflow-x-hidden overflow-visible px-4 mt-20 sm:px-6">
                    <TitleSection
                        title="Trusted by all"
                        pill="Testimonials"
                        subheading='Join thousands of satisfied users who rely on our platform for personal and professional productivity needs.'
                    />
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className={
                            twMerge(
                                clsx('mt-10 flex flex-nowrap gap-6 self-start', {
                                    'flex-row-reverse': index === 1,
                                    'animate-[slide_250s_linear_infinite]': true,
                                    'animate-[slide_250s_linear_infinite_reverse]': index === 1,
                                    'ml-[100vw]': index === 1,
                                }
                                ),
                                'hover:paused'
                            )
                        }>
                            {USERS.map((user, index) => (
                                <CustomCard key={index}
                                    className='w-[500px] shrink-0s rounded-xl bg-background'
                                    cardHeader={
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={avatar1.src} alt='avatar' />
                                                <AvatarFallback>RS</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className='text-foreground'>
                                                    {user.name}
                                                </CardTitle>
                                                <CardDescription className='text-washed-purple-400 mt-1' >
                                                    {user.name.toLocaleLowerCase()}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    }
                                    cardContent={
                                        <p className='text-washed-purple-400 mt-1' >
                                            {user.message.toLocaleLowerCase()}
                                        </p>
                                    }
                                ></CustomCard>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* //? Pricing plan */}
            <section className='mt-20 px-4 sm:px-6 relative '>
                <div className="rounded-full left-[35%] h-32 absolute top-40 -z-10 bg-brand-primary-purple w-[30%] blur-[120px] " />
                <TitleSection title='The Perfect Plan For You' pill='Pricing' subheading='Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to the next level.' />

                <div className="flex flex-col-reverse lg:flex-row-reverse sm:flex-row items-center justify-center sm:items-stretch mt-10 gap-4 ">
                    {PRICING_CARDS.map((card, index) => (
                        <CustomCard key={index} className={clsx('w-[400px] relative rounded-2xl dark:bg-black/40 background-blur-3xl ', {
                            'border-brand-primary-purple/70': card.planType === PRICING_PLANS.proplan
                        })}
                            cardHeader={
                                <CardTitle className='text-2xl font-semibold'>
                                    {
                                        card.planType === PRICING_PLANS.proplan && (
                                            <>
                                                <div className="hidden absolute w-full rounded-full top-0 h-32 bg-brand-primary-purple/80 -z-10 blur-[120px]" />

                                                <Image src={Fire} alt='Pro Plan Icon' className='absolute top-6 right-6' />
                                            </>
                                        )
                                    }
                                    {card.planType}
                                </CardTitle>
                            }
                            cardContent={
                                <CardContent className='p-0'>
                                    <span className='text-2xl font-semibold' >{card.price}</span>
                                    {+card.price > 0 ? (
                                        <span className='ml-1 text-washed-purple-400'>/month</span>
                                    ) : (
                                        ''
                                    )}
                                    <p className='text-washed-purple-400'>{card.description}</p>
                                    <Button className='whitespace-nowrap w-full mt-4 ' variant='btn-primary' >
                                        {card.planType === PRICING_PLANS.proplan ? 'Go Pro' : 'Get Started'}
                                    </Button>
                                </CardContent>
                            }
                            cardFooter={
                                <ul className='flex flex-col gap-4 mb-2 font-normal'>
                                    <small>{card.highlightFeature}</small>
                                    {card.freatures.map((feature, index) => (
                                        <li key={index} className='flex items-center gap-2'>
                                            <Image src={Check} alt='Check' className='size-5' />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            }
                        >

                        </CustomCard>
                    ))}
                </div>
            </section >
        </>
    )
}

export default HomePage