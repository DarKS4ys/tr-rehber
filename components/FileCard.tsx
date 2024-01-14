import { File } from '@prisma/client';
import { Session, User } from 'next-auth';
import React from 'react';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog';
import { IoMdClose } from 'react-icons/io';
import Delete from './Delete';
import { Button } from './ui/button';
import { AiFillEye } from 'react-icons/ai';
import Image from 'next/image';
import CopyToClipboardButton from './Clipboard';
import { BiDownload, BiVideo } from 'react-icons/bi';
import { FaFilePdf } from 'react-icons/fa';
import Link from 'next/link';
import ProfileImg from '@/public/profile-pic-placeholder.png';

interface FileCardProps {
  session: Session | null;
  file: File & { user: User }; // Combine FileType with User type
  fileCardLocalization: any;
}

export const FileCard: React.FC<FileCardProps> = ({ fileCardLocalization, session, file }) => (
  <div className="flex flex-col gap-4 rounded-xl p-10 bg-primary/10 mx-auto w-full">
    <div className="relative group w-full h-80 aspect-square rounded-lg">
      {session?.user.status == 'Admin' && (
        <Dialog>
          <DialogTrigger className="absolute -right-4 -top-4 z-40 p-2 bg-red-500 hover:bg-red-600 hover:scale-110 active:scale-95 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200">
            <IoMdClose size={20} />
          </DialogTrigger>
          <DialogContent className="w-80 flex flex-col items-center justify-center gap-4 py-6">
            <h1 className="text-xl font-semibold text-center">
              {fileCardLocalization.warn}
            </h1>
            <div className="flex items-center gap-3">
              <Delete
                user={session.user}
                fileUrl={file.fileUrl}
                fileId={file.id}
                type="file"
              />
              <DialogClose>
                <Button>{fileCardLocalization.cancel}</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <div className="z-20 absolute flex gap-2 top-0 left-0 rounded-lg bg-black/40 dark:bg-black/60 group-hover:backdrop-blur w-full h-full items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 text-white flex flex-col items-center hover:scale-110 active:scale-90 transition duration-200">
              <AiFillEye size={52} />
              {fileCardLocalization.view}
            </button>
          </DialogTrigger>
          <DialogContent className="uppercase w-[80vw] text-lg font-medium pb-10 items-center flex flex-col">
            <h1>{fileCardLocalization.preview}</h1>
            {file.fileUrl.endsWith('.pdf') ? (
              <iframe
                src={`https://docs.google.com/gview?url=${file.fileUrl}&embedded=true`}
                className="w-full h-[75vh] rounded-lg"
              />
            ) : file.fileUrl.endsWith('.mp4') ||
              file.fileUrl.endsWith('.avi') ||
              file.fileUrl.endsWith('.mkv') ? (
              <video controls className="w-full h-[75vh] rounded-lg">
                <source src={file.fileUrl} type="video/mp4" />
                {fileCardLocalization.videoError}
              </video>
            ) : (
              <div className="w-[77vw] h-[75vh] relative rounded-lg mx-auto overflow-hidden">
                <Image
                  fill
                  alt="Image Full"
                  className="object-cover"
                  src={file.fileUrl}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
        <div className="h-20 w-0.5 bg-white/50" />
        <CopyToClipboardButton
          textToCopy={file.fileUrl}
          buttonText={fileCardLocalization.copyLink}
        />
      </div>
      {file.fileUrl.endsWith('.mp4') ||
      file.fileUrl.endsWith('.avi') ||
      file.fileUrl.endsWith('.mkv') ? (
        <BiVideo className="justify-center items-center w-full h-full flex p-2" />
      ) : file.fileUrl.endsWith('.pdf') ? (
        <FaFilePdf className="justify-center items-center w-full h-full flex p-8" />
      ) : (
        <Image
          fill
          className="object-cover rounded-xl"
          alt="File"
          src={file.fileUrl}
        />
      )}
    </div>
    <div className="flex gap-2 items-center font-medium">
      <div className="relative overflow-hidden w-10 h-10 aspect-square rounded-full">
        <Image
          fill
          className="object-cover"
          alt="File"
          src={file.user.image || ProfileImg}
        />
      </div>
      <h1>{file.user.name}</h1>
      <Link className="ml-auto" href={file.downloadUrl}>
        <Button className="gap-2">
          <BiDownload />
          {fileCardLocalization.download}
        </Button>
      </Link>
    </div>
  </div>
);
