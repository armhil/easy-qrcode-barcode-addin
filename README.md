# easy-qrcode-barcode-addin

[![Build and publish](https://github.com/armhil/easy-qrcode-barcode-addin/actions/workflows/main.yml/badge.svg)](https://github.com/armhil/easy-qrcode-barcode-addin/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/armhil/easy-qrcode-barcode-addin/graph/badge.svg?token=BQYL5Z1E7W)](https://codecov.io/gh/armhil/easy-qrcode-barcode-addin)

[Easy QR code and Barcode generator](https://appsource.microsoft.com/en/product/office/WA200002492?tab=Overview) is a M365 productivity suite add-in for Word, PowerPoint and Excel, that allows people to generate QRs and Barcodes in documents, worksheets and presentations. 

I'm working on making it cross-platform, and I finally got around open-sourcing this.

I'd say it's safe to ignore the rating as this app in appsource, it had some legit outages which clashed with my holidays, but I've done my part, TypeScriptified the whole thing, re-built it using my open source stuff like [Easy-Addins-Utils](https://github.com/armhil/easy-addins-utils) so we should be in a way better place.

Also - it's important to call out the significant dependencies! I didn't build the QR or Bar libraries myself, so huge kudos goes to repos below.

App is well tested, I think at this stage we're only missing storybooks. 

## What does it look like?

`QR code` generation | `Barcode` generation
:-------------------------:|:-------------------------:
![](https://github.com/armhil/easy-qrcode-barcode-addin/blob/main/submission/screenshots/sc2.png)  |  ![](https://github.com/armhil/easy-qrcode-barcode-addin/blob/main/submission/screenshots/sc4.png)


## Important libs
Massive thanks to @zpao and @kciter! 

* https://github.com/zpao/qrcode.react
* https://github.com/kciter/react-barcode
* https://github.com/armhil/easy-addins-utils
