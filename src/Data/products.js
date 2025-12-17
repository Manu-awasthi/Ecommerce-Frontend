import headphones from "../Assets/images/wireless_HeadPhone.jpg";
import shoes from "../Assets/images/Runing_Shoes.jpg";
import watch from "../Assets/images/SmartWatch.jpg";
import wallet from "../Assets/images/wallet.jpg"
import lamp from "..//Assets/images/lamp.jpg"
import buds from "../Assets/images/earbuds.jpg"
import clock from "../Assets/images/clock.jpg"
import shirt from "../Assets/images/shirt.jpg"
import a from "../Assets/images/aa.jpg"
export const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2999,
    image: headphones,
    description: "Noise cancelling wireless headphones",
    category: "Electronics",
    rating: 4.5,
    inStock: true
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 1999,
    image: shoes,
    description: "Comfortable running shoes",
    category: "Footwear",
    rating: 4.2,
    inStock: true
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 3999,
    image: watch,
    description: "Fitness tracking smart watch",
    category: "Electronics",
    rating: 4.6,
    inStock: false
  },
  {
    id: 4,
    name: "Men T-Shirt",
    price: 799,
    image: shirt,
    description: "Cotton casual t-shirt",
    category: "Clothing",
    rating: 4.0,
    inStock: true
  },
  {
    id: 5,
    name: "Women Hoodie",
    price: 1499,
    image: a,
    description: "Warm winter hoodie",
    category: "Clothing",
    rating: 4.3,
    inStock: true
  },
  {
    id: 6,
    name: "Table Lamp",
    price: 1299,
    image: lamp,
    description: "Modern night table lamp",
    category: "Home",
    rating: 3.9,
    inStock: false
  },
  {
    id: 7,
    name: "Leather Wallet",
    price: 999,
    image: wallet,
    description: "Premium leather wallet",
    category: "Accessories",
    rating: 4.1,
    inStock: true
  },
  {
    id: 8,
    name: "Bluetooth Earbuds",
    price: 2499,
    image: buds,
    description: "Wireless earbuds with deep bass",
    category: "Accessories",
    rating: 4.4,
    inStock: true
  },
  {
    id: 9,
    name: "Wall Clock",
    price: 899,
    image: clock,
    description: "Designer wall clock",
    category: "Home",
    rating: 3.7,
    inStock: false
  }
];
