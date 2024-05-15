import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { AuthService } from '../services/auth.service'

const useLogout = () => {

	const [loading, setLoading] = useState(false)
	const {setAuthUser} = useAuthContext()

	const logout = async () => {
		setLoading(true)
		try {
			const data  = await AuthService.postLogout()

			localStorage.removeItem("user")
			setAuthUser(null)
			console.log(data);
			
		} catch (error) {
			toast.error(`Error: ${error}`)
		} finally{
			setLoading(false)
		}
	}

	return {loading, logout}
}

export default useLogout

