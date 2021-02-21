const router = require("express").Router()
const db = require("../../db")

/***************************************************************
 * @Request GET
 * @Route /api/v1/review/:restaurantId
 * @description return All reviews of one Restaurant with ID
 */
router.get("/:restaurantId", async (req, res) => {
   try {
      const { restaurantId } = req.params
      const { rows } = await db.query(`SELECT * FROM reviews WHERE restaurant_id = $1`, [restaurantId])

      if (rows.length) {
         res.status(200).json({ status: "success", data: rows })
      } else {
         res.status(404).json({ status: "Not Found" })
      }
   } catch (err) {
      console.error(err)
      res.status(500).json({ status: "failure", error: err.message })
   }
})

module.exports = router
