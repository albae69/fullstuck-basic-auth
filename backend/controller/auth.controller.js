const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../config/db')
const sendEmail = require('../utils/sendEmail')

async function login(req, res) {
  try {
    const { email, password } = req?.body

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    })

    if (user) {
      // compare password
      const compare = await bcrypt.compare(password, user.password)

      if (compare) {
        if (user.isActive) {
          // set jwt
          const token = jwt.sign(user, 'VERY_SECRET', { expiresIn: '1h' })

          // remove password from response
          delete user['password']
          res.json({
            success: true,
            message: 'successfully login',
            data: user,
            token: token,
          })
        } else {
          res.json({
            success: false,
            message:
              'User is not active yet. Please check your email for activation',
          })
        }
      } else {
        res.json({
          success: false,
          message: 'email or password is wrong.',
        })
      }
    } else {
      res.json({
        success: false,
        message: 'email or password is wrong.',
      })
    }

    db.$disconnect()
  } catch (error) {
    console.error(error)
    res.sendStatus(500).json({ success: false })
    db.$disconnect()
  }
}

async function register(req, res) {
  try {
    const { name, email, password } = req?.body
    // check exists
    const isExists = await db.user.findUnique({
      where: {
        email: email,
      },
    })

    if (isExists) {
      res.json({
        success: false,
        message: 'user with this email already exists.',
      })
      return
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10)

    // create new user
    const newUser = await db.user.create({
      data: {
        email: email,
        name: name,
        password: hashPassword,
      },
    })

    console.log('newUser', newUser)
    const message = `${process.env.BASE_URL}/api/v1/auth/verify/${newUser.id}`
    sendEmail(email, 'verify email', message)
    delete newUser['password']

    res.json({
      success: true,
      message:
        'succesfully create a new user. please check your email for activation.',
      data: newUser,
    })
  } catch (error) {
    console.error(error)
    db.$disconnect()
  }
}

async function verifyEmail(req, res) {
  try {
    const { id } = req?.params

    const result = await db.user.update({
      where: { id: parseInt(id) },
      data: {
        isActive: true,
      },
    })

    if (result) {
      res.send('email is verified, your account is active now.')
    }

    db.$disconnect()
  } catch (error) {
    console.error(error)
    db.$disconnect()
    res.json({
      success: false,
      message: 'something wrong',
    })
  }
}

module.exports = { login, register, verifyEmail }
