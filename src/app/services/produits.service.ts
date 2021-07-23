import { Subject } from 'rxjs';

export class ProduitService {

  produitsSubject = new Subject<any[]>();


  produits = [
    {
      id: 0,
      name: 'Casquette',
      short_name: 'cap',
      min_price: "25.00",
      max_price: "35.00",
      description:
        ["Notre thé corps express 100% naturel et bien plus performant que le thé corps simple agit dans votre organisme en coupe faim et brûleur de graisses. De plus il lutte contre la reprise du poids et brûle en moyenne 8kg en 20 jours "],
      mois_ajout: 'Mar',
      annee_ajout: '20',
      is_pack: true,
    
    },
    {
        id: 1,
        name: 'Tasse',
        short_name: 'tasse',
        min_price: "25.00",
        max_price: "35.00",
        description:
          ["Notre thé corps express 100% naturel et bien plus performant que le thé corps simple agit dans votre organisme en coupe faim et brûleur de graisses. De plus il lutte contre la reprise du poids et brûle en moyenne 8kg en 20 jours "],
        mois_ajout: 'Mar',
        annee_ajout: '20',
        is_pack: true,
      
      },
      {
        id: 2,
        name: 'T-shirt',
        short_name: 'tshirt',
        min_price: "25.00",
        max_price: "35.00",
        description:
          ["Notre thé corps express 100% naturel et bien plus performant que le thé corps simple agit dans votre organisme en coupe faim et brûleur de graisses. De plus il lutte contre la reprise du poids et brûle en moyenne 8kg en 20 jours "],
        mois_ajout: 'Mar',
        annee_ajout: '20',
        is_pack: true,
      
      },
    

  ];

  emitProduitsSubject() {
    this.produitsSubject.next(this.produits.slice());
  }

  getProduitById(id: number) {
    const produit = this.produits.find(
      (s) => {
        return s.id === id;
      }
    );
    return produit;
  }
}