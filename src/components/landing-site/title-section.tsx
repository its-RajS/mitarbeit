import React from 'react'

interface TitleSectionProps {
    title: string
    subheading?: string
    pill: string
}

const TitleSection = ({ title, subheading, pill }: TitleSectionProps) => {
    return (
        <React.Fragment>
            <section
                className='flex flex-col gap-4 items-start justify-center md:items-center '
            >
                <article className="rounded-full p-px text-sm bg-linear-to-r from-primary-blue-500 to-primary-blue-600">
                    <div className="rounded-full px-3 py-1 bg-background">{pill}</div>
                </article>
                {subheading ? (
                    <>
                        <h2 className="text-left text-3xl sm:text-5xl sm:max-w-[750px] md:text-center font-semibold">
                            {title}
                        </h2>
                        <p className="text-washed-purple-700 sm:max-w-[450px] md:text-center">
                            {subheading}
                        </p>
                    </>
                ) : (
                    <h1 className="text-left text-4xl sm:text-6xl sm:max-w-[800px] md:text-center font-semibold">
                        {title}
                    </h1>
                )}
            </section>
        </React.Fragment>
    )
}

export default TitleSection