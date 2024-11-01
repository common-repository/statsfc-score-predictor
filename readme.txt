=== StatsFC Score Predictor ===
Contributors: willjw
Donate link:
Tags: widget, football, soccer, score, predictor, premier league, fa cup, league cup, champions league, europa league, uefa
Requires at least: 3.3
Tested up to: 6.2.2
Stable tag: 3.1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

This widget will place a score predictor for a football team's matches on your website.

== Description ==

Add a score predictor for football matches to your WordPress website. To request a key sign up for your free trial at [statsfc.com](https://statsfc.com).

For a demo, check out [wp.statsfc.com/score-predictor](https://wp.statsfc.com/score-predictor/).

= Translations =
* Bahasa Indonesia
* Dansk
* Deutsch
* Eesti
* Español
* Français
* Hrvatski Jezik
* Italiano
* Magyar
* Norsk bokmål
* Slovenčina
* Slovenski Jezik
* Suomi
* Svenska
* Türkçe

If you're interested in translating for us, please get in touch at [hello@statsfc.com](mailto:hello@statsfc.com) or on Twitter [@StatsFC](https://twitter.com/StatsFC).

== Installation ==

1. Upload the `statsfc-score-predictor` folder and all files to the `/wp-content/plugins/` directory
2. Activate the widget through the 'Plugins' menu in WordPress
3. Drag the widget to the relevant sidebar on the 'Widgets' page in WordPress
4. Set the StatsFC key and any other options. If you don't have a key, sign up for free at [statsfc.com](https://statsfc.com)

You can also use the `[statsfc-score-predictor]` shortcode, with the following options:

* `key` (required): Your StatsFC key
* `team` (required): Team name, e.g., `Liverpool`
* `competition` (optional): Competition key, e.g., `EPL`
* `date` (optional): For a back-dated score predictor, e.g., `2013-12-31`
* `show_match_details` (optional): Show the match details (competition, date, time), `true` or `false`
* `restricted` (optional): Restrict the popular scores to those from your own site, `true` or `false`
* `max_display_predictions` (optional): The maximum number of predictions to display, e.g., `3`
* `timezone` (optional): The timezone to convert match times to, e.g., `Europe/London` ([complete list](https://php.net/manual/en/timezones.php))
* `default_css` (optional): Use the default widget styles, `true` or `false`
* `omit_errors` (optional): Omit error messages, `true` or `false`

== Frequently asked questions ==



== Screenshots ==



== Changelog ==

= 3.1.0 =
* Feature: Added the `max_display_predictions` option

= 3.0.0 =
* Refactor: Update plugin for new API

= 2.19.4 =
* Hotfix: Minor JS bug

= 2.19.3 =
* Hotfix: Possible issue loading language/CSS files

= 2.19.2 =
* Hotfix: Check options exist before using them

= 2.19.1 =
* Hotfix: Check the before/after widget/title bits exist before using them

= 2.19.0 =
* Feature: Translate dates if using non-English.

= 2.18.0 =
* Feature: Added `show_match_details` parameter to be show the match details (competition, date, time)
* Feature: Added `timezone` parameter to convert match times to any timezone

= 2.17.0 =
* Feature: Added `restricted` parameter, which allows the most popular scores to be restricted to your own site rather than a global average

= 2.16.2 =
* Hotfix: Load relevant language file based on the default language for the site

= 2.16.1 =
* Hotfix: Fixed missing team badges

= 2.16.0 =
* Feature: Added multi-language support. If you're interested in translating for us, please get in touch at [hello@statsfc.com](mailto:hello@statsfc.com)

= 2.15.1 =
* Hotfix: Added a responsive horizontal scroll if the widget is too wide for mobile

= 2.15.0 =
* Feature: Added `competition` parameter to show a team's next fixture for a specific competition

= 2.14.2 =
* Hotfix: Made score inputs wider to handle default padding, etc.

= 2.14.1 =
* Hotfix: Fixed possible `Undefined index: omit_errors` error

= 2.14.0 =
* Feature: Put CSS/JS files back into the local repo
* Feature: Enqueue style/script directly instead of registering first

= 2.13.0 =
* Feature: Added `omit_errors` parameter
* Feature: Load CSS/JS remotely

= 2.12.1 =
* Hotfix: Fixed "Invalid domain" bug caused by referal domain

= 2.12.0 =
* Feature: Converted to JS widget

= 2.11.0 =
* Feature: Allow more discrete ads for ad-supported accounts

= 2.10.0 =
* Feature: Enabled ad-support

= 2.9.0 =
* Feature: Use built-in WordPress HTTP API functions

= 2.8.0 =
* Feature: Added badge class for each team

= 2.7.0 =
* Feature: Default `default_css` parameter to `true`

= 2.6.0 =
* Feature: Updated team badges.

= 2.5.0 =
* Feature: Added `[statsfc-score-predictor]` shortcode.

= 2.4.0 =
* Feature: Added a `date` parameter.

= 2.3.0 =
* Feature: Having fixed the root cause, the SSL option has been removed.

= 2.2.0 =
* Feature: Added an option to control whether the API call is over SSL or not.

= 2.1.1 =
* Hotfix: Fixed a minor Javascript bug.

= 2.1.0 =
* Feature: Show the live score if the match has started.

= 2.0.0 =
* Feature: Updated to the new API.

= 1.9.0 =
* Feature: Tweaked error message.

= 1.8.0 =
* Feature: Simplified Javascript cookies.

= 1.7.1 =
* Hotfix: Fixed bug where external parent form could be submitted.

= 1.7.0 =
* Feature: Added fopen fallback if cURL request fails.

= 1.6.3 =
* Hotfix: Fixed possible cURL bug.

= 1.6.2 =
* Hotfix: Submit button text could be too big.

= 1.6.1 =
* Hotfix: Fixed 'Popular scores' CSS bug in Firefox.

= 1.6.0 =
* Feature: Use cURL to fetch API data if possible.
* Hotfix: Fixed image CSS overrides from WordPress themes.

= 1.5.0 =
* Feature: Auto-focus on the away score when the home score is added.

= 1.4.2 =
* Hotfix: Make sure input elements are displayed inline, not as blocks.

= 1.4.1 =
* Hotfix: Fixed bug to include shirts of teams no longer in the Premier League.

= 1.4.0 =
* Feature: Added Community Shield fixtures.

= 1.3.0 =
* Feature: Updated team badges for 2013/14.

= 1.2.1 =
* Hotfix: Fixed a bug when selecting a specific team.

= 1.2.0 =
* Feature: If the match has started, show the live score.

= 1.1.1 =
* Hotfix: Fixed minor CSS bug where percentage bar can be hidden.

= 1.1.0 =
* Feature: Allow multiple score predictors on the same page.

== Upgrade notice ==

