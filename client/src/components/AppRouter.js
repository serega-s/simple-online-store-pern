import React, { useContext } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Context } from "../index"
import { observer } from "mobx-react-lite"
import { authRoutes, publicRoutes } from "../routes"

const AppRouter = observer(() => {
  const { user } = useContext(Context)

  return (
    <Routes>
      {user.isAuth === true &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
})

export default AppRouter
