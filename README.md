# Alzheimer Care App

Este é um aplicativo móvel em **desenvolvimento** criado para auxiliar no monitoramento de pacientes com Alzheimer. O aplicativo permite que cuidadores e familiares acompanhem a localização dos pacientes, recebam notificações em tempo real, configurem lembretes de medicamentos e compromissos, e registrem memórias importantes.

## Funcionalidades

- **Monitoramento de Localização**: Acompanhe a localização em tempo real dos pacientes para garantir sua segurança.
- **Notificações Push**: Receba alertas automáticos quando o paciente sai de uma área segura ou em caso de situações de risco.
- **Lembretes de Medicamentos e Compromissos**: Configure lembretes para medicamentos e compromissos médicos, garantindo que o paciente siga a rotina de cuidados.
- **Diário de Memórias**: Registre memórias e eventos importantes com textos, fotos ou vídeos.
- **Contato Rápido**: Permite um acesso rápido aos contatos de emergência para cuidadores e familiares.

## Status do Projeto

O projeto **ainda está em desenvolvimento** e foi criado pelas alunas **Isabela Costa** e **Evelin Cristino**, do **2° ano de Desenvolvimento de Sistemas da Etec de Carapicuíba**.

## Tecnologias Utilizadas

- **Expo**: Plataforma para desenvolvimento de aplicativos React Native.
- **React Native**: Framework para desenvolvimento de aplicativos móveis multiplataforma.
- **Firebase**: Utilizado para autenticação e banco de dados em tempo real.
- **SQLite**: Banco de dados local para armazenamento offline.
- **React Navigation**: Para navegação entre as telas do aplicativo.
- **React Native Maps**: Integração com mapas para o monitoramento de localização.
- **React Native Push Notification**: Para envio de notificações push.
- **React Native Permissions**: Para gerenciamento de permissões do dispositivo.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 12 ou superior)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Permissões Necessárias
Este aplicativo requer as seguintes permissões para funcionar corretamente:

- Acesso à localização: Para monitoramento em tempo real dos pacientes.
- Acesso à câmera: Para captura de fotos e vídeos no diário de memórias.
- Acesso ao armazenamento: Para salvar e carregar fotos e vídeos no dispositivo.
- Notificações push: Para enviar lembretes e alertas aos cuidadores.
- As permissões são configuradas no arquivo app.json do Expo:
