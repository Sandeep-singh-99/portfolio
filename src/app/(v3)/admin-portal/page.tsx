'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import AdminHomeComponent from '@/components/AdminHomeComponent'
import AdminAboutComponent from '@/components/AdminAboutComponent'
import AdminSkillComponent from '@/components/AdminSkillComponent'
import AdminProjectsComponent from '@/components/AdminProjectsComponent'
import AdminContactComponent from '@/components/AdminContactComponent'

function Admin() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/admin-login')
    }
  }, [router])

  const tabItems = [
    { key: '0', label: 'Home', children: <AdminHomeComponent /> },
    { key: '1', label: 'About', children: <AdminAboutComponent /> },
    { key: '2', label: 'Skills', children: <AdminSkillComponent /> },
    { key: '3', label: 'Projects', children: <AdminProjectsComponent /> },
    { key: '4', label: 'Contact', children: <AdminContactComponent /> },
  ]

  return (
    <div className="h-screen bg-black flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-4">
        <Tabs
          defaultActiveKey="0"
          tabPosition="top"
          items={tabItems}
          centered
          tabBarStyle={{
            background: '#f5f5f5',
            padding: '10px',
            borderRadius: '8px',
          }}
          size="large"
        />
      </div>
    </div>
  )
}

export default Admin
