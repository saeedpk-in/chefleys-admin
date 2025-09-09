import { CreateAdminForm } from '@/components/forms/CreateAdminForm'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xl">
        <CreateAdminForm />
      </div>
    </div>
  )
}

export default page