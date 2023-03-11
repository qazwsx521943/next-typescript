import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const errors: string[] = [];
    if (req.method === "POST") {
        const { email, password } = req.body;
        const validateSchema = [
            {
                valid: validator.isEmail(email),
                error: "email is invalid",
            },
            {
                valid: validator.isLength(password, { min: 1 }),
                error: "password is required",
            },
        ];

        validateSchema.forEach((check) => {
            if (!check.valid) {
                errors.push(check.error);
            }
        });

        if (errors.length > 0) {
            return res.status(404).json({ errorMsg: errors[0] });
        }

        const userWithEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!userWithEmail) {
            return res.status(400).json({ errorMsg: "Email or password Incorrect!" });
        }

        const isMatch = await bcrypt.compare(password, userWithEmail.password);

        if (!isMatch) {
            return res.status(400).json({ errorMsg: "Email or password Incorrect!" });
        }

        const alg = "HS256";
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new jose.SignJWT({ email: userWithEmail.email })
            .setProtectedHeader({ alg })
            .setExpirationTime("24h")
            .sign(secret);
        res.status(200).json({ token: token });
    }

    res.status(404).json({ errorMsg: "unknown endpoint" });
}
