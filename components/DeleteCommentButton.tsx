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
  placeLocal: any
}

export default function DeleteCommentButton({ commentUserId, userId, commentId, deleteComment, placeLocal }: DeleteCommentButtonProps) {
  const handleDeleteComment = async () => {
    try {
      const response: any = await deleteComment(commentId, userId, commentUserId);

      if (response.success) {
        toast.success(placeLocal.comments.successDelete);
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message || placeLocal.comments.errorDelete);
    }
  };

  return (
    <Button
    variant={'destructive'}
      className="text-lg fond-bold flex items-center gap-2 w-full"
      onClick={() => {
        startTransition(() => {
          handleDeleteComment();
        });
      }}
    >
      <BsTrash />
      <p>{placeLocal.comments.delete}</p>
    </Button>
  );
}
