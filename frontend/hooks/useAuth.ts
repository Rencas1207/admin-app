import { AuthContext } from "components/global/AuthProvider"
import { useContext } from "react"

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
}

export default useAuth