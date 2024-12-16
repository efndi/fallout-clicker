import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения данных лидерборда
    const fetchLeaders = async () => {
      try {
        const response = await axios.get('/api/leaderboard');
        setLeaders(response.data);
        setError(null); // Сбросить ошибки при успешном запросе
      } catch (error) {
        console.error(error);
        setError('Не удалось загрузить лидерборд. Попробуйте позже.');
      }
    };

    fetchLeaders();
    const intervalId = setInterval(fetchLeaders, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Функция для создания ASCII-таблицы
  const generateAsciiTable = (data) => {
    if (data.length === 0) return 'Нет данных для отображения.';

    // Определяем ширину колонок
    const columnWidths = {
      name: Math.max(...data.map((row) => row.name.length), 4),
      money: Math.max(...data.map((row) => String(row.money).length), 5),
    };

    // Строки рамки таблицы
    const borderTopBottom = `+${'-'.repeat(columnWidths.name + 2)}+${'-'.repeat(columnWidths.money + 2)}+`;
    const header = `| ${'Name'.padEnd(columnWidths.name)} | ${'Money'.padEnd(columnWidths.money)} |`;

    // Генерация строк данных
    const rows = data
      .map(
        (row) =>
          `| ${row.name.padEnd(columnWidths.name)} | ${String(row.money).padEnd(columnWidths.money)} |`
      )
      .join('\n');

    return `${borderTopBottom}\n${header}\n${borderTopBottom}\n${rows}\n${borderTopBottom}`;
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Leaderboard</h2>

      {/* Стандартная HTML-таблица - закомментирована */}
      {/*
      <table cellSpacing={3}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Money</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader, index) => (
            <tr key={index}>
              <td>{leader.name}</td>
              <td>{leader.money}</td>
            </tr>
          ))}
        </tbody>
      </table>
      */}

      {/* ASCII-таблица */}
      <pre>
        {generateAsciiTable(leaders)}
      </pre>
    </div>
  );
};

export default Leaderboard;
