import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { PurchaseStatus } from '../../../core/enums/purchase-status';
import { Product } from './product';

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available purchase statuses',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Product)
  product: Product;

  productId: string;
}
