import React from "react";
import { PRICE } from "@prisma/client";

type Props = {
    price: PRICE;
};

function Price({ price }: Props) {
    const renderPrice = () => {
        switch (price) {
            case PRICE.CHEAP:
                return (
                    <>
                        <span className="text-red-500">$$</span>
                        <span className="text-gray-400">$$</span>
                    </>
                );
            case PRICE.REGULAR:
                return (
                    <>
                        <span className="text-red-500">$$$</span>
                        <span className="text-gray-400">$</span>
                    </>
                );
            case PRICE.EXPENSIVE:
                return (
                    <>
                        <span className="text-red-500">$$$$</span>
                    </>
                );
        }
    };
    return <p className="flex mr-3">{renderPrice()}</p>;
}

export default Price;
