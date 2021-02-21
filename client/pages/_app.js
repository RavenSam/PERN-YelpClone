import "../styles/globals.css"
import { RestaurantContextProvider } from "../context/RestaurantsContext"

function MyApp({ Component, pageProps }) {
   return (
      <RestaurantContextProvider>
         <Component {...pageProps} />
      </RestaurantContextProvider>
   )
}

export default MyApp
