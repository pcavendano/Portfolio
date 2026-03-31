import { Routes, Route } from 'react-router-dom'
import TerminalLayout from './components/TerminalLayout'
import Readme from './pages/Readme'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Consulting from './pages/Consulting'
import ConsultingStatus from './pages/ConsultingStatus'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

const App = () => {
  return (
    <Routes>
      <Route element={<TerminalLayout />}>
        <Route path="/" element={<Readme />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/consulting/status/:id" element={<ConsultingStatus />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}

export default App
