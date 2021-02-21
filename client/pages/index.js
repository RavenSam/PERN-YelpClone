import Head from "next/head"

import { Header, AddRestaurant, RestaurantsList } from "../components"

export default function Home() {
   return (
      <>
         <Head>
            <title>Yelp Clone</title>
         </Head>

         <Header />

         <div className="container">
            <AddRestaurant />

            <RestaurantsList />
         </div>
      </>
   )
}
