// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
	// Defines an alias for when data is retrieved
	as: "product_category",
	foreignKey: "category_id",
});

// Categories have many Products
Category.hasMany(Product, {
	// Defines an alias for when data is retrieved
	as: "category_products",
	foreignKey: "category_id",
});

// Products belongsToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
	through: {
		model: ProductTag,
		unique: false,
	},
	// Defines an alias for when data is retrieved
	as: "product_tags",
	// foreignKey: "product_id",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
	through: {
		model: ProductTag,
		unique: false,
	},
	// Defines an alias for when data is retrieved
	as: "tag_products",
	foreignKey: "tag_id",
});

module.exports = {
	Product,
	Category,
	Tag,
	ProductTag,
};
