import { useState, useContext } from "react"
import axios from "axios"
import { RestaurantContext } from "../context/RestaurantsContext"

export default function AddRestaurant() {
   const { addRestaurant } = useContext(RestaurantContext)

   const [name, setName] = useState("")
   const [location, setLocation] = useState("")
   const [price_range, setPrice_range] = useState(1)

   const notEmpty = name !== "" && location !== "" ? true : false

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         if (notEmpty) {
            let qry = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/restaurants`

            const { data } = await axios.post(qry, { name, location, price_range })

            addRestaurant(data.data)

            // Reinitiize th inputs
            setName("")
            setLocation("")
            setPrice_range(1)
         }
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <form onSubmit={handleSubmit} className="row mb-4 shadow-sm rounded py-3">
         <div className="col-12 col-md">
            <input
               type="text"
               className="form-control my-2 "
               placeholder="Name"
               name="name"
               onChange={(e) => setName(e.target.value)}
               value={name}
            />
         </div>

         <div className="col-12 col-md">
            <input
               type="text"
               className="form-control my-2 "
               placeholder="Location"
               onChange={(e) => setLocation(e.target.value)}
               name="location"
               value={location}
            />
         </div>

         <div className="col-12 col-md">
            <select
               value={price_range}
               onChange={(e) => setPrice_range(e.target.value)}
               className="form-select my-2 "
               aria-label="Default select example"
            >
               <option disabled>Price Range</option>
               <option value="1">$</option>
               <option value="2">$$</option>
               <option value="3">$$$</option>
               <option value="4">$$$$</option>
               <option value="5">$$$$$</option>
            </select>
         </div>

         <div className="col-12 col-md">
            <button type="submit" className="btn btn-primary my-2 w-100" disabled={!notEmpty}>
               Add
            </button>
         </div>
      </form>
   )
}
