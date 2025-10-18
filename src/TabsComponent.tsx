// TabsComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Передаем props, которые нужны для рендеринга
const TabsComponent = ({ tabs, activeTabId }) => {
  return (
    // Этот div соответствует вашей оригинальной разметке Bulma
    <div className="tabs is-boxed">
      <ul>
        {tabs.map(tab => (
          // ЭТО ВАША ОРИГИНАЛЬНАЯ РАЗМЕТКА, которая проходит тесты
          <li
            key={tab.id}
            data-cy="Tab" // Сохраняем data-cy для тестов
            className={tab.id === activeTabId ? 'is-active' : ''} // Используем activeTabId, который приходит из TabsPage
          >
            <Link to={`/tabs/${tab.id}`}>{tab.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabsComponent;
