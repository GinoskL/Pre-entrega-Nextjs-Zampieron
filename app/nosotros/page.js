import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Target, Leaf } from "lucide-react"

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-[#1B344B] text-[#EFE9D5] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Sobre Nosotros</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-[#497D74] border-none shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Briefcase className="mr-2" /> Nuestra Misión
              </h2>
              <p className="text-lg">
                Nuestra misión es ofrecer tecnología de vanguardia accesible para todos, brindando un servicio
                excepcional y asesoramiento experto a nuestros clientes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#497D74] border-none shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Users className="mr-2" /> Nuestro Equipo
              </h2>
              <p className="text-lg">
                Contamos con un equipo de expertos apasionados por la tecnología, siempre listos para ayudarte a
                encontrar la solución perfecta para tus necesidades.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#497D74] border-none shadow-lg mb-12">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Target className="mr-2" /> Nuestros Valores
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-[#71BBB2] p-2 rounded-full mr-3">
                  <Leaf className="text-[#1B344B]" />
                </div>
                <div>
                  <h3 className="font-semibold">Innovación constante</h3>
                  <p>Siempre a la vanguardia de la tecnología</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#71BBB2] p-2 rounded-full mr-3">
                  <Users className="text-[#1B344B]" />
                </div>
                <div>
                  <h3 className="font-semibold">Atención al cliente de primera</h3>
                  <p>Tu satisfacción es nuestra prioridad</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#71BBB2] p-2 rounded-full mr-3">
                  <Target className="text-[#1B344B]" />
                </div>
                <div>
                  <h3 className="font-semibold">Compromiso con la calidad</h3>
                  <p>Solo los mejores productos para ti</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#71BBB2] p-2 rounded-full mr-3">
                  <Leaf className="text-[#1B344B]" />
                </div>
                <div>
                  <h3 className="font-semibold">Responsabilidad ambiental</h3>
                  <p>Comprometidos con un futuro sostenible</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Quieres saber más sobre nosotros?</h2>
          <Button className="bg-[#71BBB2] text-[#1B344B] hover:bg-[#EFE9D5]">Contáctanos</Button>
        </div>
      </div>
    </div>
  )
}

