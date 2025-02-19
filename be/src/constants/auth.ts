import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'PARTY_FAMILY_PRIVATE_KEY',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
