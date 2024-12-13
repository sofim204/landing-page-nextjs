import { NextResponse } from "next/server";

const formatDate = (date: string | Date): string => {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const minutes = String(d.getUTCMinutes()).padStart(2, '0');
    const seconds = String(d.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const responseOut = (
    success: boolean,
    statusCode: number,
    message: string,
    data: any
): NextResponse => {
    return NextResponse.json(
        {
            success: success,
            status: statusCode,
            message: message,
            data: data
        },
        {
            status: statusCode
        }
    )
}

// export default formatDate; // for single function
export { formatDate, responseOut };