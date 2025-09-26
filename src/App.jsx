//componente rsponsavel por emitir notificaçoes utilizando a biblioteca react-hot-tost
import { AuthProvider } from "./context/AuthContext";
//importaçao do arquivo authProvider responsavel pela autenticaçao dos usuarios e controle de rotas privadas

//omportaçaoo do appRoutes componentes de gerenciamento de rotas
import { AppRoutes } from "./routes/AppRoutes";

// construçao codigo principal
function App(){
     return(
          <AuthProvider>
            <AppRoutes/>
          </AuthProvider>
     )
}
export default App;