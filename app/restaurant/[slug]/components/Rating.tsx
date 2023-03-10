import React from "react";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import { Review } from "@prisma/client";
import Stars from "@/app/components/Stars";

function Rating({ reviews }: { reviews: Review[] }) {
    const averageRating = calculateReviewRatingAverage(reviews).toFixed(1);
    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <p>
                    <Stars reviews={reviews} />
                </p>
                <p className="text-reg ml-3">{averageRating}</p>
            </div>
            <div>
                <p className="text-reg ml-4">{reviews.length} Reviews</p>
            </div>
        </div>
    );
}

export default Rating;
