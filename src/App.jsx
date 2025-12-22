import { Button , } from "@/components/ui/Button"
import { Card } from "./components/ui/card"

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <Button>Default Button</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Card className="w-64">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Card Title</h2>
          <p className="text-sm text-muted-foreground">This is a description inside the card.</p>
        </div>
      </Card>
    </div>
  )
}

export default App