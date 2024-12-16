import React, { useState, useEffect } from "react"
import PlayerForm from "../components/PlayerForm"
import Clicker from "../components/Clicker"
import Leaderboard from "../components/Leaderboard"
import Layout from "../components/layout"
import Footbar from "../components/footbar"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import loadingIMG from "../images/loading.jpg"

const IndexPage = () => {

  const [playerId, setPlayerId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedPlayerId = localStorage.getItem("playerId")
    if (storedPlayerId) {
      setPlayerId(storedPlayerId)
    }
    setLoading(false)
  }, [])

  const handleRegister = id => {
    setPlayerId(id)
  }

  if (loading) {
  
    return (
      <div className="loading-container">
        <img
          src={loadingIMG}
          alt="Please Stand By"
          className="loading-image"
        />
      </div>
    )
  }

  return (
    <>
      <Layout>
        {!playerId ? (
          <PlayerForm onRegister={handleRegister} />
        ) : (
          <>
            <div className="flex">
              <Clicker playerId={playerId} />
              <StaticImage
                src="../images/vaultbOy.png"
                height={350}
                objectFit="contain"
                className="vaultBoy"
              />
              <Leaderboard />
            </div>

            <Footbar />
          </>
        )}
      </Layout>
    </>
  )
}

export const Head = () => <Seo title="Mainframe Terminal" />

export default IndexPage
