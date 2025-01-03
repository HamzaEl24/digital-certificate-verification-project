import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly requiredRoles: string[] = []) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    

    if (!user || (this.requiredRoles.length && !this.requiredRoles.includes(user.role))) {
      throw new UnauthorizedException('Vous n\'avez pas le rôle requis pour accéder à cette ressource.');
    }

    return true;
  }
}
