import type { Comment as PrismaComment, User } from '@prisma/client';
import AddCommentButton from './AddCommentButton';
import Image from 'next/image';
import defaultProfilePic from '@/public/profile-pic-placeholder.png';
import { BsThreeDots } from 'react-icons/bs';
import DeleteCommentButton from './DeleteCommentButton';
import { deleteComment, sendComment } from '@/actions/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Comment extends PrismaComment {
  user: User;
}

interface CommentsProps {
  comments: Comment[];
  placeId: string;
  user: User | null | undefined;
  placeLocal: any;
}

export default function Comments({
  user,
  placeId,
  comments,
  placeLocal,
}: CommentsProps) {
  const CommentTimestamp = ({ createdAt }: { createdAt: Date }) => {
    const commentDate = new Date(createdAt);
    const currentDate = new Date();

    // Check if the comment was made today
    const isToday = commentDate.toDateString() === currentDate.toDateString();

    // Format date & time
    const formattedDate = commentDate.toLocaleDateString();
    const formattedTime = commentDate.toLocaleTimeString();

    return (
      <p className="text-xs opacity-50">
        {isToday ? placeLocal.comments.today + ' ' + formattedTime : formattedDate}
      </p>
    );
  };
  if(user?.status == 'Admin') {
    console.log("sex")
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <AddCommentButton
        user={user}
        placeLocal={placeLocal}
        sendComment={sendComment}
        placeId={placeId}
      />
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-2 items-start">
          {comment.user.image ? (
            <Image
              width={72}
              height={72}
              src={comment.user.image}
              alt={comment.user?.name + "'s profile picture"}
              className="avatar w-12 h-12 rounded-full"
            />
          ) : (
            <Image src={defaultProfilePic} alt="Profile picture" />
          )}
          <div className="flex flex-col w-full">
            <div className="flex gap-2 items-center w-full">
              <p className="text-lg font-medium leading-tight">
                {comment.user?.name}
              </p>
              <CommentTimestamp createdAt={comment.createdAt} />
              { (user?.status === 'Admin' || (user && user.id === comment.user.id)) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="ml-auto">
                      <BsThreeDots size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteCommentButton
                      userId={user.id}
                      commentUserId={comment.user.id}
                      deleteComment={deleteComment}
                      userStatus={user.status}
                      commentId={comment.id}
                      placeLocal={placeLocal}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <p className="break-all leading-tight">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
