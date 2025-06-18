import React from 'react';
import { Building2, Users, Globe2, ArrowRight, LogIn, Factory, Leaf, Award, Zap, Shield, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================================================================ */}
      {/* HEADER - Cabeçalho com logo e navegação */}
      {/* ================================================================ */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Factory className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">Lopes Solutions</span>
            </div>
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* HERO SECTION - Seção principal com destaque */}
      {/* ================================================================ */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
            alt="Industrial manufacturing"
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Soluções Industriais<br />Inteligentes e Eficientes
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mb-8">
            Transformamos processos industriais com tecnologia avançada, oferecendo soluções personalizadas para otimizar sua produção e reduzir custos operacionais.
          </p>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors text-lg">
            <span>Conheça Nossas Soluções</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* FEATURES SECTION - Principais diferenciais da empresa */}
      {/* ================================================================ */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher a Lopes Solutions?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Somos especialistas em automação industrial e gestão de processos, oferecendo soluções sob medida para empresas que buscam excelência operacional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1: Automação Inteligente */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Automação Inteligente</h3>
              <p className="text-gray-600">Sistemas automatizados que aumentam a eficiência e reduzem erros operacionais em até 85%</p>
            </div>

            {/* Feature 2: Sustentabilidade */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sustentabilidade</h3>
              <p className="text-gray-600">Soluções eco-friendly que reduzem o consumo energético e o impacto ambiental</p>
            </div>

            {/* Feature 3: Suporte Especializado */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Suporte 24/7</h3>
              <p className="text-gray-600">Equipe técnica especializada disponível para suporte contínuo e manutenção preventiva</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* SERVICES SECTION - Serviços oferecidos */}
      {/* ================================================================ */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
            <p className="text-lg text-gray-600">Soluções completas para sua indústria</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Serviço 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Target className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Gestão de Produção</h3>
              <p className="text-gray-600 mb-4">Sistemas integrados para controle e monitoramento da produção em tempo real</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Dashboards em tempo real</li>
                <li>• Relatórios automatizados</li>
                <li>• Controle de qualidade</li>
              </ul>
            </div>

            {/* Serviço 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Building2 className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Automação Industrial</h3>
              <p className="text-gray-600 mb-4">Implementação de sistemas automatizados para otimizar processos</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• PLCs e sistemas SCADA</li>
                <li>• Robótica industrial</li>
                <li>• Sensores inteligentes</li>
              </ul>
            </div>

            {/* Serviço 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Consultoria Técnica</h3>
              <p className="text-gray-600 mb-4">Análise e otimização de processos industriais existentes</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Auditoria de processos</li>
                <li>• Planos de melhoria</li>
                <li>• Treinamento de equipes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* STATS SECTION - Números da empresa */}
      {/* ================================================================ */}
      <div className="bg-green-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Lopes Solutions em Números</h2>
            <p className="text-green-200">Resultados que comprovam nossa excelência</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">150+</div>
              <div className="text-green-200">Projetos Concluídos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">85%</div>
              <div className="text-green-200">Redução de Custos Média</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">12</div>
              <div className="text-green-200">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-green-200">Suporte Técnico</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* ABOUT SECTION - Sobre a empresa */}
      {/* ================================================================ */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre a Lopes Solutions</h2>
              <p className="text-lg text-gray-600 mb-6">
                Fundada em 2012, a Lopes Solutions nasceu com o propósito de revolucionar a indústria brasileira através de soluções tecnológicas inovadoras e acessíveis.
              </p>
              <p className="text-gray-600 mb-6">
                Nossa equipe de engenheiros especializados trabalha lado a lado com nossos clientes para desenvolver soluções personalizadas que atendam às necessidades específicas de cada negócio, sempre priorizando a eficiência, sustentabilidade e retorno sobre investimento.
              </p>
              <div className="flex items-center space-x-4">
                <Award className="h-8 w-8 text-green-600" />
                <div>
                  <div className="font-semibold text-gray-900">Certificação ISO 9001</div>
                  <div className="text-sm text-gray-600">Qualidade garantida em todos os processos</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80"
                alt="Equipe Lopes Solutions"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* CTA SECTION - Chamada para ação */}
      {/* ================================================================ */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para transformar sua indústria?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como nossas soluções podem otimizar seus processos e aumentar sua competitividade no mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors">
              Solicitar Orçamento
            </button>
            <button className="border border-green-600 text-green-600 px-8 py-3 rounded-md hover:bg-green-50 transition-colors">
              Agendar Demonstração
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* FOOTER - Rodapé com informações da empresa */}
      {/* ================================================================ */}
      <footer className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e descrição */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Factory className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold text-gray-900">Lopes Solutions</span>
              </div>
              <p className="text-gray-600 mb-4">
                Transformando a indústria brasileira através de soluções tecnológicas inovadoras e sustentáveis.
              </p>
              <div className="text-sm text-gray-500">
                © 2024 Lopes Solutions. Todos os direitos reservados.
              </div>
            </div>

            {/* Contato */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contato</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>contato@lopessolutions.com.br</div>
                <div>(11) 3456-7890</div>
                <div>São Paulo - SP</div>
              </div>
            </div>

            {/* Serviços */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Serviços</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Automação Industrial</div>
                <div>Gestão de Produção</div>
                <div>Consultoria Técnica</div>
                <div>Suporte 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;