import { $authHost, $host } from "."
import jwtDecode from "jwt-decode"

export const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
  })

  localStorage.setItem("token", data.token)

  return jwtDecode(data.token)
}

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  })

  localStorage.setItem("token", data.token)
  localStorage.setItem("role", data.role)

  return jwtDecode(data.token)
}

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth")

  localStorage.setItem("token", data.token)

  return jwtDecode(data.token)
}
