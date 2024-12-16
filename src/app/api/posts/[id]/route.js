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
export async function GET(request, { params }) {
    const parameters = await params; // Await params explicitly here
    const id = parseInt(parameters.id);

    // checking if input is not a number
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

export async function PATCH(request, { params }) {
    const parameters = await params; // Await params explicitly here
    const id = parseInt(parameters.id);

    // checking if input is not a number
    if (isNaN(id)) {
        return responseOut(false, 400, "Invalid ID", null);
    }

    const { title, content } = await request.json();

    // check data
    const getData = await prisma.post.findUnique({
        select: {
            id: true
        },
        where: {
            id
        }
    });

    if(!getData) {
        return responseOut(false, 404, "Data Not Found", null);
    }

    // update data
    const updatePost = await prisma.post.update({
        where: {
            id,
        },
        data : {
            title: title,
            content: content,
            updatedAt: new Date()
        },
    });

    if(!updatePost) {
        return responseOut(false, 400, "Failed to Update Post", null);
    }

    return responseOut(true, 200, "Post Updated", updatePost); 
}

export async function DELETE(request, { params }) {
    const parameters = await params;
    const id = parseInt(parameters.id);

    // check data
    const getData = await prisma.post.findUnique({
        select: {
            id: true
        },
        where: {
            id
        }
    });

    if(!getData) {
        return responseOut(false, 404, "Data Not Found", null);
    }

    // delete post
    await prisma.post.delete({
        where: {
            id,
        }
    });

    return responseOut(true, 200, "Post Deleted", null); 
}