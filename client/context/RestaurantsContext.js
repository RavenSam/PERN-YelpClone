import { useState, createContext } from "react"

export const RestaurantContext = createContext()

export const RestaurantContextProvider = ({ children }) => {
   const [restaurants, setRestaurants] = useState([])

   // Function to Add a restaurant to the Context
   const addRestaurant = (newRestaurant) => setRestaurants([...restaurants, newRestaurant])

   // Delete a restaurant from context
   const deleteRestaurant = (id) => setRestaurants(restaurants.filter((el) => el.id !== id))

   // Edit a restaurant on context
   const editRestaurant = (id, newRestaurant) => {
      const newRestaurants = restaurants.map((obj) => (obj.id === id ? newRestaurant : obj))

      setRestaurants(newRestaurants)
   }

   const values = { restaurants, setRestaurants, addRestaurant, deleteRestaurant, editRestaurant }
   return <RestaurantContext.Provider value={values}>{children}</RestaurantContext.Provider>
}
