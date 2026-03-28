import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../secrets.js';
import QRCode from "qrcode";
import { prisma } from '../index.js';

export const generateTicket = async (orderId: string, userId: number, eventId: string) => {
        // already checked that order exists and is completed before calling this function
          const qrToken = jwt.sign({ orderId, userId, eventId }, JWT_SECRET_KEY);
          const qrImage =await QRCode.toDataURL(qrToken);

    const genTicket = await prisma.ticket.create({
        data:{
            orderId,
            userId,
            eventId,
            status: 'VALID',
            qrToken,
            qrImage
        }
    })
    return genTicket;
}