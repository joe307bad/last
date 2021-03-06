import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard(
  'JWT'
) {
  getRequest(context: ExecutionContext): unknown {
    const ctx =
      GqlExecutionContext.create(context);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    return ctx.getContext().req;
  }
}
