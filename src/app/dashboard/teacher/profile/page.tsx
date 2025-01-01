'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import Image from "next/image"
import { LogOut, User, Mail, Calendar, ShieldCheck, BarChart2, Settings, Edit, Bell } from 'lucide-react'
import { useLazyGetCurrentUserQuery, useLogoutMutation } from "@/store/api/authApi"
import { RootState } from "@/store/store"
import { logOutLocal, setUser } from "@/store/features/auth/authSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const ProfilePage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("profile")
  const [getCurrentUser, { data: queryData, isLoading: isUserLoading }] = useLazyGetCurrentUserQuery()
  const { user: userData } = useSelector((state: RootState) => state.auth)
  const [logout] = useLogoutMutation()

  useEffect(() => {
    if (!userData) {
      getCurrentUser()
    }
  }, [userData, getCurrentUser])

  useEffect(() => {
    if (queryData?.user) {
      dispatch(setUser(queryData.user))
    }
  }, [queryData, dispatch])

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google-login"
  }

  const handleLogout = async () => {
    try {
      await logout()
      dispatch(setUser(null))
      dispatch(logOutLocal())
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const user = userData

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
            <CardDescription>Please log in to access your profile</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              onClick={handleGoogleLogin}
              className="w-full max-w-xs bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Login with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Card className="w-full">
        <CardContent className="flex flex-col md:flex-row items-center p-6 space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="w-24 h-24 border-4 border-blue-100">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <Badge variant="secondary" className="text-sm">
              {user.role || 'User'}
            </Badge>
          </div>
          <div className="flex-grow"></div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 p-1">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <BarChart2 className="w-4 h-4" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Preferences</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="p-6">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <span>{user.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-5 h-5 text-gray-500" />
                    <span>{user.role || 'User'}</span>
                  </div>
                  {/* Add more account details here */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="account" className="p-6">
            <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-gray-600">Account management features coming soon!</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-500">
                  <li>Change password</li>
                  <li>Two-factor authentication</li>
                  <li>Linked accounts</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-gray-600">No recent activity to display.</p>
                <p className="mt-2 text-sm text-gray-500">Your recent actions and updates will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="p-6">
            <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-gray-600">Manage your notification preferences here.</p>
                {/* Add notification settings controls here */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="p-6">
            <h3 className="text-xl font-semibold mb-4">User Preferences</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-gray-600">Customize your user experience.</p>
                {/* Add user preference controls here */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

export default ProfilePage

