import React, { useState, useEffect } from "react";
import axios from "axios";

const Clicker = () => {
  const playerId = localStorage.getItem("playerId"); 
  const [playerName, setPlayerName] = useState(""); 
  const [clicks, setClicks] = useState(0); 
  const [money, setMoney] = useState(0); 
  const [rank, setRank] = useState("Нет в топе"); 
  const [error, setError] = useState(""); 
  useEffect(() => {
    const fetchPlayerDataAndRank = async () => {
      try {
        if (!playerId) {
          setError("Игрок не найден. Авторизуйтесь заново.");
          return;
        }

        const playerResponse = await axios.get(`/api/players/${playerId}`);
        const { name } = playerResponse.data;
        setPlayerName(name || "Аноним");

        const statsPlayerResponse = await axios.get(`/api/players/${playerId}/stats`);
        const { money: serverMoney, clicks: serverClicks } = statsPlayerResponse.data;
        setClicks(serverClicks || 0);
        setMoney(serverMoney || 0);

        const rankResponse = await axios.get(`/api/players/${playerId}/rank`);
        setRank(rankResponse.data.rank || "Нет в топе");
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить данные. Попробуйте позже.");
      }
    };
    fetchPlayerDataAndRank();
  }, [playerId]);

  const updateStats = async () => {
    try {
      if (!playerId) {
        setError("Игрок не найден. Авторизуйтесь заново.");
        return;
      }

      await axios.post(`/api/players/${playerId}/stats`, { clicks, money });
      setError("");
    } catch (error) {
      console.error(error);
      setError("Не удалось обновить статистику. Попробуйте позже.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateStats();
    }, 5000);

    return () => clearInterval(interval);
  }, [clicks, money, playerId]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRank();
    }, 5000);

    return () => clearInterval(interval);
  }, [playerId]);

  const fetchRank = async () => {
    try {
      if (!playerId) return;
      const rankResponse = await axios.get(`/api/players/${playerId}/rank`);
      setRank(rankResponse.data.rank || "Нет в топе");
    } catch (err) {
      console.error(err);
      setError("Не удалось обновить ранг. Попробуйте позже.");
    }
  };

  const handleClick = () => {
    setClicks((prevClicks) => prevClicks + 1);
    setMoney((prevMoney) => prevMoney + 1);
  };

  const handleSave = () => {
    updateStats();
  };

  return (
    <div>
      <h2>Статистика игрока</h2>
      <div>
        <p>Имя игрока: {playerName}</p>
        <p>Место в таблице лидеров: {rank}</p>
      </div>
      <div className="output">
        <p>Клики: {clicks}</p>
      </div>
      <div className="output">
        <p>Деньги: ${money}</p>
      </div>
      <div className="cursed">
        <div>
          <p>0x7232 {"Cr$D%10^25@"}</p>
          <p>0x7333 {"OO?>:)(,$$$"}</p>
          <p>0x7431 {"Б!|/#$!ET?@"}</p>
        </div>
        <div>
          <p>0x7235 {"Н2-02(``)R"}</p>
          <p>5443x0 {"Т6|-ОЛХ:)#@"}</p>
          <p>0x1001 {"+]/0108;+!3"}</p>
        </div>
      </div>
      <button className="clickbtn" onClick={handleClick}>
        Клик
      </button>
      <button className="clickbtn" onClick={handleSave} style={{ marginLeft: "10px" }}>
        Сохранить прогресс
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
export default Clicker;