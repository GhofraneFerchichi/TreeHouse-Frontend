import { Panier } from "./panier";

export class Product {
  id: number;
  titre: string;
  description: string;
  imageBase64: string;
  prix: number;
  quantite: number;
  panier: Panier;

  constructor(
    id: number,
    titre: string,
    description: string,
    imageBase64: string,
    prix: number,
    quantite: number,
    panier: Panier
  ) {
    this.id = id;
    this.titre = titre;
    this.description = description;
    this.imageBase64 = imageBase64;
    this.prix = prix;
    this.quantite = quantite;
    this.panier = panier;
  }
}
