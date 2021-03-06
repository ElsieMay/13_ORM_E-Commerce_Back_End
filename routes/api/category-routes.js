const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
	try {
		const categoriesAll = await Category.findAll({
			include: [{ model: Product }],
		});
		res.status(200).json(categoriesAll);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const categoryById = await Category.findByPk(req.params.id, {
			include: [{ model: Product }],
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
	// updates category data
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
			res.status(200).json(categoryData);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.delete("/:id", async (req, res) => {
	// deletes a category by its `id` value
	try {
		const deleteCategory = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!deleteCategory) {
			res.status(404).json({ message: "No category found with this id!" });
			return;
		}

		res.status(200).json(deleteCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
