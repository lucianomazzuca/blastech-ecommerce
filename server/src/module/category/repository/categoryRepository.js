const Category = require('../entity/Category');
const CategoryIdNotDefinedError = require('../error/CategoryIdNotDefined');
const CategoryNotFoundError = require('../error/CategoryNotFoundError');
const CategoryNotDefinedError = require('../error/CategoryNotDefinedError');
const { fromModelToEntity } = require('../mapper/categoryMapper');
const { Op } = require('sequelize');

class CategoryRepository {
  constructor({ categoryModel }) {
    this.categoryModel = categoryModel;
  }

  async save(category) {
    if (! (category instanceof Category)) {
      throw new CategoryNotDefinedError();
    };

    const newCategory = await this.categoryModel.build(category, {
      isNewRecord: !category.id,
    });
    await newCategory.save();

    return fromModelToEntity(newCategory);
  };

  async getAll(offset = 0, limit = 10, categoryName) {
    let query = {};

    if (categoryName) {
      // Create the where condition for sequelize query
      query.name = { [Op.iLike]: "%" + categoryName + "%"}
    };

    const result = await this.categoryModel.findAndCountAll({
      offset,
      limit,
      where: query
    }); 

    const data = {
      count: result.count,
      categories: result.rows.map((category) => fromModelToEntity(category))
    }
    
    return data;
  };

  async getById(id) {
    if (!Number(id)) {
      throw new CategoryIdNotDefinedError();
    }
    
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new CategoryNotFoundError(`Category with id ${id} was not found`);
    }

    return fromModelToEntity(category);
  };
  
  
  async delete(category) {
    if (!(category instanceof Category)) {
      throw new CategoryNotDefinedError();
    };

    return Boolean(await this.categoryModel.destroy({ where: { id: category.id } }));
  };
};

module.exports = CategoryRepository;