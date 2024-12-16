import React, { useState } from "react"
import Typewriter from "typewriter-effect"
import axios from "axios"

const PlayerForm = ({ onRegister }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await axios.post("/api/players", {
        name,
        email,
        password,
      })
      const { id } = response.data
      localStorage.setItem("playerId", id)
      onRegister(id)
    //   alert(`Player created with ID: ${id}`)
    } catch (err) {
      console.error(err)

      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const messages = err.response.data.errors
            .map(error => error.msg)
            .join(", ")
          setError(messages)
        } else if (err.response.data.error) {
          setError(err.response.data.error)
        } else {
          setError("Произошла неизвестная ошибка.")
        }
      } else {
        setError("Ошибка при создании игрока. Проверьте введенные данные.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <h2>Добро пожаловать в сеть "РОБКО Индастриз(TM)"</h2>
      </div>
      <div className="">
        <h3>Введите данные для авторизации</h3>
      </div>
      <div className="output">
        <p style={{minWidth: "200px", display: "flex", alignItems: "center"}}>Введите имя<span style={{marginLeft: "auto", userSelect: "none"}}>:</span></p>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          minLength={3}
        />
      </div>
      <div className="output">
        <p style={{minWidth: "200px", display: "flex", alignItems: "center"}}>Введите e-mail<span style={{marginLeft: "auto", userSelect: "none"}}>:</span></p>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="output">
        <p style={{minWidth: "200px", display: "flex", alignItems: "center"}}>Введите пароль<span style={{marginLeft: "auto", userSelect: "none"}}>:</span></p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={6}
          maxLength={32}          
        />
      </div>
      {error && <div className="error">{error}</div>}

      <div className="cursed">
        <div>
          <p>0x71E4 ##@АН"~-'_G</p>
          <p>0x7100 ПАР@":-^ГЕЛ</p>
          <p>0x7268 {"+]/#ОЛЬ;+!3"}</p>
        </div>
        
        <div>
          <p>0x71E4 ##ПРО.~-'_G</p>
          <p>0x7100 #$$@":-СТОЙ</p>
          <p>0x7268 {"+]/0108;+!3"}</p>
        </div>
      </div>

      <div className="output">
        <p style={{ marginRight: "20px" }}>Войти в сеть? : </p>
        <button type="submit" disabled={loading}>
          {loading ? "Зачем пароль..." : "Войти"}
        </button>
        <span style={{ margin: "0 20px" }}>/</span>
        <button
          className="exit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? "Еблан?" : "Нет"}
        </button>
      </div>
      {/* <div className="output">
        <p>
          <Typewriter></Typewriter>
        </p>
      </div> */}
    </form>
  )
}

export default PlayerForm
