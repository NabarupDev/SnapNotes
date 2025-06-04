import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Summarize from "./pages/Summarize";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Saved from "./pages/Saved";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <Navbar />
                        <div id="home">
                            <Home />
                        </div>
                        <div id="features" style={{ scrollMarginTop: "70px", paddingTop: "20px" }}>
                            <Features />
                        </div>
                        <div id="how-it-works" style={{ scrollMarginTop: "70px", paddingTop: "20px" }}>
                            <HowItWorks />
                        </div>
                        <div id="faq" style={{ scrollMarginTop: "70px", paddingTop: "20px" }}>
                            <FAQ />
                        </div>
                        <Footer />
                    </>
                } />
                <Route path="/summarize" element={
                    <>
                    <Navbar />
                    <Summarize />
                    </>

                    } />
                <Route path="/saved" element={
                    <>
                    <Navbar />
                        <div style={{ paddingTop: "20px" }}>
                            <Saved />
                        </div>
                    </>
                }
                />
                <Route path="/saved/:id" element={<Saved />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
