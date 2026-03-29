import { Routes, Route } from 'react-router-dom'
import TerminalLayout from './components/TerminalLayout'
import Readme from './pages/Readme'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'

const App = () => {
  return (
    <Routes>
      <Route element={<TerminalLayout />}>
        <Route path="/" element={<Readme />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App
