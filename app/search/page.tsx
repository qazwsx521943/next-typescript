import React from "react";
import NavBar from "../components/NavBar";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchSearchRestaurant = async (city: string) => {
    if (!city) return prisma.restaurant.findMany();
    return await prisma.restaurant.findMany({
        where: { location: { name: { equals: city } } },
    });
};

async function Search({ searchParams }: { searchParams: { city: string } }) {
    const restaurants = await fetchSearchRestaurant(searchParams.city.toLowerCase());

    return (
        <>
            <Header />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar />
                <div className="w-5/6">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Search;
