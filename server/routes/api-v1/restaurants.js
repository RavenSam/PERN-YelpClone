const router = require("express").Router()
const db = require("../../db")

/***************************************************************
 * @Request GET
 * @Route /api/v1/restaurants
 * @description return all Restaurants
 */
router.get("/", async (req, res) => {
   try {
      const { rows } = await db.query("SELECT * FROM restaurants")

      res.status(200).json({ status: "success", length: rows.length, data: rows })
   } catch (err) {
      console.error(err)
      res.status(500).json({ status: "failure", error: err.message })
   }
})

/***************************************************************
 * @Request GET
 * @Route /api/v1/restaurants/:id
 * @description return one Restaurant with ID
 */
router.get("/:id", async (req, res) => {
   try {
      const { id } = req.params
      const { rows } = await db.query(`SELECT * FROM restaurants WHERE id = $1`, [id])

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

/***************************************************************
 * @Request POST
 * @Route /api/v1/restaurants
 * @description create a restaurant
 */
router.post("/", async (req, res) => {
   try {
      const { name, location, price_range } = req.body

      // Query String
      const qry = "INSERT INTO restaurants (name,location,price_range) VALUES($1,$2,$3) RETURNING *"

      const { rows } = await db.query(qry, [name, location, price_range])

      res.status(201).json({ status: "success", data: rows[0] })
   } catch (err) {
      console.error(err)
      res.status(500).json({ status: "failure", error: err.message })
   }
})

/***************************************************************
 * @Request PUT
 * @Route /api/v1/restaurants/:id
 * @description update one restaurant with ID
 */
router.put("/:id", async (req, res) => {
   try {
      const { id } = req.params
      const { name, location, price_range } = req.body

      // Query String
      const qry = `UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4  RETURNING *`

      const { rows } = await db.query(qry, [name, location, price_range, id])

      res.status(200).json({ status: "success", data: rows[0], msg: "Updated Successfully" })
   } catch (err) {
      console.error(err)
      res.status(500).json({ status: "failure", error: err.message })
   }
})

/***************************************************************
 * @Request DELETE
 * @Route /api/v1/restaurants/:id
 * @description delete one restaurant with ID
 */
router.delete("/:id", async (req, res) => {
   try {
      const { id } = req.params

      await db.query(`DELETE FROM restaurants WHERE id = $1`, [id])

      res.status(200).json({ status: "success", msg: "Deleted Successfully" })
   } catch (err) {
      console.error(err)
      res.status(500).json({ status: "failure", error: err.message })
   }
})

module.exports = router
