import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../secrets.js';
import QRCode from "qrcode";
import { prisma } from '../index.js';

export const generateTicket = (orderId: string, userId: string, eventId: string) => {
        // already checked that order exists and is completed before calling this function
          const qrToken = jwt.sign({ orderId, userId, eventId }, JWT_SECRET_KEY);
          const qrImage = QRCode.toDataURL(qrToken);


}