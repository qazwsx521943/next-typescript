import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const bearerToken = req.headers.authorization as string;
    const token = bearerToken.split(" ")[1];
    const payload = jwt.decode(token) as { email: string };

    if (!payload.email) {
        return res.status(401).json({
            errorMsg: "Unauthorized request(not valid token)",
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            city: true,
        },
    });

    return res.json({ user: user, payload: payload });
}
