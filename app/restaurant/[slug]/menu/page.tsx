import React from "react";
import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "../components/Menu";
import { Item, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchMenus = async (slug: string) => {
    const menus = await prisma.restaurant.findUnique({
        where: { slug },
        select: { items: true },
    });

    if (!menus) {
        throw new Error();
    }

    return menus.items;
};
async function RestaurantMenu({ params }: { params: { slug: string } }) {
    const menu = await fetchMenus(params.slug);
    console.log(menu);

    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNavBar slug={params.slug} />
                <Menu menu={menu} />
            </div>
        </>
    );
}

export default RestaurantMenu;
