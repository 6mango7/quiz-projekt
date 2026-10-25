import { useCallback, useEffect, useMemo, useState } from 'react'
import * as api from '../api/api'
import { AuthContext } from './contexts'

export function AuthProvider({ children }) {
  const [state, setState] = useState({ loading: true, user: null })

  // Przy starcie sprawdzamy, czy ktoś jest zalogowany
  useEffect(() => {
    let active = true
    api.getSession().then((user) => {
      if (active) setState({ loading: false, user })
    })
    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (credentials) => {
    const user = await api.login(credentials)
    setState({ loading: false, user })
    return user
  }, [])

  const register = useCallback(async (data) => {
    const user = await api.register(data)
    setState({ loading: false, user })
    return user
  }, [])

  const logout = useCallback(async () => {
    await api.logout()
    setState({ loading: false, user: null })
  }, [])

  // Po edycji profilu lub usunięciu konta
  const setUser = useCallback((user) => setState({ loading: false, user }), [])

  const value = useMemo(
    () => ({
      user: state.user,
      loading: state.loading,
      login,
      register,
      logout,
      setUser,
    }),
    [state, login, register, logout, setUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
