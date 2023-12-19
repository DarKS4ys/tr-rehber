"use client"

import { startTransition } from "react";
import { BsTrash } from "react-icons/bs";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface DeleteCommentButtonProps {
  deleteComment: any;
  commentId: string;
  commentUserId: string;
  userId: string;
}

export default function DeleteCommentButton({ commentUserId, userId, commentId, deleteComment }: DeleteCommentButtonProps) {
  const handleDeleteComment = async () => {
    try {
      const response: any = await deleteComment(commentId, userId, commentUserId);

      if (response.success) {
        toast.success('Comment deleted.');
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message || 'Could not delete the comment.');
    }
  };

  return (
    <Button
    variant={'destructive'}
      className="text-lg fond-bold flex items-center gap-2"
      onClick={() => {
        startTransition(() => {
          handleDeleteComment();
        });
      }}
    >
      <BsTrash />
      <p>Delete</p>
    </Button>
  );
}
