import Head from "next/head"
import axios from "axios"
import StarRating from "../../components/StarRating"
import Reviews from "../../components/Reviews"

export default function Restaurant({ restaurant, reviews }) {
   return (
      <>
         <Head>
            <title>{restaurant.name} Restaurant</title>
         </Head>

         <div className="container">
            <h1>{restaurant.name} Restaurant</h1>

            <Reviews reviews={reviews} />
         </div>
      </>
   )
}

export async function getStaticProps({ params }) {
   try {
      // Get the data of restaurant with id
      let qry = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/restaurants/${params.restaurantId}`
      const restaurant = await axios.get(qry)

      // Get the reviews of restaurant with id
      let reviewQry = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/reviews/${params.restaurantId}`
      const reviews = await axios.get(reviewQry)

      return {
         props: { restaurant: restaurant.data.data[0], reviews: reviews.data.data },
      }
   } catch (error) {
      return {
         notFound: true,
      }
   }
}

export async function getStaticPaths() {
   // Retrieve all the possible paths
   let qry = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/restaurants`
   const { data } = await axios.get(qry)

   // Return them to NextJs Context
   return {
      paths: data.data.map((restaurant) => ({
         params: { restaurantId: String(restaurant.id) },
      })),
      // tell nextjs to show a 404 if the params is not matched
      fallback: false,
   }
}
