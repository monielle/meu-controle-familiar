export default function manifest() {
  return {
    name: 'Controle Familiar',
    short_name: 'Casa Amaral',
    description: 'Gerenciamento da rotina doméstica',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}