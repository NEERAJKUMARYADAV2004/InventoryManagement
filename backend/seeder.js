const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const adminId = '69f4842d22911dd8849dbc71';

const products = [
  // Vehicles
  { title: 'Ferrari LaFerrari', description: 'Legendary hybrid hypercar with V12 engine and electric motor.', price: 1500000, stockQuantity: 12, category: 'Vehicles', imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Porsche 911 GT3 RS', description: 'The ultimate track-focused sports car with naturally aspirated engine.', price: 220000, stockQuantity: 25, category: 'Vehicles', imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Tesla Roadster', description: 'All-electric supercar with record-shattering performance.', price: 250000, stockQuantity: 15, category: 'Vehicles', imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  
  // Timepieces
  { title: 'Rolex Daytona', description: 'Classic chronograph watch designed for professional racing drivers.', price: 45000, stockQuantity: 10, category: 'Timepieces', imageUrl: 'https://images.unsplash.com/photo-1587836374828-4dbaba94cf0e?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Patek Philippe Nautilus', description: 'Elegant luxury sports watch with a unique octagonal bezel.', price: 85000, stockQuantity: 18, category: 'Timepieces', imageUrl: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Audemars Piguet Royal Oak', description: 'Iconic luxury watch with integrated bracelet and tapisserie dial.', price: 65000, stockQuantity: 22, category: 'Timepieces', imageUrl: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  
  // Electronics
  { title: 'Apple Pro Display XDR', description: '32-inch 6K Retina display for the most demanding professionals.', price: 4999, stockQuantity: 30, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Bang & Olufsen Beolab 90', description: 'High-end floor-standing speaker with exceptional sound quality.', price: 80000, stockQuantity: 14, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1545453338-333e61794263?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Phase One XF IQ4', description: 'Medium format camera system with 150MP resolution.', price: 50000, stockQuantity: 11, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800', createdBy: adminId },

  // Home & Decor
  { title: 'Eames Lounge Chair', description: 'Classic mid-century modern design icon in leather and wood.', price: 6500, stockQuantity: 40, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Swarovski Crystal Chandelier', description: 'Grand lighting fixture with handcrafted precision crystals.', price: 12000, stockQuantity: 15, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  
  // Apparel
  { title: 'Hermès Birkin Bag', description: 'The ultimate symbol of luxury craftsmanship and exclusivity.', price: 25000, stockQuantity: 10, category: 'Apparel', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Tom Ford Bespoke Suit', description: 'Exquisite tailored suit made from the finest Italian wool.', price: 8000, stockQuantity: 20, category: 'Apparel', imageUrl: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f6f9?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  
  // Lifestyle
  { title: 'Moët & Chandon Dom Pérignon', description: 'Vintage prestige cuvée champagne of legendary status.', price: 400, stockQuantity: 50, category: 'Lifestyle', imageUrl: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Steinway & Sons Model D', description: 'The pinnacle of concert grand pianos, handcrafted excellence.', price: 180000, stockQuantity: 10, category: 'Lifestyle', imageUrl: 'https://images.unsplash.com/photo-1520529714575-d36316bb8bc7?auto=format&fit=crop&q=80&w=800', createdBy: adminId },

  // Adding 15 more variety products
  { title: 'MacBook Pro M3 Max', description: 'Highest-end Apple laptop for extreme professional performance.', price: 4500, stockQuantity: 35, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Leica M11', description: 'Iconic rangefinder camera with 60MP sensor.', price: 9000, stockQuantity: 14, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Bvlgari Serpenti Watch', description: 'Jewelry timepiece in the shape of a serpent.', price: 35000, stockQuantity: 12, category: 'Timepieces', imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Rimowa Classic Suitcase', description: 'High-end aluminum luggage for luxury travelers.', price: 1500, stockQuantity: 45, category: 'Lifestyle', imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Mavic 3 Pro Drone', description: 'Professional cinematography drone with triple camera system.', price: 3500, stockQuantity: 28, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Versace Silk Robe', description: 'Pure silk robe with iconic Medusa print.', price: 1200, stockQuantity: 20, category: 'Apparel', imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Louis Vuitton Trunk', description: 'Heritage luggage piece, handcrafted in France.', price: 12000, stockQuantity: 10, category: 'Lifestyle', imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Range Rover SV', description: 'The pinnacle of luxury SUVs with executive seating.', price: 210000, stockQuantity: 15, category: 'Vehicles', imageUrl: 'https://images.unsplash.com/photo-1567808291548-fc3ee04dbac0?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'CineAlta Cinema Lens', description: 'Professional cinema lens for Hollywood-grade production.', price: 15000, stockQuantity: 12, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1616423641454-996489379669?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Caviar Gold iPhone', description: 'Custom iPhone 15 Pro finished in 24k gold.', price: 10000, stockQuantity: 10, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Montblanc Pen', description: 'Meisterstück luxury fountain pen with gold nib.', price: 900, stockQuantity: 50, category: 'Lifestyle', imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Kartell Masters Chair', description: 'Designer chair blending three iconic designs.', price: 500, stockQuantity: 40, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Focal Utopia Headphones', description: 'The world\'s best open-back high-fidelity headphones.', price: 4000, stockQuantity: 15, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Veuve Clicquot La Grande Dame', description: 'Prestige cuvée champagne celebrating the "Grande Dame" of Reims.', price: 250, stockQuantity: 45, category: 'Lifestyle', imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
  { title: 'Dyson Airwrap Long', description: 'Premium hair styling tool with Coanda effect.', price: 600, stockQuantity: 30, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800', createdBy: adminId },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');
    
    // Clear existing products (optional, uncomment to start fresh)
    // await Product.deleteMany({});
    
    await Product.insertMany(products);
    console.log('30 Luxury Products seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();
