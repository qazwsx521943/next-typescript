import Stars from "@/app/components/Stars";
import { Review } from "@prisma/client";
import React from "react";

function Reviews({ review }: { review: Review }) {
    const fullname = review.first_name + " " + review.last_name;
    const shortname = review.first_name.split("")[0].concat(review.last_name.split("")[0]);
    console.log(fullname, shortname);
    return (
        <div className="border-b pb-7 mb-7">
            <div className="flex">
                <div className="w-1/6 flex flex-col items-center">
                    <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                        <h2 className="text-white text-2xl">{shortname}</h2>
                    </div>
                    <p className="text-center mt-2">{fullname}</p>
                </div>
                <div className="ml-10 w-5/6">
                    <div className="flex items-center">
                        <div className="flex mr-5">
                            <Stars rating={review.rating} reviews={[]} />
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="text-lg font-light">{review.text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reviews;
