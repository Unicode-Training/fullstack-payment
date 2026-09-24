import { Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyPassword } from '../utils/hashing.js';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) { }

    async login(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException("Email or password invalid");
        }

        if (!verifyPassword(password, user.password as string)) {
            throw new UnauthorizedException("Email or password invalid");
        }

        const accessToken = this.jwtService.sign({ id: user.id });

        return {
            accessToken,
            user
        }
    }
}
