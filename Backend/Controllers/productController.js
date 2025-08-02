import expressAsyncHandler from "express-async-handler";
import { Product } from "../Models/productModel.js";

// Creating New Product by admin
export const newProduct = expressAsyncHandler(async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            productCollection,
            colors,
            images,
            material,
            gender,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            productCollection,
            images,
            colors,
            material,
            gender,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id, // ref to the admin user id
        });

        //validating the filed
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res
                    .status(500)
                    .send({ error: "description is required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !countInStock:
                return res.status(500).send({ error: "Stock is Required" });
            case !sku:
                return res.status(500).send({ error: "SKU is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !sizes:
                return res.status(500).send({ error: "Size is Required" });
            case !colors:
                return res.status(500).send({ error: "Color is Required" });
            case !productCollection:
                return res
                    .status(500)
                    .send({ error: "Collection is Required" });
            case !gender:
                return res.status(500).send({ error: "Gender is Required" });
            case !images:
                return res.status(500).send({ error: "Image is Required" });
        }

        const newProduct = await product.save();

        res.status(201).json({
            success: true,
            message: "Product Sucessfully Created",
            newProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// updating  old Product by admin
export const updateProduct = expressAsyncHandler(async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            productCollection,
            colors,
            images,
            material,
            gender,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        // find by product id
        const product = await Product.findById(req.params.id);
        if (product) {
            // update the product filed
            product.name = name || product.name;
            product.isFeatured =
                isFeatured !== undefined ? isFeatured : product.isFeatured;

            // save the product
            const updateProduct = await product.save();
            res.json(updateProduct);
        } else {
            res.status(404).json({ message: "Product is not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// delete the product by id by admin
export const deleteProduct = expressAsyncHandler(async (req, res) => {
    try {
        // find the order id
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: "Product deleted" });
        } else {
            res.status(404).json({ message: "Product is not find " });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Erorr" });
    }
});

// getting all Product for user
export const allProduct = expressAsyncHandler(async (req, res) => {
    try {
        const {
            collection,
            color,
            brand,
            size,
            sortBy,
            category,
            gender,
            material,
            search,
            minPrice,
            maxPrice,
            limit,
        } = req.query;
        let query = {};
        // Filter Logic
        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collection = collection;
        }
        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }
        if (material) {
            query.material = { $in: material.split(",") };
        }
        if (brand) {
            query.brand = { $in: brand.split(",") };
        }
        if (size) {
            query.size = { $in: size.split(",") };
        }
        if (color) {
            query.color = { $in: [color] };
        }
        if (gender) {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $option: "i" } },
                { description: { $regex: search, $option: "i" } },
            ];
        }

        // sort logic
        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { price: -1 };
                    break;
                default:
                    break;
            }
        }
        //  fetch prodcut and appy sorting and limit

        let products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit) || 0);
        res.json(products);
    } catch (error) {
        console.error({ message: "Serror Error ", error });
        res.status(500).json({
            message: "Error to fetching the product from Database",
        });
    }
});

// get a single Product by id for user
export const singleProduct = expressAsyncHandler(async (req, res) => {
    try {
        const prodcut = await Product.findById(req.params.id);
        if (prodcut) {
            res.json(prodcut);
        } else {
            res.status(404).json({ message: "Product is not Found" });
        }
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Server Error");
    }
});

// get similar product based on the current product gender and category
export const similarProduct = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const similarProduct = await Product.find({
            id: { $ne: id },
            gender: product.gender,
            category: product.category,
        }).limit(4);

        res.json(similarProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

// get the best seller product
export const bestSeller = expressAsyncHandler(async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 });
        if (bestSeller) {
            res.json(bestSeller);
        } else {
            res.status(404).json({ message: "No best seller found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

// get the new arrivals product
export const newArrivals = expressAsyncHandler(async (req, res) => {
    try {
        // fetch the 8 product
        const newArrivals = await Product.find()
            .sort({ createdAt: -1 })
            .limit(8);
        res.json(newArrivals);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});
