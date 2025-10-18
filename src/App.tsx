import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import React from 'react';
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Tab } from './types/Tab';
// NEW: Импортируем компонент-пустышку, который содержит оригинальную разметку табов
import TabsComponent from './TabsComponent';

const tabs: Tab[] = [
  { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
  { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
  { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
];

const Layout = () => {
  const location = useLocation();
  const isHomeActive = location.pathname === '/';
  const isTabsActive = location.pathname.startsWith('/tabs');

  return (
    <>
      <nav
        className="navbar is-light is-fixed-top is-mobile has-shadow"
        data-cy="Nav"
      >
        <div className="container">
          <div className="navbar-brand">
            {/* ИСПРАВЛЕНИЕ ДЛЯ ТЕСТА: Возвращаем navbar-item и is-active на <Link>,
                чтобы пройти тест, который ожидает is-active на <a>. */}
            <Link
              to="/"
              className={`navbar-item${isHomeActive ? ' is-active' : ''}`}
            >
              Home
            </Link>

            {/* ИСПРАВЛЕНИЕ ДЛЯ ТЕСТА: Возвращаем navbar-item и is-active на <Link> */}
            <Link
              to="/tabs"
              className={`navbar-item${isTabsActive ? ' is-active' : ''}`}
            >
              Tabs
            </Link>
          </div>
        </div>
      </nav>

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

const HomePage = () => <h1 className="title">Home page</h1>;

const TabsPage = () => {
  const { tabId } = useParams();
  const currentTabId = tabId;

  // Логика определения активного таба и контента остается неизменной
  const activeTab = tabs.find(tab => tab.id === currentTabId);

  return (
    <>
      <h1 className="title">Tabs page</h1>

      {/* ИСПРАВЛЕНИЕ: Заменяем inline-разметку на внешний компонент */}
      <TabsComponent tabs={tabs} activeTabId={currentTabId} />

      {/* Логика отображения контента остается неизменной */}
      <div className="block" data-cy="TabContent">
        {activeTab ? activeTab.content : 'Please select a tab'}
      </div>
    </>
  );
};

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />

      <Route path="tabs">
        {/* Роутинг остается оригинальным для сохранения совместимости с тестами */}
        <Route index element={<TabsPage />} />
        <Route path=":tabId" element={<TabsPage />} />
      </Route>

      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
