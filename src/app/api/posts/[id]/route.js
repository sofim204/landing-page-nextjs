import { NextResponse } from "next/server";

import prisma from "../../../../../prisma/client";

import { formatDate, responseOut } from "../../../helper/helper";

export async function GET(request, { params }) {
    const id = parseInt(params.id);

    // const post = await prisma.post.findUnique({
    //     where: {
    //         id,
    //     },
    // });

    const post = await prisma.post.findUnique({
        select: {
            title: true,
            content: true,
            createdAt: true
        },
        where: {
            id,
        },
    });

    if(!post) {
        // return NextResponse.json(
        //     {
        //         success: false,
        //         status: 404,
        //         message: "Detail Data Post Not Found",
        //         data: null
        //     }, { status: 404 }
        // );
        return responseOut(false, 404, "Detail Data Post Not Found", null);
    }

    // manipulate response
    post.createdAt = formatDate(post.createdAt);

    // return NextResponse.json(
    //     {
    //         success: true,
    //         status: 200,
    //         message: "Detail Data Post",
    //         data: post
    //     }, { status: 200 }
    // );

    return responseOut(true, 200, "Detail Data Post", post);
}