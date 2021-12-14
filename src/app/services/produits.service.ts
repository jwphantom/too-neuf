import { Subject } from 'rxjs';

export class ProduitService {

  produitsSubject = new Subject<any[]>();


  produits = [
    {
      id: 0,
      name: 'Casquette',
      short_name: 'cap',
      src_index : 'cap-white',
      price: "25.00",
      min_price: "25.00",
      max_price: "35.00",
      description:
        ["Notre thé corps express 100% naturel et bien plus performant que le thé corps simple agit dans votre organisme en coupe faim et brûleur de graisses. De plus il lutte contre la reprise du poids et brûle en moyenne 8kg en 20 jours "],
      mois_ajout: 'Mar',
      annee_ajout: '20',
      is_size: false,
      variantes: [
        {
          couleur: 'blanc',
          image: 'cap-white',
          price: '12',
        },
        {
          couleur: 'noir',
          image: 'cap-black',
          price: '12',
        },
        {
          couleur: 'bleu',
          image: 'cap-blue',
          price: '12',
        },
        {
          couleur: 'rouge',
          image: 'cap-red',
          price: '12',
        },
        {
          couleur: 'gris',
          image: 'cap-gray',
          price: '12',
        }
      ]
      
    
    },
    {
        id: 1,
        name: 'Tasse',
        short_name: 'cup',
        src_index : 'cup-white',
        price: "25.00",
        min_price: "25.00",
        max_price: "35.00",
        description:
          ["Notre thé corps express 100% naturel et bien plus performant que le thé corps simple agit dans votre organisme en coupe faim et brûleur de graisses. De plus il lutte contre la reprise du poids et brûle en moyenne 8kg en 20 jours "],
        mois_ajout: 'Mar',
        annee_ajout: '20',
        is_size: false,
        variantes: [
          {
            couleur: 'blanc',
            image: 'cup-white',
            price: '12',
          }
        ]
      
      },
      {
        id: 2,
        name: 'T-shirt Homme & Femme',
        short_name: 'tshirt',
        src_index : 'tshirt-white',
        size : ['S','M', 'L', 'XL', '2XL', '3XL' ],
        price: "25.00",
        min_price: "25.00",
        max_price: "35.00",
        description:
          ["Notre thé corps express 100% naturel et bien plus performant que le thé corps simple agit dans votre organisme en coupe faim et brûleur de graisses. De plus il lutte contre la reprise du poids et brûle en moyenne 8kg en 20 jours "],
        mois_ajout: 'Mar',
        annee_ajout: '20',
        is_size: true,
        variantes: [
          {
            couleur: 'blanc',
            image: 'tshirt-white',
            price: '12',
          },
          {
            couleur: 'noir',
            image: 'tshirt-black',
            price: '12',
          },
          {
            couleur: 'turquoise',
            image: 'tshirt-turquoise',
            price: '12',
          },
          {
            couleur: 'rouge',
            image: 'tshirt-red',
            price: '12',
          },
          {
            couleur: 'fuchsia',
            image: 'tshirt-fuchsia',
            price: '12',
          },
          {
            couleur: 'navy',
            image: 'tshirt-navy',
            price: '12',
          }
        ]
      
      },
      {
        id: 3,
        name: 'Body Suit Bébé',
        short_name: 'bd',
        src_index : 'bd-white',
        price: "25.00",
        min_price: "25.00",
        max_price: "35.00",
        is_size: true,
        size : ['Nouveau Née','6 Mois', '12 Mois', '18 Mois' ],
        variantes: [
          {
            couleur: 'blanc',
            image: 'bd-blanc',
            price: '12',
          },
          {
            couleur: 'noir',
            image: 'bd-noir',
            price: '12',
          },
          {
            couleur: 'rouge',
            image: 'bd-rouge',
            price: '12',
          },
          {
            couleur: 'jaune_délavé',
            image: 'bd-washed_yellow',
            price: '12',
          },
          {
            couleur: 'navy',
            image: 'tshirt-navy',
            price: '12',
          }
        ]
      
      },
      {
        id: 4,
        name: 'Tablier',
        short_name: 'tb',
        src_index : 'tb-white',
        price: "25.00",
        min_price: "25.00",
        max_price: "35.00",
        is_size: false,
        size : ['S','M', 'L', 'XL', '2XL', '3XL' ],
        variantes: [
          {
            couleur: 'blanc',
            image: 'tb-white',
            price: '12',
          },
          {
            couleur: 'noir',
            image: 'tb-black',
            price: '12',
          },
          {
            couleur: 'rouge',
            image: 'tb-red',
            price: '12',
          },
          {
            couleur: 'bleu',
            image: 'tb-washed_yellow',
            price: '12',
          },
          {
            couleur: 'vert',
            image: 'tb-green',
            price: '12',
          }
        ]
      
      }
    

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