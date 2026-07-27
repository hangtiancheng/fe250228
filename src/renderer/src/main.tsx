import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { App as AntdApp, ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import App from './App'
import { feedback } from './feedback'
import './assets/main.css'

function FeedbackBinder(): null {
  const { message, modal } = AntdApp.useApp()
  useEffect(() => {
    feedback.message = message
    feedback.modal = modal
  }, [message, modal])
  return null
}

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#f5a623',
          colorInfo: '#f5a623',
          colorBgBase: '#101116',
          colorBgContainer: '#16181f',
          colorBgElevated: '#1e2029',
          colorBorder: '#2a2d3a',
          colorBorderSecondary: '#1e2029',
          borderRadius: 8
        }
      }}
    >
      <AntdApp message={{ maxCount: 3 }}>
        <FeedbackBinder />
        <App />
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>
)
