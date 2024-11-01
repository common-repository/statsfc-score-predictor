/* global alert, escape, unescape, statsfc_lang */

var $j = jQuery;

function sfc_setCookie (name, value) {
  var date = new Date();
  date.setTime(date.getTime() + (28 * 24 * 60 * 60 * 1000));
  var expires = '; expires=' + date.toGMTString();
  document.cookie = escape(name) + '=' + escape(value) + expires + '; path=/';
}

function sfc_getCookie (name) {
  var nameEQ = escape(name) + '=';
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return unescape(c.substring(nameEQ.length, c.length));
    }
  }

  return null;
}

function StatsFC_ScorePredictor (key) {
  this.referer = '';
  this.key = key;
  this.team = '';
  this.competition = '';
  this.date = '';
  this.showMatchDetails = false;
  this.restricted = false;
  this.maxDisplayPredictions = 3;
  this.timezone = '';
  this.omitErrors = false;
  this.useDefaultCss = false;
  this.lang = 'en';

  this.translate = function (key) {
    if (
      typeof statsfc_lang === 'undefined' ||
      typeof statsfc_lang[key] === 'undefined' ||
      statsfc_lang[key].length === 0
    ) {
      return key;
    }

    return statsfc_lang[key];
  };

  this.display = function (placeholder) {
    this.loadLang('statsfc-lang', this.lang);

    var $placeholder;

    switch (typeof placeholder) {
      case 'string':
        $placeholder = $j('#' + placeholder);
        break;
      case 'object':
        $placeholder = placeholder;
        break;
      default:
        return;
    }

    if ($placeholder.length === 0) {
      return;
    }

    if (this.useDefaultCss === true || this.useDefaultCss === 'true') {
      this.loadCss('statsfc-score-predictor-css');
    }

    if (typeof this.referer !== 'string' || this.referer.length === 0) {
      this.referer = window.location.hostname;
    }

    var $container = $j('<div>').addClass('sfc_scorepredictor').attr('data-api-key', this.key);

    // Store globals variables here so we can use it later.
    var key = this.key;
    var object = this;
    var date = this.date;
    var showMatchDetails = (this.showMatchDetails === true || this.showMatchDetails === 'true');
    var omitErrors = (this.omitErrors === true || this.omitErrors === 'true');
    var translate = this.translate;

    $j.getJSON(
      'https://widgets.statsfc.com/api/score-predictor.json?callback=?',
      {
        key: this.key,
        domain: this.referer,
        team: this.team,
        competition: this.competition,
        date: this.date,
        restricted: this.restricted,
        maxDisplayPredictions: this.maxDisplayPredictions,
        timezone: this.timezone,
        lang: this.lang,
      },
      function (data) {
        if (data.error) {
          if (omitErrors) {
            return;
          }

          var $error = $j('<p>').css('text-align', 'center');

          if (data.customer && data.customer.attribution) {
            $error.append(
              $j('<a>').attr({
                href: 'https://statsfc.com',
                title: 'Football widgets and API',
                target: '_blank',
              }).text('Stats FC'),
              ' – ',
            );
          }

          $error.append(translate(data.error));

          $container.append($error);

          return;
        }

        $container.attr('data-match-id', data.match.id);

        var $matchDetails = '';

        if (showMatchDetails) {
          var $status = $j('<span>');

          if (! data.match.started || date.length > 0) {
            $status.append(
              $j('<span>').addClass('sfc_date').text(data.match.date),
              $j('<br>'),
              $j('<span>').addClass('sfc_time').text(data.match.time),
            );
          } else {
            $status.append(
              $j('<span>').html('<small>Live: ' + data.match.status + '</small><br>' + data.match.score[0] + ' - ' + data.match.score[1]),
            );
          }

          $matchDetails = $j('<tr>').append(
            $j('<td>').addClass('sfc_details').attr('colspan', 3).append(
              $j('<span>').addClass('sfc_competition').text(data.match.competition),
              $j('<br>'),
              $status,
            ),
          );
        }

        var $scores = $j('<td>').addClass('sfc_scores');

        var cookie_id = 'sfc_scorepredictor_' + key + '_' + data.match.id;
        var cookie = sfc_getCookie(cookie_id);

        if (cookie !== null) {
          $scores.append(
            $j('<span>').text(cookie),
            $j('<br>'),
            $j('<small>').text(translate('Your prediction')),
          );
        } else if (! data.match.started) {
          $scores.append(
            $j('<input>').addClass('sfc_score_home').attr({
              type: 'text',
              name: 'sfc_score_home',
              id: 'sfc_score_home',
              maxlength: 1,
            }),
            ' ',
            $j('<input>').addClass('sfc_score_away').attr({
              type: 'text',
              name: 'sfc_score_away',
              id: 'sfc_score_away',
              maxlength: 1,
            }),
            $j('<br>'),
            $j('<input>').attr('type', 'submit').val(translate('Predict')).on('click', function (e) {
              e.preventDefault();
              object.predict($j(this));
            }),
          );
        } else {
          $scores.append(
            $j('<span>').html('<small>' + translate('Live') + ': ' + translate(data.match.status) + '</small><br>' + data.match.score[0] + ' - ' + data.match.score[1]),
          );
        }

        var $table = $j('<table>');

        var $tbody = $j('<tbody>').append(
          $matchDetails,
          $j('<tr>').append(
            $j('<td>').addClass('sfc_team sfc_home sfc_badge_' + data.match.homepath).append(
              $j('<label>').attr('for', 'sfc_score_home').css('background-image', 'url(https://cdn.statsfc.com/kit/' + data.match.homeshirt + ')').text(data.match.home),
            ),
            $scores,
            $j('<td>').addClass('sfc_team sfc_away sfc_badge_' + data.match.awaypath).append(
              $j('<label>').attr('for', 'sfc_score_away').css('background-image', 'url(https://cdn.statsfc.com/kit/' + data.match.awayshirt + ')').text(data.match.away),
            ),
          ),
        );

        if (data.scores.length > 0) {
          $tbody.append(
            $j('<tr>').append(
              $j('<th>').attr('colspan', 3).text(translate('Popular scores')),
            ),
          );

          $j.each(data.scores, function (key, score) {
            $tbody.append(
              $j('<tr>').addClass('sfc_popular_score').append(
                $j('<td>').addClass('sfc_score').attr('colspan', 3).append(
                  $j('<div>').append(
                    $j('<span>').addClass('sfc_percent').css('width', score.percent + '%'),
                    $j('<strong>').text(score.home + '-' + score.away),
                    $j('<em>').text(score.percent + '%'),
                  ),
                ),
              ),
            );
          });
        }

        $table.append($tbody);

        $container.append($table);

        if (data.customer.attribution) {
          $container.append(
            $j('<div>').attr('class', 'sfc_footer').append(
              $j('<p>').append(
                $j('<small>').append('Powered by ').append(
                  $j('<a>').attr({
                    href: 'https://statsfc.com',
                    title: 'StatsFC – Football widgets',
                    target: '_blank',
                  }).text('StatsFC.com'),
                ),
              ),
            ),
          );
        }
      },
    );

    $placeholder.append($container);
  };

  this.loadCss = function (id) {
    if (document.getElementById(id)) {
      return;
    }

    var css, fcss = (document.getElementsByTagName('link')[0] || document.getElementsByTagName('script')[0]);

    css = document.createElement('link');
    css.id = id;
    css.rel = 'stylesheet';
    css.href = 'https://cdn.statsfc.com/css/score-predictor.css';

    fcss.parentNode.insertBefore(css, fcss);
  };

  this.loadLang = function (id, l) {
    if (document.getElementById(id)) {
      return;
    }

    var lang, flang = document.getElementsByTagName('script')[0];

    lang = document.createElement('script');
    lang.id = id;
    lang.src = 'https://cdn.statsfc.com/js/lang/' + l + '.js';

    flang.parentNode.insertBefore(lang, flang);
  };

  this.predict = function (e) {
    var $parent = e.parents('.sfc_scorepredictor');
    var $home = $parent.find('.sfc_score_home');
    var $away = $parent.find('.sfc_score_away');
    var translate = this.translate;

    // Check scores are numeric.
    var home = $home.val();
    var away = $away.val();

    if (home.length <= 0 || isNaN(home) || home < 0 || home > 9 || away.length <= 0 || isNaN(away) || away < 0 || away > 9) {
      alert(translate('ERR_24'));
      return;
    }

    // Check that cookie doesn't exist for the current match.
    var cookie_id = 'sfc_scorepredictor_' + this.key + '_' + $parent.attr('data-match-id');
    var cookie = sfc_getCookie(cookie_id);

    if (cookie !== null) {
      alert(translate('ERR_25'));
      return;
    }

    // Submit the score to StatsFC.
    $j.getJSON(
      'https://widgets.statsfc.com/api/score-predictor.json?callback=?',
      {
        key: this.key,
        domain: window.location.hostname,
        match_id: $parent.attr('data-match-id'),
        home_score: $home.val(),
        away_score: $away.val(),
      },
      function (data) {
        if (data.error) {
          alert(translate(data.error));
          return;
        }

        // Save cookie.
        var score = $home.val() + '-' + $away.val();
        sfc_setCookie(cookie_id, score);

        // Swap textboxes for prediction.
        $parent.find('.sfc_scores').empty();
        $parent.find('.sfc_scores').append(
          $j('<span>').text(score),
          $j('<br>'),
          $j('<small>').text(translate('Your prediction')),
        );

        // Update percentages.
        $parent.find('.sfc_popular_score').remove();

        $j.each(data.scores, function (key, val) {
          $parent.find('table').append(
            $j('<tr>').addClass('sfc_popular_score').append(
              $j('<td>').attr('colspan', 3).addClass('sfc_score').append(
                $j('<div>').append(
                  $j('<span>').addClass('sfc_percent').css('width', val.percent + '%'),
                  $j('<strong>').text(val.home + '-' + val.away),
                  $j('<em>').text(val.percent + '%'),
                ),
              ),
            ),
          );
        });
      },
    );
  };
}

/**
 * Load widgets dynamically using data-* attributes
 */
$j('div.statsfc-score-predictor').each(function () {
  var key = $j(this).attr('data-key'),
    scorePredictor = new StatsFC_ScorePredictor(key),
    data = $j(this).data();

  for (var i in data) {
    scorePredictor[i] = data[i];
  }

  scorePredictor.display($j(this));
});
