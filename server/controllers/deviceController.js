import path from "path"
import { fileURLToPath } from "url"
import { v4 } from "uuid"
import ApiError from "../error/ApiError.js"
import { Device, DeviceInfo, Rating } from "../models/models.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body
      const { img } = req.files
      let fileName = v4() + ".jpg"
      img.mv(path.resolve(__dirname, "..", "static", fileName))
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      })

      if (info) {
        info = JSON.parse(info)
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        )
      }

      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let devices
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset })
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      })
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      })
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      })
    }
    return res.json(devices)
  }

  async getOne(req, res) {
    const { id } = req.params
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }], // "as" is name
    })
    return res.json(device)
  }

  async rateDevice(req, res, next) {
    try {
      const { rate } = req.body
      const { id } = req.params
      const user = req.user

      // Creating a new rating
      const rating = await Rating.create({
        deviceId: id,
        userId: user.id,
        rate,
      })

      // Getting all ratings to find average
      const deviceRatings = await Rating.findAll({ where: { deviceId: id } })
      let avgRating = 0

      for (let deviceRating of deviceRatings) {
        avgRating += parseInt(deviceRating.rate) / deviceRatings.length
      }

      // Updating an instance
      const device = await Device.findOne({ where: { id } })
      device.rating = avgRating
      device.save()

      return res.json(rating)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

export default new DeviceController()
