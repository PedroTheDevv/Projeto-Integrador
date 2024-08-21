import Link from "next/link"
import React from 'react';
import { Input } from "@/components/ui/input"
import { LogInIcon, SearchIcon } from "lucide-react"
import '../styles/header.css'

export function Header(){
    return(
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <LogInIcon className="w-8 h-8" />
          <span className="text-xl font-bold">Moda Feminina</span>
        </Link>
          <nav className="flex items-center gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              Categorias
            </Link>
            <div className="relative">
              <Input
              type="search"
              placeholder="Buscar roupas..."
              className="bg-primary-foreground/10 border-none focus:ring-0 pr-8"
              />
              <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
              <Link href="#" className="hover:underline" prefetch={false}>
                Carrinho
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                Login
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                Cadastro
              </Link>
            </nav>
        </header>
    );
}