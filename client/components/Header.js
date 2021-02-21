export default function Header() {
   return (
      <nav className="navbar navbar-dark bg-dark py-3 mb-5">
         <div className="container-fluid container">
            <a className="navbar-brand">
            Yelp<span className="text-primary" >Clone</span>
            </a>

            <div className="">
               <button className="btn btn-primary ">Log In</button>
            </div>
         </div>
      </nav>
   )
}
