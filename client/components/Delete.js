import axios from "axios"
import { useContext } from "react"
import { RestaurantContext } from "../context/RestaurantsContext"

export default function Delete({ id }) {
   const { deleteRestaurant } = useContext(RestaurantContext)

   const handleDelete = async (e) => {
      e.stopPropagation()

      try {
         let qry = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/restaurants/${id}`

         await axios.delete(qry)

         deleteRestaurant(id)
      } catch (err) {
         console.error(err.message)
      }
   }

   return (
      <button className="btn btn-danger" onClick={handleDelete}>
         <i className="fa fa-trash"></i>
      </button>
   )
}
