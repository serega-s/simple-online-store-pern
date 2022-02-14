import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import ApiError from "../error/ApiError.js"
import { Basket, User } from "../models/models.js"

const generateJwt = (id, email, role) => {
  return jwt.sign({ id: id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  })
}

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body
    if (!email || !password) {
      return next(ApiError.badRequest("Check email or password"))
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest("User already exists"))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword })
    const basket = await Basket.create({ userId: user.id })
    const token = generateJwt(user.id, user.email, user.role)

    return res.json({ token })
  }

  async login(req, res, next) {
    const { email, password } = req.body
    if (!email || !password) {
      return next(ApiError.badRequest("Check email or password"))
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return next(ApiError.internal("User not found"))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal("Wrong password given"))
    }

    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token, role: user.role })
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({ token })
  }
}

export default new UserController()
