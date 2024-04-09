import Product from "../model/productModel.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock} = req.body;
        
        // Create a new product object
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        // Send the saved product as response
        res.status(201).json(savedProduct);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // Send the products as response
        res.status(200).json(products);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        
        // Find the product by ID in the database
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Send the product as response
        res.status(200).json(product);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price, category,stock } = req.body;

        // Find the product by ID in the database and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, description, price, category, stock },
            { new: true }
        );

        // Send the updated product as response
        res.status(200).json(updatedProduct);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Find the product by ID in the database and delete it
        await Product.findByIdAndDelete(productId);

        // Send success message as response
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};
