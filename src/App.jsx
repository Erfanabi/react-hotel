import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import Hotels from "./components/Hotels/Hotels";
import AppLayout from "./components/AppLayout";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookMark from "./components/BookMark/BookMark";
import NewBookMark from "./components/NewBookMark/NewBookMark";
import BookMarkList from "./components/BookMarkList/BookMarkList";
import BookMarksProvider from "./components/context/BookMarksProvider";
import SignalBookmark from "./components/SignalBookmark/SignalBookmark";
import Login from "./components/Login/Login";
import AuthProvider from "./components/context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <BookMarksProvider>
        <HotelsProvider>
          <div>
            <Toaster />

            <Header />

            <Routes>
              <Route index element={<LocationList />} />

              <Route path="/Hotels" element={<AppLayout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>

              <Route
                path="/bookmark"
                element={
                  <ProtectedRoute>
                    <BookMark />
                  </ProtectedRoute>
                }
              >
                <Route index element={<BookMarkList />} />
                <Route path="add" element={<NewBookMark />} />
                <Route path=":id" element={<SignalBookmark />} />
              </Route>

              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </div>
        </HotelsProvider>
      </BookMarksProvider>
    </AuthProvider>
  );
}

export default App;
