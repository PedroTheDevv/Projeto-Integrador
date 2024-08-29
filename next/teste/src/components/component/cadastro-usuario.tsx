import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CadastroUsuario() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-primary to-secondary">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crie sua conta</CardTitle>
          <CardDescription>Preencha os campos abaixo para se cadastrar em nossa loja.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Digite seu nome" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="exemplo@email.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="Digite sua senha" />
            </div>
            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="#" className="font-medium underline underline-offset-4" prefetch={false}>
            Faça login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}