import StarRating from "./StarRating"

export default function Reviews({ reviews }) {
   return (
      <div className="row my-4">
         {reviews &&
            reviews.map((review) => (
               <div key={review.id} className="col-sm-12 col-md-6 col-lg-4 p-2">
                  <div className="card text-white bg-dark w-10">
                     <div className="card-header  d-flex justify-content-between">
                        <span>{review.name}</span>
                        <span>
                           <StarRating rating={review.rating} />
                        </span>
                     </div>

                     <div className="card-body">
                        <p className="card-text">{review.review}</p>
                     </div>
                  </div>
               </div>
            ))}
      </div>
   )
}
