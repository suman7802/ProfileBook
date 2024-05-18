import LogIn from './pages/LogIn';
import SignUp from './pages/SingUp';
import VerifyAccount from './pages/VerifyAccount';
import { AuthProvider } from './context/Auth.context';

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <SignUp />
      </div>
    </AuthProvider>
  );
}
