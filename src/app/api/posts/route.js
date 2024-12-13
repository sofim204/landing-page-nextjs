import prisma from "../../../../prisma/client";

import { formatDate, responseOut } from "../../helper/helper";

export async function GET() {
    // -->select all
    // const posts = await prisma.post.findMany();
    // -->select some field
    const posts = await prisma.post.findMany({
        select: {
            title: true,
            content: true,
            createdAt: true
        },
    });

    const formattedPosts = posts.map(post => ({
        ...post,
        createdAt: formatDate(post.createdAt),
    }));

    return responseOut(true, 200, "List Data Posts", formattedPosts);
}

export async function POST(request) {
    const { title, content } = await request.json();

    const post = await prisma.post.create({
        data: {
            title: title,
            content: content
        }
    });

    return responseOut(true, 201, "Post Created!", post);
}