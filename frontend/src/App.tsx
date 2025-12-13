import { Footer } from './components/footer';
import { Form } from './components/form';
import { Header } from './components/header';
import './sass/App.scss'

function App() {
  // const onSubmit = async (data: FormData) => { const response = await fetch("http://localhost:5000/api/download", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); const blob = await response.blob(); const url = window.URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "video"; a.click(); window.URL.revokeObjectURL(url); };

  return (
    <>
      <Header />
      <Form />
      <Footer />
    </>
  )
}

export default App
