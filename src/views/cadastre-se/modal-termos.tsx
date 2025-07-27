import { BoxApp } from "@/component/box/box-app";
import { ModalChildren } from "@/component/modal/modal-children";
import { TextApp } from "@/component/text/text-app";

interface ModalTermosProps {
  open: boolean;
  onClose: () => void;
}

export function ModalTermos({ open, onClose }: ModalTermosProps) {
  return (
    <ModalChildren retirarFooter open={open} close={onClose}>
      <BoxApp display="flex" flexDirection="column" gap="1rem">
        <TextApp titulo="Bem-vindo à plataforma Mapa da pes. Ao criar uma conta como Guia de Pesca, você concorda com os termos descritos abaixo. Caso não concorde, não utilize os serviços." />
        <TextApp
          fontWeight={600}
          titulo="1. Cadastro e Responsabilidades do Guia"
        />
        <BoxApp>
          <TextApp titulo="1.1 O guia é responsável por fornecer informações verdadeiras e atualizadas, incluindo dados de contato e localização." />
          <TextApp titulo="1.2 O guia deve manter sua conta segura, não compartilhando senhas ou acessos com terceiros." />
          <TextApp titulo="1.3 A plataforma não se responsabiliza por informações incorretas inseridas pelos usuários." />
        </BoxApp>
        <TextApp fontWeight={600} titulo="2. Coleta e Uso da Localização" />
        <BoxApp>
          <TextApp titulo="2.1 A localização (latitude e longitude) informada pelo guia será utilizada para exibir sua área de atuação e sugerir seus serviços a pescadores próximos." />
          <TextApp titulo="2.2 A localização será armazenada de forma segura e não será compartilhada com terceiros fora da plataforma." />
          <TextApp titulo="2.3 Ao criar uma conta, o guia autoriza o uso da localização para esses fins." />
        </BoxApp>
        <TextApp fontWeight={600} titulo="3. Privacidade e LGPD" />
        <BoxApp>
          <TextApp titulo="3.1 Os dados pessoais e de localização do guia são tratados conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)." />
          <TextApp titulo="3.2 O guia pode, a qualquer momento, solicitar a exclusão de sua conta e dados." />
          <TextApp titulo="3.3 Os dados não serão vendidos ou cedidos a terceiros para fins comerciais." />
        </BoxApp>
        <TextApp fontWeight={600} titulo="4. Uso da Plataforma" />
        <BoxApp>
          <TextApp titulo="4.1 A plataforma deve ser utilizada apenas para conectar pescadores e guias de pesca." />
          <TextApp titulo="4.2 É proibido o uso para fins ilegais, divulgação de informações falsas, ou qualquer ação que prejudique outros usuários." />
        </BoxApp>
      </BoxApp>
      <TextApp fontWeight={600} titulo="5. Limitação de Responsabilidade" />
      <BoxApp>
        <TextApp titulo="5.1 A plataforma não garante a contratação do guia, nem é responsável por eventuais conflitos, acidentes ou prejuízos decorrentes dos serviços prestados." />
        <TextApp titulo="5.2 O papel da plataforma é apenas facilitar o contato entre pescadores e guias." />
      </BoxApp>
      <TextApp fontWeight={600} titulo="6. Exibição Pública" />
      <BoxApp>
        <TextApp titulo="6.1 Ao aceitar os termos, o guia autoriza a exibição do seu perfil, avaliações e localização para pescadores que utilizam a plataforma." />
        <TextApp titulo="6.2 O guia pode revogar essa autorização solicitando a exclusão ou desativação da conta." />
      </BoxApp>
      <TextApp fontWeight={600} titulo="7. Alterações nos Termos" />
      <BoxApp>
        <TextApp titulo="7.1 A plataforma pode modificar este termo de uso a qualquer momento." />
        <TextApp titulo="7.2 Em caso de alterações relevantes, o guia será notificado." />
      </BoxApp>
      <TextApp fontWeight={600} titulo="8. Aceite dos Termos" />
      <BoxApp>
        <TextApp titulo="8.1 Ao criar uma conta, você confirma que leu, compreendeu e aceita todos os termos acima." />
      </BoxApp>
    </ModalChildren>
  );
}
