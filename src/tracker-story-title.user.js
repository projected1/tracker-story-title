// ==UserScript==
// @name        Tracker Story Title
// @author      Daniel Gorbatov
// @namespace   https://github.com/projected1
// @description Appends the story name to the project header when a story is maximized.
// @icon        https://www.pivotaltracker.com/favicon.ico
// @homepage    https://github.com/projected1/tracker-story-title
// @version     1.0.0
// @include     https://www.pivotaltracker.com/n/projects/*
// @grant       none
// ==/UserScript==

(function(window) {
    'use strict';

    const MIN_TIMEOUT = 40;
    const MAX_TIMEOUT = MIN_TIMEOUT * 10;
    var isStoryPatched = false;
    var intervalTimeout = MIN_TIMEOUT;
    var maximizedMon = setInterval(function() {
        if (/^https:\/\/www\.pivotaltracker\.com\/n\/projects\/\d+\/stories\/\d+$/.test(window.location.href)) {
            if (!isStoryPatched) {
                let storyName = window.document.querySelector('textarea[name="story[name]"]');
                if (storyName) {
                    let projectHeader = window.document.querySelector('header.project h2');
                    if (projectHeader) {
                        let text = window.document.createTextNode(' | ' + storyName.textContent);
                        projectHeader.appendChild(text);
                        isStoryPatched = true;
                        intervalTimeout = MAX_TIMEOUT;
                    } else {
                        console.error('Project header not found! Document structure may have changed.');
                        clearInterval(maximizedMon);
                    }
                }
            }
        } else if (isStoryPatched) {
            isStoryPatched = false;
            intervalTimeout = MIN_TIMEOUT;
        }
    }, intervalTimeout);
})(window);
