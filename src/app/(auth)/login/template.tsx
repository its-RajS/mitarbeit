import React from 'react'

interface TemplateProps {
    children: React.ReactNode
}

const Template = ({ children }: TemplateProps) => {
    return (
        <div className="flex h-screen p-6 justify-center">
            {children}
        </div>
    )
}

export default Template