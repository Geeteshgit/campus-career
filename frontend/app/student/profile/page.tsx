import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import React from 'react'

const Profile = (): React.JSX.Element => {
  return (
    <>
    <Navbar />
    <main className="max-w-7xl flex flex-col gap-8 mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white">
        <PageHeader title='My Profile' />
    </main>
    </>
  )
}

export default Profile