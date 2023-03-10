import React from "react";
import NavBar from "../components/NavBar";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface searchParams {
    city?: string;
    cuisine?: string;
    price?: PRICE;
}

const fetchSearchRestaurant = async (searchParams: searchParams) => {
    const where: any = {};
    if (searchParams.city) {
        const location = {
            name: {
                equals: searchParams.city.toLowerCase(),
            },
        };
        where.location = location;
    }
    if (searchParams.cuisine) {
        const cuisine = {
            name: {
                equals: searchParams.cuisine,
            },
        };
        where.cuisine = cuisine;
    }
    if (searchParams.price) {
        const price = {
            equals: searchParams.price,
        };
        where.price = price;
    }

    const select = {
        id: true,
        name: true,
        main_image: true,
        price: true,
        cuisine: true,
        location: true,
        slug: true,
        reviews: true,
    };

    return await prisma.restaurant.findMany({
        where,
        select,
    });
};

const fetchLocations = async () => {
    return prisma.location.findMany();
};
const fetchCuisines = async () => {
    return prisma.cuisine.findMany();
};

async function Search({ searchParams }: { searchParams: searchParams }) {
    const restaurants = await fetchSearchRestaurant(searchParams);

    const locations = await fetchLocations();
    const cuisines = await fetchCuisines();

    return (
        <>
            <Header />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
                <div className="w-5/6">
                    {restaurants.length < 1 && <p>Sorry, We got no restaurant in this area</p>}
                    {restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Search;
