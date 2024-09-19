import jwt from 'jsonwebtoken';

export class JWTService {
    generateToken(payload: object): string {
        return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    }

    verifyToken(token: string): object | null {
        try {
            return jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (error) {
            return null;
        }
    }
}
