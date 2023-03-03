<?php

/**
 *
 * @link              srdjagunjic@gmail.com
 * @since             1.0.0
 * @package           Browser_Sync
 *
 * @wordpress-plugin
 * Plugin Name:       Browser Sync
 * Plugin URI:        browsersync.dev
 * Description:       Lightweight plugin that enables browser syncing on multiple devices for easier responsiveness checkout.
 * Version:           1.0.0
 * Author:            Srdja Gunjic
 * Author URI:        srdjagunjic@gmail.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       browser-sync
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'BROWSER_SYNC_VERSION', '1.0.0' );




/*
** Scripts enqueue
*/


if ( !is_admin() && isset($_GET["sync"]) && isset($_GET["id"]) && intval($_GET["id"])) {
	add_action('wp_enqueue_scripts', 'browser_sync_enqueue');
}

function browser_sync_enqueue() {
	wp_enqueue_script( 'browser-sync-socket-io', plugins_url( '/socket.io.min.js' ,__FILE__ ), '','', false );
	wp_enqueue_script( 'browser-sync-socket-io-client', plugins_url( '/clientSocket.js' ,__FILE__ ), '','', true );
}

/*
** Keeping <sync, id> GET params on page change
*/

function browser_sync_append_query_string( $url, $id ) {

	if(intval($_GET['id'])) {

		$id = intval($_GET['id']);

		$url = untrailingslashit($url);
		$url = add_query_arg( 'sync', '', $url );
		$url = add_query_arg( 'id', $id, $url );
		
		return sanitize_url($url);

	} else {

		return $url;

	}


}


if ( !is_admin() && isset($_GET["sync"]) && isset($_GET["id"])) {
	add_filter('home_url','browser_sync_append_query_string', 10, 2 );
}

/*
** Admin bar shortcut button
*/

function browser_sync_admin_bar_btn( $wp_admin_bar ) {
	global $wp;

	//BrowserSync is enabled - show disable button
	if (isset($_GET["sync"]) && isset($_GET["id"])) {

		$url = sanitize_url(remove_query_arg(array_keys($_GET)));

		$args = array(
			'id' => 'sync-link',
			'title' => 'Disable BrowserSync', 
			'href' => esc_url($url), 
			'meta' => array(
				'title' => 'Disable BrowserSync'
			)
		);
	} else {
		//BrowserSync is disabled - show enable button
		$randomID = wp_rand(100,999);
		$url = add_query_arg( 'sync', '', home_url( $wp->request ) );
		$url = add_query_arg( 'id', $randomID, $url );
		$args = array(
			'id' => 'sync-link',
			'title' => 'BrowserSync', 
			'href' => esc_url($url), 
			'meta' => array(
				'title' => 'BrowserSync'
			)
		);
	
	}
	$wp_admin_bar->add_node( $args );
}

add_action( 'admin_bar_menu', 'browser_sync_admin_bar_btn', 999 );

