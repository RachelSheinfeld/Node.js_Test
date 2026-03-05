const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const register = async (req, res, next) => {
   try {

      const { username, password, role } = req.body
      if (!username || !password) {
         return res.status(400).json({ message: 'Username and password are required' })
      }
      const duplicate = await User.findOne({ username }).lean()
      if (duplicate) {
         return res.status(409).json({ message: "Duplicate username" })
      }
      const hashedPwd = await bcrypt.hash(password, 10)
      const user = await User.create({ username, password: hashedPwd, role })
      return res.status(201).json({ message: `New user ${user.username} created` })
   } catch (error) {
      next(error)
   }
}

const login = async (req, res,next) => {
   try {
   const { username, password } = req.body
   if (!username || !password) {
      return res.status(400).json({
         message: 'All fields are required'
      })
   }
   const foundUser = await User.findOne({ username }).lean()
   if (!foundUser) {
      return res.status(401).json({ message: 'Unauthorized' })
      
   }
   const match = await bcrypt.compare(password,
      foundUser.password)
   if (!match) return res.status(401).json({message: 'Unauthorized' })

const userInfo = {
 username: foundUser.username,password:foundUser.password,role:foundUser.role
 
}
const accessToken =jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
res.json({  accessToken })

} catch (error) {
   next(error)
}
}
module.exports = { login, register }