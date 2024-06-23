import './App.css'
import { ProffyProvider } from './context/proffyContext'
import AppRoutes from './routes'

function App() {
    return (
        <div className="App">
            <ProffyProvider>
                <AppRoutes />
            </ProffyProvider>
        </div>
    )
}

export default App
