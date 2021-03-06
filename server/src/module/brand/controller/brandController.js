const { fromFormToEntity } = require("../mapper/brandMapper");

class BrandController {
  constructor({ brandService }) {
    this.brandService = brandService;
  }

  async index(req, res) {
    let { page, limit, brandName } = req.query;
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    if (isNaN(limit) || page < 1) {
      limit = 15;
    }

    const offset = (page - 1) * limit;

    const data = await this.brandService.getAll(offset, limit, brandName);
    return res.status(200).json(data);
  }

  async save(req, res, next) {
    try {
      const brand = fromFormToEntity(req.body);
      await this.brandService.save(brand);
      return res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  async edit(req, res, next) {
    try {
      const brand = fromFormToEntity(req.body);
      brand.id = req.params.id;
      await this.brandService.save(brand);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const brand = await this.brandService.getById(req.params.id);
      return res.status(200).json(brand);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const brand = await this.brandService.getById(req.params.id);
      await this.brandService.delete(brand);
      return res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BrandController;
