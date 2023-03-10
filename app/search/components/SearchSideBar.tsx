import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import React from "react";

const price = [
    { price: PRICE.CHEAP, label: "$$" },
    { price: PRICE.REGULAR, label: "$$$" },
    { price: PRICE.EXPENSIVE, label: "$$$$" },
];

function SearchSideBar({
    locations,
    cuisines,
    searchParams,
}: {
    locations: Location[];
    cuisines: Cuisine[];
    searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
    return (
        <div className="w-1/5">
            <div className="border-b pb-4">
                <h1 className="mb-2">Region</h1>
                <div className="flex flex-col">
                    {locations.map((location) => (
                        <Link
                            key={location.id}
                            href={{ pathname: "/search", query: { ...searchParams, city: `${location.name}` } }}
                            className="font-light text-reg">
                            {location.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="border-b pb-4 mt-3">
                <h1 className="mb-2">Cuisine</h1>
                <div className="flex flex-col">
                    {cuisines.map((cuisine) => (
                        <Link
                            key={cuisine.id}
                            href={{ pathname: "/search", query: { ...searchParams, cuisine: `${cuisine.name}` } }}
                            className="font-light text-reg cursor-pointer">
                            {cuisine.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-3 pb-4">
                <h1 className="mb-2">Price</h1>
                <div className="flex">
                    {price.map((pr, i) => (
                        <Link
                            key={i}
                            href={{ pathname: "/search", query: { ...searchParams, price: pr.price } }}
                            className="border w-full text-reg font-light rounded-l p-2  text-center">
                            {pr.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchSideBar;
