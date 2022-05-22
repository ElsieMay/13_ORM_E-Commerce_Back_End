const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
	try {
		const categoriesAll = await Category.findAll({
			include: [
				Product,
				{
					model: Tag,
					through: ProductTag,
				},
			],
		});
		res.status(200).json(categoriesAll);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const categoryById = await Product.findByPk(req.params.id, {
			include: [
				Product,
				{
					model: Tag,
					through: ProductTag,
				},
			],
		});

		if (!categoryById) {
			res.status(404).json({ message: "No products found with this id!" });
			return;
		}

		res.status(200).json(categoryById);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const postCategory = await Category.create(req.body);
		res.status(200).json(postCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put("/:id", (req, res) => {
	// update category data
	Category.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((categoryData) => {
			if (!categoryData) {
				res.status(404).json({ message: "No category found with this id!" });
				return;
			}
		})
		.catch((err) => {
			// console.log(err);
			res.status(400).json(err);
		});
});

router.delete("/:id", (req, res) => {
	// delete a category by its `id` value
});

module.exports = router;
