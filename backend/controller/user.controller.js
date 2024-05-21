const db = require('../config/db')

async function getAllUser(req, res) {
  try {
    const result = await db.user.findMany({
      select: { id: true, email: true, name: true, posts: true },
    })

    res.json({
      success: true,
      message: 'successfully get all user',
      data: result,
    })
    db.$disconnect()
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    })
    db.$disconnect()
  }
}

module.exports = { getAllUser }
