const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { 
    type: String, 
    default: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800' 
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for status based on quantity
productSchema.virtual('status').get(function() {
  if (this.stockQuantity === 0) return 'Out of Stock';
  if (this.stockQuantity < 10) return 'Low Stock';
  return 'In Stock';
});

module.exports = mongoose.model('Product', productSchema);
