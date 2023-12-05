import React from 'react'
import UploadAI from './UploadAI'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function page() {
    const session = await getServerSession(authOptions)
  return (
    <div className='p-12'>
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
            <h1>Upload new PDFs to populate the knowledge of the AI</h1>
            <UploadAI session={session}/>
        </div>
    </div>
  )
}
