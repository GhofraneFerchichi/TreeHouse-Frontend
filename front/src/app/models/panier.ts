import { Product } from './product';
import { User } from './user';

export class Panier {
  id: number;
  quantite: number=1;
  prixTotale: number;
  products: Product[];
  user: User;
}
