import React from 'react';
import './../styles/github-footer.css';

export function GithubFooter() {

	return (
		<div className="footer">
			<div className="footer-icon">
				<img alt="github icon" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="32px" height="32px"/>
			</div>
			<span className="footer-notification">Easy QR Code Barcode is open source now! </span>
			<a href="https://github.com/armhil/easy-qrcode-barcode-addin"
			target="_blank" rel="noreferrer">Contribute here</a>
		</div>
	);
}