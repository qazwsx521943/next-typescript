import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method);
    if (req.method === "POST") {
        const { firstName, lastName, email, phone, password, city } = req.body;
        const errors: string[] = [];
        const validateSchema = [
            {
                valid: validator.isLength(firstName, { min: 1, max: 20 }),
                errorMsg: "First name is invalid",
            },
            {
                valid: validator.isLength(lastName, { min: 1, max: 20 }),
                errorMsg: "Last name is invalid",
            },
            {
                valid: validator.isEmail(email),
                errorMsg: "Email is invalid",
            },
            {
                valid: validator.isMobilePhone(phone),
                errorMsg: "phone is invalid",
            },
            {
                valid: validator.isLength(city, {
                    min: 1,
                }),
                errorMsg: "city is invalid",
            },
            {
                valid: validator.isStrongPassword(password),
                errorMsg: "password is not strong enough",
            },
        ];

        validateSchema.forEach((check) => {
            if (!check.valid) {
                errors.push(check.errorMsg);
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({ errorMsg: errors[0] });
        }

        const userWithEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userWithEmail) {
            return res.status(400).json({ errorMsg: "Email registered before!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const savedUser = await prisma.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                password: hashedPassword,
                city,
                phone,
                email,
            },
        });
        const alg = "HS256";
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new jose.SignJWT({ email: savedUser.email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret);
        res.status(200).json({ token: token });
    }
}
