'use client';

import * as React from 'react';
import { useEdgeStore } from '../lib/edgestore';
import { getDownloadUrl } from '@edgestore/react/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import Image from 'next/image';
import { prisma } from '@/lib/db/prisma';
import type { Session } from 'next-auth';
import { saveFileToDB } from '@/actions/actions';

export default function Upload({session}: {session: Session | null}) {

  const [file, setFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>()
  const [loading, setLoading] = React.useState<boolean>(false)

  const { edgestore } = useEdgeStore();

  return (
    <div className='flex flex-col gap-4'>
        <div className="flex gap-2">
        <Input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        <Button
          disabled={loading}
          onClick={async () => {
            if (file) {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  setProgress(progress)
                },
              });
              try {
                setLoading(true)
              } catch(error) {
                console.log(error)
              } finally {
                setLoading(false)
                const downloadUrl = getDownloadUrl(
                  res.url,
                );
                saveFileToDB(res.url, downloadUrl, session?.user.id)
                /* console.log(DownloadUrl) */
                /* console.log('Client Data: ' + res.url); */
              }
            }
          }}
        >
          Upload
        </Button>
      </div>
      {progress !== undefined && progress !== null && progress !== 100 && progress > 1 && (
        <Progress value={progress} />
      )}
    </div>
  );
}