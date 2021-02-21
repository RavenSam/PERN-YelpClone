import axios from "axios"
import { useState, useContext } from "react"
import { RestaurantContext } from "../context/RestaurantsContext"

export default function Edit(props) {
   const { editRestaurant } = useContext(RestaurantContext)
   const [restaurant, setRestaurant] = useState(props.restaurant)

   const handleChange = (e) => {
      setRestaurant({ ...restaurant, [e.target.name]: e.target.value })
   }

   const handleEdit = async (e) => {
      e.stopPropagation()
      try {
         let qry = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/restaurants/${restaurant.id}`

         const { data } = await axios.put(qry, restaurant)

         editRestaurant(restaurant.id, data.data)
      } catch (err) {
         console.error(err.message)
      }
   }
   return (
      <>
         <button
            className="btn btn-warning"
            onClick={(e) => e.stopPropagation()}
            data-bs-toggle="modal"
            data-bs-target={`#id${restaurant.id}`}
         >
            <i className="fa fa-pen"></i>
         </button>

         <div
            className="modal fade"
            id={`id${restaurant.id}`}
            tabIndex="-1"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
            onClick={(e) => e.stopPropagation()}
         >
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="editModalLabel">
                        Edit Restaurant
                     </h5>
                     <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => setRestaurant(props.restaurant)}
                     ></button>
                  </div>
                  <div className="modal-body">
                     <input
                        type="text"
                        className="form-control  my-2"
                        name="name"
                        value={restaurant.name}
                        onChange={handleChange}
                     />

                     <input
                        type="text"
                        className="form-control my-2"
                        name="location"
                        value={restaurant.location}
                        onChange={handleChange}
                     />

                     <select
                        value={restaurant.price_ringe}
                        onChange={handleChange}
                        name="price_range"
                        className="form-select my-2 "
                     >
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                     </select>
                  </div>
                  <div className="modal-footer">
                     <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => setRestaurant(props.restaurant)}
                     >
                        Close
                     </button>
                     <button type="button" onClick={handleEdit} className="btn btn-primary" data-bs-dismiss="modal">
                        Edit
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
