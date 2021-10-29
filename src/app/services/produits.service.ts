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
          couleur: 'white',
          image: 'cap-white',
          price: '12',
        },
        {
          couleur: 'black',
          image: 'cap-black',
          price: '12',
        },
        {
          couleur: 'blue',
          image: 'cap-blue',
          price: '12',
        },
        {
          couleur: 'red',
          image: 'cap-red',
          price: '12',
        },
        {
          couleur: 'gray',
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
            couleur: 'white',
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
            couleur: 'white',
            image: 'tshirt-white',
            price: '12',
          },
          {
            couleur: 'black',
            image: 'tshirt-black',
            price: '12',
          },
          {
            couleur: 'turquoise',
            image: 'tshirt-turquoise',
            price: '12',
          },
          {
            couleur: 'red',
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
        size : ['Newborn','6 Months', '12 Months', '18 Months' ],
        variantes: [
          {
            couleur: 'white',
            image: 'bd-white',
            price: '12',
          },
          {
            couleur: 'black',
            image: 'bd-black',
            price: '12',
          },
          {
            couleur: 'red',
            image: 'nd-red',
            price: '12',
          },
          {
            couleur: 'washed_yellow',
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
            couleur: 'white',
            image: 'tb-white',
            price: '12',
          },
          {
            couleur: 'black',
            image: 'tb-black',
            price: '12',
          },
          {
            couleur: 'red',
            image: 'tb-red',
            price: '12',
          },
          {
            couleur: 'blue',
            image: 'tb-washed_yellow',
            price: '12',
          },
          {
            couleur: 'green',
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