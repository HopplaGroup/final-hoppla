"use client";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useCreateUserReview } from "@/lib/hooks";

export default function AddReview({ revieweeId }: { revieweeId: string }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { mutate } = useCreateUserReview({
    // optimisticUpdate: true,
  });

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="w-full">
          <div className="mt-4 bg-white shadow-sm rounded-lg p-5">
            <div className="flex items-center justify-center gap-2 font-medium">
              <Plus size={22} /> Add Review
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Review</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="w-full">
                <Rating allowFraction onClick={handleRating} />
              </div>
              <div className="mt-4">
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200"
                  placeholder="Write a review..."
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                mutate({
                  data: {
                    rating,
                    comment: review,
                    revieweeId: revieweeId,
                  },
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
