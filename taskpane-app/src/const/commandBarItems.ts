import { ContextualMenuItemType } from '@fluentui/react';
import { CreateHashRoute, Routes } from './routes';
// `QR Code` - default route
const QRCode = { key: 'QRCode', name: 'QR Code', iconProps: {iconName: 'QRCode'}, href: CreateHashRoute(Routes.QRCode)};
// `Barcode` route
const BarCode = { key: 'Barcode', name: 'Barcode', iconProps: {iconName: 'GripperBarVertical'}, href: CreateHashRoute(Routes.Barcode)};
// #10 - reactivate this button
// `Contact me` button definition
// const ContactDeveloper = { key: 'contact', iconProps: { iconName: 'Mail'}, name: 'e-mail to developer', href: 'mailto:arman.hilmioglu@gmail.com?subject=Easy Code Formatter - Feedback'};
// `Credits` button definition
const Credits = { key: 'credits', iconProps: { iconName: 'Articles'}, name: 'Acknowledgements', href: CreateHashRoute(Routes.Credits)};
// `Donate` button definition
const Donate = { key: 'donate', iconProps: { iconName: 'HeartFill', style: {color: 'white'}}, name: 'Donate', href: CreateHashRoute(Routes.Donate), style: {background: 'rgb(16, 110, 190)', color: 'white'}};
// Command bar items
export var CommandBarItems = {
  menu: [
    QRCode,
    BarCode,
  ],
  sideMenu: [
    {
      key: 'settings', iconProps: {iconName: 'Settings'}, iconOnly: true,
      subMenuProps: {
        items: [
          // #10 - reactivate this button
          // ContactDeveloper,
          Credits,
          { key: 'divider_3', itemType: ContextualMenuItemType.Divider },
          Donate
        ]
      }
    }
  ]
};
