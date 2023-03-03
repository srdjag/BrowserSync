=== Browser Sync ===
Contributors: srdjagunjic
Donate link: https://paypal.me/srdjag
Tags: browser-sync, development
Requires at least: 4.0
Tested up to: 5.9.3
Stable tag: 1.0
Requires PHP: 5.6
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Lightweight plugin that enables browser syncing on multiple devices for easier responsiveness checkout.

== Description ==

Local development has many advantages, and one of them is being able to use Node NPM packages combined to WordPress, for example BrowserSync. BrowserSync NPM package lets you sync your browser window to many different devices and that way check is your site responsive on all of them.

However, on live sites that use PHP servers, we do not have the ability to run NPM packages. This plugin combines external NodeJS server that communicates with client via WebSockets.

With a simple press of a button in your admin bar, you get a link that you can use on any device.

This plugin supports syncing of:
-Scrolling
-Clicking on links and redirection
-Page refresh

== How this plugin works ==

This plugin communicates with Node.js server hosted on Heroku at https://browser-sync.herokuapp.com via web sockets.
Web sockets create uninterrupted connection between your browser and Node.js server where other devices can react on scroll, click and refresh events.
Once you click "BrowserSync" button in the admin bar, your browsers connects to external server via web socket and sends two informations:
1. The Domain
2. Random 3 number ID that was generated

This data is not storred in any shape or form and is just used to make a dedicated web socket room to which your other devices will connect to and react to scrolling, link clicking and page refresh.

== Frequently Asked Questions ==

= My mobile browser does not refresh when my main does =

Unfortunately, popular mobile browsers do not allow page refreshing by JavaScript. If a solution is found, it will be implemented.

== Screenshots ==

1. By clicking "BrowserSync" button, you will get dedicated URL to which you can join on other devices

== Changelog ==

= 1.0 =
Initial plugin publishing.

== Upgrade Notice ==
= 1.0 =
Initial plugin publishing.
