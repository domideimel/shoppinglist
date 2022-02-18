import create from 'zustand'
import { Auth } from '../types/auth'

export const useAuth = create<Auth>((set => ({
  user: null,
  setUser: user => set(state => ({ ...state, user })),
})))