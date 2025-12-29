import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User, Product } from "./models/Schema.js";

mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce");

const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    // USER
    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      username: "john_doe",
      email: "john@gmail.com",
      password: hashedPassword,
      usertype: "user",
    });

    // PRODUCTS (20)
    const products = [
      {
        title: "Men Cotton T-Shirt",
        description: "Soft cotton casual T-shirt",
        mainImg: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        sizes: ["S", "M", "L", "XL"],
        category: "Clothing",
        gender: "Men",
        price: 999,
        discount: 10,
      },
      {
        title: "Women Summer Dress",
        description: "Lightweight floral dress",
        mainImg: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
        sizes: ["S", "M", "L"],
        category: "Clothing",
        gender: "Women",
        price: 1499,
        discount: 15,
      },
      {
        title: "Men Denim Jacket",
        description: "Classic blue denim jacket",
        mainImg: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
        sizes: ["M", "L", "XL"],
        category: "Clothing",
        gender: "Men",
        price: 2499,
        discount: 20,
      },
      {
        title: "Running Shoes",
        description: "Comfortable running shoes",
        mainImg: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        sizes: ["7", "8", "9", "10"],
        category: "Footwear",
        gender: "Unisex",
        price: 2999,
        discount: 25,
      },
      {
        title: "Women Handbag",
        description: "Stylish leather handbag",
        mainImg: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        sizes: [],
        category: "Accessories",
        gender: "Women",
        price: 1999,
        discount: 10,
      },
      {
        title: "Men Formal Shirt",
        description: "Slim-fit formal shirt",
        mainImg: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
        sizes: ["M", "L", "XL"],
        category: "Clothing",
        gender: "Men",
        price: 1299,
        discount: 5,
      },
      {
        title: "Women Sneakers",
        description: "Trendy everyday sneakers",
        mainImg: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
        sizes: ["6", "7", "8"],
        category: "Footwear",
        gender: "Women",
        price: 2799,
        discount: 18,
      },
      {
        title: "Smart Watch",
        description: "Fitness tracking smartwatch",
        mainImg: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        sizes: [],
        category: "Electronics",
        gender: "Unisex",
        price: 3999,
        discount: 30,
      },
      {
        title: "Wireless Headphones",
        description: "Noise cancelling headphones",
        mainImg: "https://images.unsplash.com/photo-1518441902113-fc2c5c45f0c7",
        sizes: [],
        category: "Electronics",
        gender: "Unisex",
        price: 4999,
        discount: 35,
      },
      {
        title: "Laptop Backpack",
        description: "Water-resistant backpack",
        mainImg: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        sizes: [],
        category: "Accessories",
        gender: "Unisex",
        price: 1799,
        discount: 12,
      },

      // 10 MORE
      {
        title: "Men Leather Wallet",
        description: "Genuine leather wallet",
        mainImg: "https://images.unsplash.com/photo-1627123424574-724758594e93",
        sizes: [],
        category: "Accessories",
        gender: "Men",
        price: 899,
        discount: 8,
      },
      {
        title: "Women Sunglasses",
        description: "UV-protected sunglasses",
        mainImg: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        sizes: [],
        category: "Accessories",
        gender: "Women",
        price: 1299,
        discount: 15,
      },
      {
        title: "Gaming Mouse",
        description: "High precision gaming mouse",
        mainImg: "https://images.unsplash.com/photo-1615869442320-fd02a129c77c",
        sizes: [],
        category: "Electronics",
        gender: "Unisex",
        price: 1599,
        discount: 20,
      },
      {
        title: "Bluetooth Speaker",
        description: "Portable bluetooth speaker",
        mainImg: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
        sizes: [],
        category: "Electronics",
        gender: "Unisex",
        price: 2499,
        discount: 22,
      },
      {
        title: "Men Casual Shoes",
        description: "Everyday casual shoes",
        mainImg: "https://images.unsplash.com/photo-1528701800489-20be3c01f9c5",
        sizes: ["8", "9", "10"],
        category: "Footwear",
        gender: "Men",
        price: 2199,
        discount: 17,
      },
      {
        title: "Women Sandals",
        description: "Comfortable summer sandals",
        mainImg: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
        sizes: ["6", "7", "8"],
        category: "Footwear",
        gender: "Women",
        price: 1499,
        discount: 12,
      },
      {
        title: "Fitness Dumbbells",
        description: "Home workout dumbbells",
        mainImg: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
        sizes: [],
        category: "Fitness",
        gender: "Unisex",
        price: 2999,
        discount: 25,
      },
      {
        title: "Yoga Mat",
        description: "Non-slip yoga mat",
        mainImg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
        sizes: [],
        category: "Fitness",
        gender: "Unisex",
        price: 999,
        discount: 10,
      },
      {
        title: "Men Hoodie",
        description: "Warm winter hoodie",
        mainImg: "https://images.unsplash.com/photo-1520975869010-2e27e15cfd7a",
        sizes: ["M", "L", "XL"],
        category: "Clothing",
        gender: "Men",
        price: 1899,
        discount: 18,
      },
      {
        title: "Women Jacket",
        description: "Stylish winter jacket",
        mainImg: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
        sizes: ["S", "M", "L"],
        category: "Clothing",
        gender: "Women",
        price: 2799,
        discount: 20,
      },
    ];

    await Product.insertMany(products);

    console.log("✅ Data inserted successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
