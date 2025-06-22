'use client'
import NavBar from '@/components/navbar/navbar';
import './globals.css'
import { Provider } from 'react-redux';
import store from '@/reduxtoolkit/store/store';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {/* <NavBar/> */}
        {children}
        </Provider>
      </body>
    </html>
  );
}
