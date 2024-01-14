'use client';

import { Comment, Place, User } from '@prisma/client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Locale } from '@/i18n.config';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Input } from './ui/input';
import { approveComment, deleteComment } from '@/actions/actions';

interface AdminTableProps {
  comments: (Comment & { user: User } & { place: Place })[];
  lang: Locale;
  page: number;
  pageSize: number;
  totalCount: number;
  userStatus: string | undefined;
  localization: any;
}

export default function AdminTable({
  totalCount,
  comments,
  lang,
  page,
  pageSize,
  userStatus,
  localization
}: AdminTableProps) {
  const hasMoreResults = page * pageSize < totalCount;
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [deleteComments, setDeleteComments] = useState<string[]>([]);

  const handleCheckboxChange = (commentId: string) => {
    const isSelected = selectedComments.includes(commentId);

    if (isSelected) {
      setSelectedComments((prevSelected) =>
        prevSelected.filter((id) => id !== commentId)
      );
    } else {
      setSelectedComments((prevSelected) => [...prevSelected, commentId]);
    }
  };

  const handleDeleteChange = (commentId: string) => {
    const isSelected = deleteComments.includes(commentId);

    if (isSelected) {
      setDeleteComments((prevSelected) =>
        prevSelected.filter((id) => id !== commentId)
      );
    } else {
      setDeleteComments((prevSelected) => [...prevSelected, commentId]);
    }
  };

  const handleApproveButtonClick = () => {
    approveComment(selectedComments, userStatus, page, pageSize)
    /* console.log('Selected Comments:', selectedComments); */
  };

  const handleDeleteButtonClick = () => {
    deleteComment(deleteComments, userStatus, true)
    /* console.log('Selected Comments:', deleteComments); */
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleApproveButtonClick}
          disabled={selectedComments.length === 0}
        >
          {localization.approveButton}
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDeleteButtonClick}
          disabled={deleteComments.length === 0}
        >
          {localization.deleteButton}
        </button>
      </div>
      <div className="border boder-boder overflow-hidden rounded-lg">
        <Table>
          <TableCaption>
            <div className="gap-2 flex w-full items-center justify-center pb-4">
              {page > 1 && (
                <Link href={`?page=${page - 1}&pageSize=${pageSize}`}>
                  <ArrowLeft />
                </Link>
              )}
              <h1>{`${localization.showing} ${
                comments.length + 10 * (page - 1)
              } - ${totalCount} ${localization.results}`}</h1>
              {hasMoreResults && (
                <Link href={`?page=${page + 1}&pageSize=${pageSize}`}>
                  <ArrowRight />
                </Link>
              )}
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{localization.date}</TableHead>
              <TableHead>{localization.commentator}</TableHead>
              <TableHead>{localization.message}</TableHead>
              <TableHead>{localization.place}</TableHead>
              <TableHead className="w-32 text-center">{localization.allow}</TableHead>
              <TableHead className="text-right w-8">{localization.delete}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {comment.createdAt.toLocaleString()}
                </TableCell>
                <TableCell>{comment.user.name}</TableCell>
                <TableCell className="break-all">{comment.text}</TableCell>
                <TableCell>
                  {(comment.place.name as { [key in Locale]: string })[lang]}
                </TableCell>
                <TableCell className="w-32 text-center">
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    checked={selectedComments.includes(comment.id)}
                    onChange={() => handleCheckboxChange(comment.id)}
                    className="relative h-[1.125rem] w-[1.125rem] appearance-none 
                    rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none 
                    before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent 
                    before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary 
                    checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] 
                    checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 
                    checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid
                  checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer 
                    hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] 
                    focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] 
                    focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
                    focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] 
                    focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100
                    checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
                    checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] 
                    checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 
                    checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-primary-foreground checked:focus:after:bg-transparent
                  dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary 
                    dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:after:border-primary-foreground"
                  />
                </TableCell>
                <TableCell className="w-8 text-center">
                <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    checked={deleteComments.includes(comment.id)}
                    onChange={() => handleDeleteChange(comment.id)}
                    className="relative h-[1.125rem] w-[1.125rem] appearance-none 
                    rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none 
                    before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent 
                    before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary 
                    checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] 
                    checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 
                    checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid
                    checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer 
                    hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] 
                    focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] 
                    focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
                    focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] 
                    focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100
                    checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
                    checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] 
                    checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 
                    checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-primary-foreground checked:focus:after:bg-transparent
                  dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary 
                    dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:after:border-primary-foreground"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
