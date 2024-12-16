import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"

const Footbar = () => {
  const location = useLocation()

  return (
    <div className="footbar">
      <Link to="/" className={location.pathname === "/" ? "wow" : ""}>
        STATUS
      </Link>
      <Link
        to="/special"
        className={location.pathname === "/special/" ? "wow" : ""}
      >
        S.P.E.C.I.A.L
      </Link>
      {/* <Link
        to="/skills"
        className={location.pathname === "/special/" ? "wow" : ""}
      >
        SKILLS
      </Link> */}
    </div>
  )
}

export default Footbar
