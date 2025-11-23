import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import NotFound from './NotFound'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
};

export default App;
