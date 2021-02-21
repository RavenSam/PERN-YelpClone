import { useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { RestaurantContext } from "../context/RestaurantsContext"
import Edit from "../components/Edit"
import Delete from "../components/Delete"
import axios from "axios"

export default function RestaurantsList() {
   const { restaurants, setRestaurants } = useContext(RestaurantContext)

   const router = useRouter()

   useEffect(async () => {
      try {
         let qry = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/restaurants`

         const { data } = await axios.get(qry)

         setRestaurants(data.data)
      } catch (error) {
         console.error(error)
      }
   }, [])

   const handleRestaurantSelect = (id) => router.push(`/restaurants/${id}`)

   return (
      <table className="table table-light table-hover shadow-sm">
         <thead>
            <tr>
               <th scope="col">Name</th>
               <th scope="col">Location</th>
               <th scope="col">Review</th>

               <th scope="col" className="col-1">
                  Price
               </th>

               <th scope="col" className="col-1">
                  Edit
               </th>

               <th scope="col" className="col-1">
                  Delete
               </th>
            </tr>
         </thead>

         <tbody>
            {restaurants.length ? (
               restaurants.map((restaurant) => (
                  <tr key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}>
                     <th scope="row">{restaurant.name}</th>
                     <td>{restaurant.location}</td>
                     <td>review</td>

                     <td>{"$".repeat(restaurant.price_range)}</td>

                     <td>
                        <Edit restaurant={restaurant} />
                     </td>

                     <td>
                        <Delete id={restaurant.id} />
                     </td>
                  </tr>
               ))
            ) : (
               <tr>
                  <td colSpan="6" className="text-center">
                     There No Data, Please Add A Restaurant
                  </td>
               </tr>
            )}
         </tbody>
      </table>
   )
}
