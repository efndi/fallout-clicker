import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Footbar from "../components/footbar"
import { StaticImage } from "gatsby-plugin-image"

// import img1 from "../images/97613.jpg"
// import img2 from "../images/92637.jpg"
// import img3 from "../images/77438.jpg"
// import img4 from "../images/25714.jpg"
// import img5 from "../images/05695.jpg"
// import img6 from "../images/05586.jpg"

// Массив данных вкладок
const tabsData = [
    {
      id: 1,
      title: "Квадрабобер",
      image: "img1",
      text: "Я ицент- ижен- идрен- иденифтизи- блять я супермен Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, porro ab recusandae dignissimos atque voluptatem culpa quo facere illum aspernatur sequi velit, voluptas numquam animi natus rerum nisi unde quia.",
    },
    {
      id: 2,
      title: "Умный",
      image: "img2",
      text: "Ебать я умный хэхэ Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, porro ab recusandae dignissimos atque voluptatem culpa quo facere illum aspernatur sequi velit, voluptas numquam animi natus rerum nisi unde quia.",
    },
    {
      id: 3,
      title: "Манекен",
      image: "img3",
      text: "Т Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, porro ab recusandae dignissimos atque voluptatem culpa quo facere illum aspernatur sequi velit, voluptas numquam animi natus rerum nisi unde quia.",
    },
    {
      id: 4,
      title: "Женщина",
      image: "img4",
      text: "АааАА Женщница Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, порro ab recusandae dignissimos atque voluptatem culpa quo facere illum aspernatur sequi velit, voluptas numquam animi natus rerum nisi unde quia.",
    },
    {
      id: 5,
      title: "Китаец",
      image: "img5",
      text: "Я злой где мои суши Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, porro ab recusandae dignissimos atque voluptatem culpa quo facere illum aspernatur sequi velit, voluptas numquam animi natus rerum nisi unde quia.",
    },
    {
      id: 6,
      title: "Чиназез",
      image: "img6",
      text: "Асалам алейкум братья Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, porro ab recusandae dignissimos atque voluptatem culpa quo facere illum aspernatur sequi velit, voluptas numquam animi natus rerum nisi unde quia.",
    },
  ]
  
  // Компонент для отображения изображений через StaticImage
  const TabImage = ({ imageKey, alt }) => {
    switch (imageKey) {
      case "img1":
        return <StaticImage src="../images/97613.jpg" alt={alt} className="tab-image" />
      case "img2":
        return <StaticImage src="../images/92637.jpg" alt={alt} className="tab-image" />
      case "img3":
        return <StaticImage src="../images/77438.jpg" alt={alt} className="tab-image" />
      case "img4":
        return <StaticImage src="../images/25714.jpg" alt={alt} className="tab-image" />
      case "img5":
        return <StaticImage src="../images/05695.jpg" alt={alt} className="tab-image" />
      case "img6":
        return <StaticImage src="../images/05586.jpg" alt={alt} className="tab-image" />
      default:
        return null
    }
  }
  
  const Special = () => {
    const [activeTab, setActiveTab] = useState(1)
  
    return (
      <Layout>
        <Footbar />
        <div className="tabs-container">
          <div className="tabs-list">
            {tabsData.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
                <span>{tab.id}</span>
              </button>
            ))}
          </div>

          <div className="tab-content">
            {tabsData.map(
              tab =>
                tab.id === activeTab && (
                    <div key={tab.id}>
                      <TabImage imageKey={tab.image} alt={tab.title} />
                      <p>{tab.text}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        </Layout>
      )
    }
    
    export default Special
    
