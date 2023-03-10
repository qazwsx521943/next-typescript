import React from "react";
import Link from "next/link";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Price from "@/app/components/Price";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import Stars from "@/app/components/Stars";

interface Restaurant {
    id: number;
    name: string;
    main_image: string;
    price: PRICE;
    cuisine: Cuisine;
    location: Location;
    slug: string;
    reviews: Review[];
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
    const ratingText = () => {
        const averageRating = calculateReviewRatingAverage(restaurant.reviews);
        if (averageRating > 4) {
            return "awesome";
        } else if (averageRating > 3) {
            return "normal";
        } else return "don't try";
    };
    return (
        <div className="border-b flex pb-5 ml-4">
            <img src={restaurant.main_image} alt="" className="w-44 rounded" />
            <div className="pl-5">
                <h2 className="text-3xl">{restaurant.name}</h2>
                <div className="flex items-center">
                    <div className="flex ">
                        <Stars reviews={restaurant.reviews} />
                    </div>
                    <p className="ml-2 text-sm">{ratingText()}</p>
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <p className="mr-4">
                            <Price price={restaurant.price} />
                        </p>
                        <p className="mr-4">{restaurant.cuisine.name}</p>
                        <p className="mr-4">{restaurant.location.name}</p>
                    </div>
                </div>
                <div className="text-red-600">
                    <Link href="/restaurant/milestone-grill">View more information</Link>
                </div>
            </div>
        </div>
    );
}

export default RestaurantCard;
