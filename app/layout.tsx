import type {Metadata} from 'next';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-ext-400.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-ext-600.css';
import '@fontsource/inter/latin-800.css';
import '@fontsource/inter/latin-ext-800.css';
import './globals.css';
import './art-direction.css';
export const metadata:Metadata={title:'Kółeczko — jedno zakręcenie, dwie możliwości',description:'Zakręć, wygrywaj i podwajaj. Interaktywna gra 3D na wirtualne punkty.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pl"><body>{children}</body></html>}
