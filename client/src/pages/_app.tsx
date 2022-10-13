import '../styles/global.css';
import Head from 'next/head';


function MyApp() {
	return (
		<>
			<Head>
				<title></title>
				<meta></meta>
			</Head>
			<Nav />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
