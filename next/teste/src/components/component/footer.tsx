import Link from "next/link"
import { FacebookIcon, InstagramIcon, TwitterIcon } from "./icons"
import '../styles/footer.css'

export function Footer(){
    return(
    <footer className="bg-muted flex-column text-muted-foreground py-8 px-6">
        <div id="mainFooter" className="container mx-auto flex-row grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Sobre Nós</h3>
            <p>
              Somos uma loja online especializada em moda feminina, oferecendo as últimas tendências com qualidade e
              preços acessíveis.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Vestidos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Blusas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Calças
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Saias
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Siga-nos</h3>
            <div className="flex gap-4">
              <Link href="#" className="hover:underline" prefetch={false}>
                <FacebookIcon className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                <InstagramIcon className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                <TwitterIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">&copy; 2024 Moda Feminina. Todos os direitos reservados.</div>
      </footer>
    )
}