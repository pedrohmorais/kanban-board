import axiosConfig from './axios.service'

const isBrowser = typeof window !== 'undefined'

export class LoginService {
  public static async login(
    username: string,
    password: string,
  ): Promise<string> {
    return axiosConfig
      .post('/login', {
        username,
        password,
      })
      .then(({ data }) => {
        const { token } = data
        if (isBrowser && token) {
          window.localStorage.setItem('token', token)
        }
        return String(token)
      })
  }
}
