import { Button } from "@/components/ui/button"

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center gap-4">
      <Button>Default Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="destructive">Destructive Button</Button>
    </div>
  )
}

export default App