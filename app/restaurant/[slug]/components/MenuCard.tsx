import { Item } from "@prisma/client";
import React from "react";

function MenuCard({ detail }: { detail: Item }) {
    return (
        <div className=" border rounded p-3 w-[49%] mb-3">
            <h3 className="font-bold text-lg">{detail.name}</h3>
            <p className="font-light mt-1 text-sm">{detail.description}</p>
            <p className="mt-7">${detail.price}</p>
        </div>
    );
}

export default MenuCard;
