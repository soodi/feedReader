/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URL defined for every feed', function(){
            for(const feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        })

        it('name defined for every feed', function(){
            for(const feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        })
    });

    describe('The menu', function() {
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        })

        it('changes properly when clicking', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        })
    })

    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            })
        })
        it('has at least an entry', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        })
    })


    describe('New Feed Selection', function() {
        let firstFeedUrls, secondFeedUrls;

        beforeEach(function(done){
            $('.feed').empty();
            loadFeed(0, function(){
                firstFeedUrls = $('.feed').html();
                done();
            });
            loadFeed(1, function(){
                secondFeedUrls = $('.feed').html();
                done();
            });
        })
        it('content changes when feed changes', function(){
            expect(firstFeedUrls).not.toBe(secondFeedUrls);
        })
    })

}());
