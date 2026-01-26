import React from 'react'

const DashboardLayout = ({ children, params }: { children: React.ReactNode, params: any }) => {
  return (
    <main className='flex overflow-hidden h-screen' >
        {children}
    </main  >
  )
}

export default DashboardLayout