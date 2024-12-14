import prisma from "../../../../../prisma/client";

import { formatDate, responseOut } from "../../../helper/helper";

// export async function GET(request, { params }) {
//     const id = parseInt(params.id);

//     const post = await prisma.post.findUnique({
//         select: {
//             title: true,
//             content: true,
//             createdAt: true
//         },
//         where: {
//             id,
//         },
//     });

//     if(!post) {
//         return responseOut(false, 404, "Detail Data Post Not Found", null);
//     }

//     // manipulate response
//     post.createdAt = formatDate(post.createdAt);

//     return responseOut(true, 200, "Detail Data Post", post);
// }

// improvement from next js 15
export async function GET(request, context) {
    const params = await context.params; // Await params explicitly here
    const id = parseInt(params.id);

    // checking if input is not a
    if (isNaN(id)) {
        return responseOut(false, 400, "Invalid ID", null);
    }

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
        return responseOut(false, 404, "Detail Data Post Not Found", null);
    }

    // manipulate response
    post.createdAt = formatDate(post.createdAt);

    return responseOut(true, 200, "Detail Data Post", post);
}